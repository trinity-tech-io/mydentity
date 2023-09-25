
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
  if (!isUtcTimeString(utcDateTimeString)) return utcDateTimeString
  const utcDate = new Date(utcDateTimeString);
  const locale = navigator.language; // Get the local language setting of the user's browser
  const dateFormatter = new Intl.DateTimeFormat(locale);
  const localDateTimeString = dateFormatter.format(utcDate);

  return localDateTimeString;
}

export function isUtcTimeString(str: string): boolean {
  const utcTimeStringRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z)$/;
  return utcTimeStringRegex.test(str)
}

export function converGenderFullName(str?: string): string {
  if (str == null) {
    return null
  }
  if (str === 'M') {
    return 'male'
  } else if (str === 'F') {
    return 'female'
  } else {
    return str
  }
}

export function isDefaultLocalIcon(str: string): boolean {
  if (typeof str === 'string') {
    return false
  }
  return true
}

export function checkIfStringStartsWith(str: string, substrs: string[]): boolean {
  return substrs.some(substr => str.startsWith(substr));
}
