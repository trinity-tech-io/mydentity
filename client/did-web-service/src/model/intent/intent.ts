import { JSONObject } from "@model/json";
import { IntentType } from "./intent-type";
import { IntentDTO } from "./intent.dto";

export class Intent {
  id: string;
  createdAt: Date;
  type: IntentType;
  requestPayload: JSONObject;
  responsePayload: JSONObject;

  public static async fromJson(json: IntentDTO): Promise<Intent> {
    const intent = new Intent();
    Object.assign(intent, json);

    intent.createdAt = new Date(json.createdAt);

    return intent;
  }
}