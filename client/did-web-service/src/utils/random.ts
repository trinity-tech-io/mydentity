import { map, random } from "lodash";

/**
 * Returns a string made of random integers.
 * ie: "1240523432"
 */
export function randomIntString(size = 8): string {
  return map(new Array(size), () => `${random(1, 10)}`).join("");
}