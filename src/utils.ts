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

export { createMappingFn, getDateObject };
