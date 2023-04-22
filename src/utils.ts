function createMappingFn(domain1: number[], domain2: number[]) {
  return (value: number) => {
    return mapTo(value, domain1[0]!, domain1[1]!, domain2[0]!, domain2[1]!);
  };
}

function mapTo(
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function getDateObject(date: string) {
  const splitDate = date.split(" ");

  return {
    month: splitDate[1],
    year: splitDate[3],
  };
}

function* enumerate<T>(iterable: IterableIterator<T>) {
  let i = 0;
  for (const x of iterable) {
    yield [i, x];
    i++;
  }
}

function createFrequencyMap<T>(array: T[]) {
  const map = new Map<T, number>();
  for (const value of array) {
    const count = map.get(value);
    if (count) {
      map.set(value, count + 1);
    } else {
      map.set(value, 1);
    }
  }
  return map;
}

function blobToString(blob: Blob | File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(reader.result as string);
    reader.onerror = (e) => reject(reader.error);
    reader.onabort = (e) => reject(new Error("Read aborted"));
    reader.readAsText(blob);
  });
}

export {
  createMappingFn,
  getDateObject,
  createFrequencyMap,
  blobToString,
  enumerate,
};
