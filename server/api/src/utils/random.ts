/**
 * Generates a random string of N digits.
 * 
 * @param n The number of digits in the generated string.
 * 
 * @returns A random string consisting of N digits.
 */
export function randomDigits(n: number): string {
  let result = '';
  for (let i = 0; i < n; i++) {
    result += Math.floor(Math.random() * 10); // generates a random integer from 0 to 9
  }
  return result;
}