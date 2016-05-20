import { getClosestName } from '../enum-utils';
import { buildWeatherCode } from '../weather-code-utils';

export enum Level {
  Clear,
  Broken,
  Light,
  Heavy,
  Mist,
  Fog
}

export default class Clouds {
  constructor(public level: number) {}

  public toCode(): string {
    const levelCode = getClosestName(Level, this.level);
    let codeParts = [levelCode];
    if ([Level.Broken, Level.Light, Level.Heavy].indexOf(Level[levelCode]) >= 0)
      codeParts.push('clouds');
    return buildWeatherCode(codeParts);
  }
}
