import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { Subject } from 'rxjs';
import { logger } from '../logger';

export const MAINNET_TEMPLATE = "MainNet";
export const TESTNET_TEMPLATE = "TestNet";

const assistAPIEndpoints = {
  MainNet: "https://assist.trinity-tech.io/v2",
  TestNet: "https://assist-testnet.trinity-tech.io/v2"
}; // Assist DID 2.0

const assistAPIKey = "IdSFtQosmCwCB9NOLltkZrFy5VqtQn8QbxBKQoHPw7zp3w0hDOyOYjgL53DO3MDH";

export type PersistentInfo = {
  did: {
    didString: string;
    publicationMedium: string, // assist, wallet
    publicationStatus: DIDPublicationStatus,

    assist?: {
      publicationID: string; // Unique publication ID returned by the assist API after a successful publication request. This is NOT a blockchain transaction ID.
      txId?: string; // After publishing a DID request to assist we save the returned txid here.
      message?: string; // Error message.
    },
    wallet?: {
      txId?: string; // After publishing a DID request to the EID chain we save the txid here.
      publicationTime?: number; // Unix timestamp seconds
    }
  },
}

export const enum DIDPublicationStatus {
  NO_ON_GOING_PUBLICATION = 0, // Initial state just before a publication is sent.
  AWAITING_PUBLICATION_CONFIRMATION = 1,
  PUBLISHED_AND_CONFIRMED = 2, // Previously published transaction was published and confirmed on chain.
  FAILED_TO_PUBLISH = 3
}

export type PublicationStatus = {
  didString: string;
  status: DIDPublicationStatus;
  txId?: string;
}

type AssistBaseResponse = {
  meta: {
    code: number,
    message: string,
    description: string,
  }
}

type AssistCreateTxResponse = AssistBaseResponse & {
  data: {
    confirmation_id: string,
    service_count: number,
    duplicate: boolean
  }
}

enum AssistTransactionStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  COMPLETED = "Completed",
  QUARANTINED = "Quarantined",
  ERROR = "Error"
}

type AssistTransactionStatusResponse = AssistBaseResponse & {
  data: {
    id: string, // Confirmation ID as requested
    did: string, // DID, without did:elastos prefix
    requestFrom: string, // App package id of the requester
    didRequest: {
      header: any,
      payload: string,
      proof: any
    }, // Unhandled for now
    status: AssistTransactionStatus,
    memo: string,
    extraInfo: any, // Unhandled for now
    blockchainTxId: string,
    blockchainTx: any,
    created: string, // Creation date, in no clear format for now
    modified: string // Modification (?) date, in no clear format for now
    version: string // assist api version, eg. '2'
    walletUsed: string // wallet address, '0x6f607d724b419c9535c90004ce50834c1c2eb2a0'
  }
}

@Injectable()
export class DIDPublishingService {
  private network = MAINNET_TEMPLATE;
  public persistentInfo: PersistentInfo = null; // TODO: use array

  public publicationStatus: Subject<PublicationStatus> = null;

  constructor() {
    this.publicationStatus = new Subject<PublicationStatus>();
  }

