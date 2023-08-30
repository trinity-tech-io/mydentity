import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as request from 'request';
import { AppException } from 'src/exceptions/app-exception';
import { DIDExceptionCode } from 'src/exceptions/exception-codes';

export const MAINNET_TEMPLATE = "MainNet";
export const TESTNET_TEMPLATE = "TestNet";

const assistAPIEndpoints = {
  MainNet: "https://assist.trinity-tech.io/v2",
  TestNet: "https://assist-testnet.trinity-tech.io/v2"
}; // Assist DID 2.0

const assistAPIKey = "IdSFtQosmCwCB9NOLltkZrFy5VqtQn8QbxBKQoHPw7zp3w0hDOyOYjgL53DO3MDH";

export const enum DIDPublicationStatus {
  NO_ON_GOING_PUBLICATION = 0, // Initial state just before a publication is sent.
  AWAITING_PUBLICATION_CONFIRMATION = 1,
  PUBLISHED_AND_CONFIRMED = 2, // Previously published transaction was published and confirmed on chain.
  FAILED_TO_PUBLISH = 3
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

export enum AssistTransactionStatus {
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

  private logger: Logger;

  constructor() {
    this.logger = new Logger("DIDPublishingService");
  }

  /**
   * Directly publishes a payload previously generated in another part of the app.
   * return confirmation_id as publicationID
   *
   * DOC FOR ASSIST API: https://github.com/tuum-tech/assist-restapi-backend#verify
   */
  public async publishDID(didString: string, payloadObject: any, memo = ''): Promise<string> {
    this.logger.log("Requesting identity publication to Assist" + didString);

    return new Promise(async (resolve, reject) => {
      const requestBody = {
        "did": didString,
        "memo": memo || "",
        "requestFrom": "did-web-service",
        "didRequest": JSON.parse(payloadObject)
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
          // this.logger.log("response.statusCode:" + response.statusCode)
          // this.logger.log("bodyString:" + bodyString)
          const body: AssistCreateTxResponse = bodyString ? JSON.parse(bodyString) : null;
          if (!error && response.statusCode === 200) {
            if (body && body.meta && body.meta.code == 200 && body.data.confirmation_id) {
              this.logger.log("All good, DID has been submitted.");
              resolve(body.data.confirmation_id);
            } else {
              const errorMessage = "Successful response received from the assist API, but response can't be understood, Error:" + body?.meta?.message + " " + body?.meta?.description;
              this.logger.warn("publishDID error:" + errorMessage);
              reject(new AppException(DIDExceptionCode.NetworkError, errorMessage, HttpStatus.BAD_REQUEST));
            }
          } else {
            const errorMessage = "Failed to publish did. Error:" +  (error ? error : (body?.meta?.message + ". " + body?.meta?.description));
            this.logger.warn("publishDID error:" + errorMessage);
            reject(new AppException(DIDExceptionCode.NetworkError, errorMessage, response.statusCode));
          }
        });
      }
      catch (err) {
        this.logger.error(`Assist publish api error: ${err}`);
        reject(new AppException(DIDExceptionCode.NetworkError, err.message, HttpStatus.SERVICE_UNAVAILABLE));
      }
    });
  }

  /**
   * Get the publication status on the assist API, for a previously saved ID.
   */
  public getPublicationStatus(confirmation_id: string): Promise<AssistTransactionStatusResponse> {
    return new Promise(async (resolve, reject) => {
      this.logger.log("Requesting identity publication status to Assist for confirmation ID " + confirmation_id);

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
          const errorMessage = "Failed to get publication status. Error:" +  (error ? error : (body?.meta?.message + ". " + body?.meta?.description));
          this.logger.warn("getPublicationStatus:" + errorMessage);
          reject(errorMessage)
        }
      })
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
        throw new AppException(DIDExceptionCode.NetworkError, "DIDPublishing service cannot be used to published on network " + networkTemplate, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
