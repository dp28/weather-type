import { getAllValues } from './enum-utils';

interface RegExpToComponent<T> {
  [regexp: string]: T
}

interface Parser<T> {
  (string): T
}

export function extractComponent<T>(defaultValue: T, regexes: RegExpToComponent<T>): Parser<T> {
  return (code: string) => {
    for (const regexString of Object.keys(regexes)) {
      if (new RegExp(regexString, 'i').test(code))
        return regexes[regexString];
    }
    return defaultValue;
  };
}
