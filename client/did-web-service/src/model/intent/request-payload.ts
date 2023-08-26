import { JSONObject } from "@model/json";

export type IntentRequestPayload<T> = T & {
  caller: string; // Informative DID of the calling app
  credentials: JSONObject[]
}
