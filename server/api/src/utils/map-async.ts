
export async function mapAsync<T, U>(array: T[], asyncFn: (item: T) => Promise<U>, filterFn?: (item: U) => boolean): Promise<U[]> {
  let results = await Promise.all(array.map(asyncFn));
  if (filterFn)
    results = results.filter(item => filterFn(item));
  return results;
}