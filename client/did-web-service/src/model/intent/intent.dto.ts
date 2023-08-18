import { JSONObject } from "@model/json";
import { IntentType } from "./intent-type";

export class IntentDTO {
  id: string;
  createdAt: string; // ISO date
  type: IntentType;
  redirectUrl: string;
  requestPayload: JSONObject;
  responsePayload: JSONObject;
}
