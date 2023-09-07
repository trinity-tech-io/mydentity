
// utils.js
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shortenString(inputString: string, maxLength: number): string {
  return inputString?.length > maxLength ?
    inputString.substring(0, maxLength / 2 - 1) + "..." +
    inputString.substring(inputString.length - (maxLength / 2 - 1), inputString.length) :
    inputString;
}

// Get the first letter of each word and combine them.
export function initialsString(str?: string): string {
  if (str == null) {
    return null
  }
  return capitalizeFirstLetter(str.split(' ').map(word => word[0]).join(''))
}

export function convertUtcToLocaleDateTime(utcDateTimeString: string): string {
  const utcDate = new Date(utcDateTimeString);

  const locale = navigator.language; // Get the local language setting of the user's browser
  const dateFormatter = new Intl.DateTimeFormat(locale);
  const localDateTimeString = dateFormatter.format(utcDate);

  return localDateTimeString;
}