  /**
   * Directly publishes a payload previously generated in another part of the app.
   *
   * DOC FOR ASSIST API: https://github.com/tuum-tech/assist-restapi-backend#verify
   */
  public async publishDID(didString: string, payloadObject: any, memo = ''): Promise<string> {
    console.log("publicationservice", "Requesting identity publication to Assist", didString);

    if (typeof payloadObject === "string")
      throw new Error("Payload must be a JSON object, not a stringified JSON");

    this.persistentInfo = this.createNewPersistentInfo()

    this.persistentInfo.did.didString = didString;
    this.persistentInfo.did.publicationStatus = DIDPublicationStatus.NO_ON_GOING_PUBLICATION;
    this.emitPublicationStatusChangeFromPersistentInfo();

    return new Promise(async (resolve, reject) => {
      const requestBody = {
        "did": didString,
        "memo": memo || "",
        "requestFrom": "did-web-service",
        "didRequest": payloadObject
      };

      const headers = {
        "Content-Type": "application/json",
        "Authorization": assistAPIKey
      };

      try {
        const assistAPIEndpoint = this.getAssistEndpoint(this.network);

        const options = {
          url: assistAPIEndpoint + "/didtx/create",
          headers: headers,
          body: JSON.stringify(requestBody) // must be string
        };

        request.post(options, (error, response, bodyString) => {
          const body: AssistCreateTxResponse = JSON.parse(bodyString)

          if (!error && response.statusCode === 200) {
            if (body && body.meta && body.meta.code == 200 && body.data.confirmation_id) {
              console.log("publicationservice", "All good, DID has been submitted. Now waiting.");

              this.persistentInfo.did.publicationStatus = DIDPublicationStatus.AWAITING_PUBLICATION_CONFIRMATION;
              this.persistentInfo.did.assist.publicationID = body.data.confirmation_id;
              this.emitPublicationStatusChangeFromPersistentInfo();

              this.publicationStatus.subscribe( status => {
                if (status.status == DIDPublicationStatus.PUBLISHED_AND_CONFIRMED) {
                  console.log("global", "Identity publication success");
                  resolve(this.persistentInfo.did.assist.txId);
                }
                else if (status.status == DIDPublicationStatus.FAILED_TO_PUBLISH) {
                  console.log("global", "Identity publication failure");
                  reject(this.persistentInfo.did.assist.message);
                }
              })

              void this.checkPublicationStatusAndUpdate();
            } else {
              const errorMessage = "Successful response received from the assist API, but response can't be understood, Error:" + body?.meta?.message + " " + body?.meta?.description;
              console.warn("publicationservice", errorMessage);
              throw errorMessage;
            }
          } else {
            const errorMessage = "Failed to publish did. Error:" +  (error ? error : (body?.meta?.message + " " + body?.meta?.description));
            console.warn("publicationservice", errorMessage);
            reject(errorMessage);
          }
        });
      }
      catch (err) {
        logger.error("publicationservice", "Assist publish api error:", err);
        reject(err);
      }
    });
}

  /**
   * Computes the right assist api endpoint according to current active network in settings.
   */
  private getAssistEndpoint(networkTemplate: string) {
    switch (networkTemplate) {
      case MAINNET_TEMPLATE:
        return assistAPIEndpoints.MainNet;
      case TESTNET_TEMPLATE:
        return assistAPIEndpoints.TestNet;
      default:
        throw new Error("DIDPublishingService service cannot be used to published on network " + networkTemplate);
    }
  }

