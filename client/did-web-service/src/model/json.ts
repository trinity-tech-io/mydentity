export interface JSONObject {
  [x: string]: JSONValue;
}
export declare type JSONValue = string | number | boolean | JSONObject | JSONArray;
export interface JSONArray extends Array<string | number | boolean | JSONObject | JSONArray> { }