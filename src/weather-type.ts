import { Option, Some, None } from 'option-t';

import Storm from './storm/storm';
import { Level as StormLevel } from './storm/storm';
import { extractStorm } from './storm/storm-parser';
import Clouds from './clouds/clouds';
import { Level as CloudLevel } from './clouds/clouds';
import { extractClouds } from './clouds/clouds-parser';
import Precipitation from './precipitation/precipitation';
import { extractPrecipitation } from './precipitation/precipitation-parser';
import {
  Level as PrecipitationLevel,
  Duration as PrecipitationDuration,
  Type as PrecipitationType
} from './precipitation/precipitation';

export {
  Clouds,
  CloudLevel,
  Precipitation,
  PrecipitationLevel,
  PrecipitationDuration,
  PrecipitationType,
  Storm,
  StormLevel
}

export default class WeatherType {

  static fromString(code: string): Option<WeatherType> {
    const safeCode = code.toLowerCase();
    return extractClouds(safeCode).map(clouds => {
      const storm = extractStorm(safeCode);
      const precipitation = extractPrecipitation(safeCode);
      return new WeatherType(storm, precipitation, clouds);
    });
  }

  constructor(
    public stormLevel: Storm,
    public precipitation: Precipitation,
    public cloudLevel: Clouds
  ) {}

  public toCode(): string {
    return this.stormLevel.toCode().unwrapOrElse(() => (
      this.precipitation.toCode().unwrapOrElse(() => this.cloudLevel.toCode()))
    );
  }
}
