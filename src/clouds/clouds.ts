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

  public isClear(): boolean {
    return this.isLevel(Level.Clear);
  }

  public isBroken(): boolean {
    return this.isLevel(Level.Broken);
  }

  public isLight(): boolean {
    return this.isLevel(Level.Light);
  }

  public isHeavy(): boolean {
    return this.isLevel(Level.Heavy);
  }

  public isMist(): boolean {
    return this.isLevel(Level.Mist);
  }

  public isFog(): boolean {
    return this.isLevel(Level.Fog);
  }

  private isLevel(level: Level): boolean {
    return getClosestName(Level, this.level) === Level[level];
  }
}
