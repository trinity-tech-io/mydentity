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
  // private network = TESTNET_TEMPLATE;
  public persistentInfos: {
    [index: string]: PersistentInfo
  } = {};

  public publicationStatus: Subject<PublicationStatus> = null;

  constructor() {
    this.publicationStatus = new Subject<PublicationStatus>();
    this.persistentInfos = {};
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

    this.persistentInfos[didString] = this.createNewPersistentInfo()

    this.persistentInfos[didString].did.didString = didString;
    this.persistentInfos[didString].did.publicationStatus = DIDPublicationStatus.NO_ON_GOING_PUBLICATION;
    this.emitPublicationStatusChangeFromPersistentInfo(didString);

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
          // console.log("publicationservice", "response.statusCode:", response.statusCode, " error:", error)
          // console.log("publicationservice", "bodyString:", bodyString)
          const body: AssistCreateTxResponse = bodyString ? JSON.parse(bodyString) : null;

          if (!error && response.statusCode === 200) {
            if (body && body.meta && body.meta.code == 200 && body.data.confirmation_id) {
              console.log("publicationservice", "All good, DID has been submitted. Now waiting.");

              this.persistentInfos[didString].did.publicationStatus = DIDPublicationStatus.AWAITING_PUBLICATION_CONFIRMATION;
              this.persistentInfos[didString].did.assist.publicationID = body.data.confirmation_id;
              this.emitPublicationStatusChangeFromPersistentInfo(didString);

              this.publicationStatus.subscribe( status => {
                if (status.didString != didString)
                  return;

                if (status.status == DIDPublicationStatus.PUBLISHED_AND_CONFIRMED) {
                  console.log("global", "Identity publication success");
                  resolve(this.persistentInfos[didString].did.assist.txId);
                }
                else if (status.status == DIDPublicationStatus.FAILED_TO_PUBLISH) {
                  console.log("global", "Identity publication failure");
                  reject(this.persistentInfos[didString].did.assist.message);
                }
              })

              void this.checkPublicationStatusAndUpdate(didString);
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
  public checkPublicationStatusAndUpdate(didString: string): Promise<void> {
    // Stop checking status if not awaiting anything.
    if (this.persistentInfos[didString].did.publicationStatus !== DIDPublicationStatus.AWAITING_PUBLICATION_CONFIRMATION)
      return;

    return new Promise(async (resolve, reject) => {
      console.log("publicationservice", "Requesting identity publication status to Assist for confirmation ID " + this.persistentInfos[didString].did.assist.publicationID);

      try {
        const body: AssistTransactionStatusResponse = await this.getPublicationStatus(this.persistentInfos[didString].did.assist.publicationID);

        if (body && body.meta && body.meta.code == 200 && body.data.status) {
          console.log("publicationservice", "All good, We got a clear status from the assist api:", body.data.status);

          if (body.data.status == AssistTransactionStatus.PENDING || body.data.status == AssistTransactionStatus.PROCESSING) {
            // Transaction is still pending, we do nothing, just wait and retry later.
            //Logger.log("publicationservice", "Publication is still pending / processing / not confirmed.");

            // Don't save or emit for now, this will be sent when we get another useful (completed/failed) event later.
            if (body.data.blockchainTxId)
              this.persistentInfos[didString].did.assist.txId = body.data.blockchainTxId;
          }
          else if (body.data.status == AssistTransactionStatus.QUARANTINED) {
            // Blocking issue. This publication was quarantined, there is "something wrong somewhere".
            // So to make things more reliable, we just delete everything and restart the process
            // from scratch.
            console.log("publicationservice", "Publication request was quarantined! Deleting the identity and trying again.");
            this.persistentInfos[didString].did.publicationStatus = DIDPublicationStatus.FAILED_TO_PUBLISH;
            this.persistentInfos[didString].did.assist.message = body.meta.message;
            this.emitPublicationStatusChangeFromPersistentInfo(didString);
          }
          else if (body.data.status == AssistTransactionStatus.COMPLETED) {
            this.persistentInfos[didString].did.publicationStatus = DIDPublicationStatus.PUBLISHED_AND_CONFIRMED;
            this.emitPublicationStatusChangeFromPersistentInfo(didString);
          }
          else {
            console.error("publicationservice", "Unhandled transaction status received from assist:", body.data.status);
            this.persistentInfos[didString].did.publicationStatus = DIDPublicationStatus.FAILED_TO_PUBLISH;
            this.persistentInfos[didString].did.assist.message = body.meta.message;
            this.emitPublicationStatusChangeFromPersistentInfo(didString);
          }

          setTimeout(() => {
            void this.checkPublicationStatusAndUpdate(didString);
          }, 1000);

          resolve();
        } else {
          const error = "Successful response received from the assist API, but response can't be understood";
          console.error("publicationservice", "Assist api call error:", error);

          this.persistentInfos[didString].did.publicationStatus = DIDPublicationStatus.FAILED_TO_PUBLISH;
          this.persistentInfos[didString].did.assist.message = error;
          this.emitPublicationStatusChangeFromPersistentInfo(didString);
          reject();
        }
      }
      catch(err) {
        console.error("publicationservice", "Assist api call error:", err);

        this.persistentInfos[didString].did.publicationStatus = DIDPublicationStatus.FAILED_TO_PUBLISH;
        this.persistentInfos[didString].did.assist.message = err.message ? err.message : err;
        this.emitPublicationStatusChangeFromPersistentInfo(didString);
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
  public emitPublicationStatusChangeFromPersistentInfo(didString) {
    if (this.persistentInfos[didString]) {
      this.publicationStatus.next({
          didString: this.persistentInfos[didString].did.didString,
          status: this.persistentInfos[didString].did.publicationStatus,
          txId: this.persistentInfos[didString].did.assist.txId || null
      });
    }
  }
}
