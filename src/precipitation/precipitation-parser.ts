import { Option, Some, None } from 'option-t'

import Precipitation             from '././precipitation';
import { Level, Duration, Type } from './precipitation';
import { extractComponent }      from '../parser-utils';

const extractLevel = extractComponent(Level.None, {
  'heavy.*(rain|snow|hail|sleet|drizzle)':         Level.Heavy,
  '(light.*(rain|snow|hail|sleet|storm)|drizzle)': Level.Light,
  '(hail|snow|storm|blizzard|rain|sleet|thunder)': Level.Heavy
});

const extractDuration = extractComponent(Duration.Showers, {
  '(shower|drizzle)':                              Duration.Showers,
  '(hail|snow|storm|blizzard|rain|sleet|thunder)': Duration.Steady
});

const extractType = extractComponent(Type.Rain, {
  'hail':                          Type.Hail,
  '(snow.+rain|rain.+snow|sleet)': Type.Sleet,
  '(snow|blizzard)':               Type.Snow,
  'rain':                          Type.Rain
});

export function extractPrecipitation(code: string): Precipitation {
  const level = extractLevel(code);
  const duration = extractDuration(code);
  const type = extractType(code);
  return new Precipitation(level, duration, type);
}
