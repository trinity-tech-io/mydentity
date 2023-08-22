import { DIDTransactionAdapter } from "@elastosfoundation/did-js-sdk";

export class DidAdapter implements DIDTransactionAdapter {
  private didTransactionPayload = null;
  private memo = null;

  public async createIdTransaction(payload: string, memo: string) {
    this.didTransactionPayload = payload;
    this.memo = memo;
  }

  public getPayload() {
    return this.didTransactionPayload;
  }

  public getMemo() {
    return this.memo;
  }

  public reset() {
    this.didTransactionPayload = null;
    this.memo = null;
  }
}
