import { Option, Some, None } from 'option-t'

import Clouds           from './clouds';
import { Level }        from './clouds';
import { extractComponent } from '../parser-utils';

const heavyRegex = '(overcast|thick.cloud|snow|sleet|hail|storm|thunder|rain)';

const extractCloudLevel = extractComponent(new None<Level>(), {
  '(fog|haze)':          new Some(Level.Fog),
  'mist':                new Some(Level.Mist),
  'heavy':               new Some(Level.Heavy),
  '(light|drizzle)':     new Some(Level.Light),
  [heavyRegex]:          new Some(Level.Heavy),
  [brokenCloudsRegex()]: new Some(Level.Broken),
  'cloud':               new Some(Level.Light),
  '(clear|sun)':         new Some(Level.Clear)
});

export function extractClouds(code: string): Option<Clouds> {
  return extractCloudLevel(code).map(level => new Clouds(level));
}

function brokenCloudsRegex(): string {
  const endInCloud = ['partly', 'few', 'scattered', 'broken'].map(w => w + '.cloud').join('|');
  return `(sunn?y?.(interval|spell)|${endInCloud})`;
}
