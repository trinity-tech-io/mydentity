
// utils.js
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shortenString(inputString: string, maxLength: number): string {
  return inputString.length > maxLength ?
    inputString.substring(0, maxLength / 2 - 1) + "..." +
    inputString.substring(inputString.length - (maxLength / 2 - 1), inputString.length) :
    inputString;
}
