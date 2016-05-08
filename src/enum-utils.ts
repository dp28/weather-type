interface Enum {
  [x: number]: string;
}

export function getClosestName(enumeration: Enum, value: number): string {
  const numValues = getAllValues(enumeration).length;
  const intValue = Math.round(value);
  if (intValue < 0)
    return enumeration[0];
  else if (intValue >= numValues)
    return enumeration[numValues - 1];
  else
    return enumeration[intValue];
}

export function getAllNames(enumeration: Enum): Array<string> {
  return Object.keys(enumeration).filter(k => isNaN(parseInt(k, 10)));
}

export function getAllValues(enumeration: Enum): Array<number> {
  return Object
    .keys(enumeration)
    .map(k => parseInt(k, 10))
    .filter(i => !isNaN(i));
}
