import { JSONObject } from "@model/json";
import { IntentType } from "./intent-type";
import { IntentDTO } from "./intent.dto";
import { IntentRequestPayload } from "./request-payload";

export class Intent<RequestType> {
  id: string;
  createdAt: Date;
  type: IntentType;
  redirectUrl: string;
  requestPayload: IntentRequestPayload<RequestType>;
  responsePayload: JSONObject;

  public static async fromJson<RequestType>(json: IntentDTO): Promise<Intent<RequestType>> {
    const intent = new Intent<RequestType>();
    Object.assign(intent, json);

    intent.createdAt = new Date(json.createdAt);

    return intent;
  }
}