  /**
   * Checks the publication status on the assist API, for a previously saved ID.
   */
  public checkPublicationStatusAndUpdate(): Promise<void> {
    // Stop checking status if not awaiting anything.
    if (this.persistentInfo.did.publicationStatus !== DIDPublicationStatus.AWAITING_PUBLICATION_CONFIRMATION)
      return;

    return new Promise(async (resolve, reject) => {
      console.log("publicationservice", "Requesting identity publication status to Assist for confirmation ID " + this.persistentInfo.did.assist.publicationID);

      try {
        const body: AssistTransactionStatusResponse = await this.getPublicationStatus(this.persistentInfo.did.assist.publicationID);

        if (body && body.meta && body.meta.code == 200 && body.data.status) {
          console.log("publicationservice", "All good, We got a clear status from the assist api:", body.data.status);

          if (body.data.status == AssistTransactionStatus.PENDING || body.data.status == AssistTransactionStatus.PROCESSING) {
            // Transaction is still pending, we do nothing, just wait and retry later.
            //Logger.log("publicationservice", "Publication is still pending / processing / not confirmed.");

            // Don't save or emit for now, this will be sent when we get another useful (completed/failed) event later.
            if (body.data.blockchainTxId)
              this.persistentInfo.did.assist.txId = body.data.blockchainTxId;
          }
          else if (body.data.status == AssistTransactionStatus.QUARANTINED) {
            // Blocking issue. This publication was quarantined, there is "something wrong somewhere".
            // So to make things more reliable, we just delete everything and restart the process
            // from scratch.
            console.log("publicationservice", "Publication request was quarantined! Deleting the identity and trying again.");
            this.persistentInfo.did.publicationStatus = DIDPublicationStatus.FAILED_TO_PUBLISH;
            this.persistentInfo.did.assist.message = body.meta.message;
            this.emitPublicationStatusChangeFromPersistentInfo();
          }
          else if (body.data.status == AssistTransactionStatus.COMPLETED) {
            this.persistentInfo.did.publicationStatus = DIDPublicationStatus.PUBLISHED_AND_CONFIRMED;
            this.emitPublicationStatusChangeFromPersistentInfo();
          }
          else {
            console.error("publicationservice", "Unhandled transaction status received from assist:", body.data.status);
            this.persistentInfo.did.publicationStatus = DIDPublicationStatus.FAILED_TO_PUBLISH;
            this.persistentInfo.did.assist.message = body.meta.message;
            this.emitPublicationStatusChangeFromPersistentInfo();
          }

          setTimeout(() => {
            void this.checkPublicationStatusAndUpdate();
          }, 1000);

          resolve();
        } else {
          const error = "Successful response received from the assist API, but response can't be understood";
          console.error("publicationservice", "Assist api call error:", error);

          this.persistentInfo.did.publicationStatus = DIDPublicationStatus.FAILED_TO_PUBLISH;
          this.persistentInfo.did.assist.message = error;
          this.emitPublicationStatusChangeFromPersistentInfo();
          reject();
        }
      }
      catch(err) {
        console.error("publicationservice", "Assist api call error:", err);

        this.persistentInfo.did.publicationStatus = DIDPublicationStatus.FAILED_TO_PUBLISH;
        this.persistentInfo.did.assist.message = err.message ? err.message : err;
        this.emitPublicationStatusChangeFromPersistentInfo();
        reject();
      };
    });
  }

  /**
   * Get the publication status on the assist API, for a previously saved ID.
   */
  public getPublicationStatus(confirmation_id: string): Promise<AssistTransactionStatusResponse> {
    return new Promise(async (resolve, reject) => {
      console.log("publicationservice", "Requesting identity publication status to Assist for confirmation ID " + confirmation_id);

      const headers = {
        "Content-Type": "application/json",
        "Authorization": assistAPIKey
      };

      const assistAPIEndpoint = this.getAssistEndpoint(this.network);

      const options = {
        url: assistAPIEndpoint + "/didtx/confirmation_id/" + confirmation_id,
        headers: headers,
      };

      request.get(options, (error, response, bodyString) => {
        const body: AssistTransactionStatusResponse = bodyString ? JSON.parse(bodyString) : null;

        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          const errorMessage = "Failed to get publication status. Error:" +  (error ? error : (body?.meta?.message + " " + body?.meta?.description));
          console.warn("getPublicationStatus:", errorMessage);
          reject(errorMessage)
        }
      })
    });
  }

  public createNewPersistentInfo(): PersistentInfo {
    return {
      did: {
        didString: null,
        publicationMedium: 'assist',
        publicationStatus: DIDPublicationStatus.NO_ON_GOING_PUBLICATION,
        assist: {
          publicationID: null
        }
      }
    }
  }

  /**
    * Emit a public publication status event that matches the current persistent info state.
    */
  public emitPublicationStatusChangeFromPersistentInfo() {
    this.publicationStatus.next({
        didString: this.persistentInfo.did.didString,
        status: this.persistentInfo.did.publicationStatus,
        txId: this.persistentInfo.did.assist.txId || null
    });
  }

  public async resetStatus() {
    this.persistentInfo = this.createNewPersistentInfo();
    this.emitPublicationStatusChangeFromPersistentInfo();
  }
}
