import { Option, Some, None } from 'option-t'

import Clouds           from './clouds';
import { Level }        from './clouds';
import { getAllValues } from '../enum-utils';

const REGEXES_TO_LEVEL = {
  '(fog|haze)': Level.Fog,
  'mist': Level.Mist,
  'heavy':  Level.Heavy,
  '(light|drizzle)': Level.Light,
  '(overcast|thick.cloud|snow|sleet|hail|storm|thunder|rain)': Level.Heavy,
  [buildBrokenCloudsRegexString()] : Level.Broken,
  'cloud': Level.Light,
  '(clear|sun)': Level.Clear
}

export function extractClouds(code: string): Option<Clouds> {
  return extractCloudLevel(code).map(level => new Clouds(level));
}

function extractCloudLevel(code: string): Option<Level> {
  for (const regexString of Object.keys(REGEXES_TO_LEVEL)) {
    if (new RegExp(regexString, 'i').test(code))
      return new Some(REGEXES_TO_LEVEL[regexString]);
  }
  return new None<Level>();
}

function buildBrokenCloudsRegexString(): string {
  const endInCloud = ['partly', 'few', 'scattered', 'broken'].map(w => w + '.cloud').join('|');
  return `(sunn?y?.(interval|spell)|${endInCloud})`;
}
