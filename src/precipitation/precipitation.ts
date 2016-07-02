import { Some, None, Option } from 'option-t';
import { getClosestName } from '../enum-utils';
import { buildWeatherCode } from '../weather-code-utils';

export enum Level {
  None,
  Light,
  Heavy
}

export enum Duration {
  Showers,
  Steady
}

export enum Type {
  Rain,
  Sleet,
  Snow,
  Hail
}

export default class Precipitation {
  constructor(
    public level: number,
    public duration: number,
    public type: number
  ) {}

  public isApplicable(): boolean {
    return !!this.level && getClosestName(Level, this.level) !== Level[Level.None];
  }

  public isLight(): boolean {
    return getClosestName(Level, this.level) === Level[Level.Light];
  }

  public isHeavy(): boolean {
    return getClosestName(Level, this.level) === Level[Level.Heavy];
  }

  public isShowers(): boolean {
    return getClosestName(Duration, this.duration) === Duration[Duration.Showers];
  }

  public isSteady(): boolean {
    return getClosestName(Duration, this.duration) === Duration[Duration.Steady];
  }

  public isRain(): boolean {
    return this.isType(Type.Rain);
  }

  public isSleet(): boolean {
    return this.isType(Type.Sleet);
  }

  public isSnow(): boolean {
    return this.isType(Type.Snow);
  }

  public isHail(): boolean {
    return this.isType(Type.Hail);
  }

  public toCode(): Option<string> {
    if (this.isApplicable())
      return new Some(this.buildCode());
    else
      return new None<string>();
  }

  private buildCode(): string {
    let codeParts = [
      getClosestName(Level, this.level),
      getClosestName(Type, this.type)
    ];
    const duration = getClosestName(Duration, this.duration);
    if (duration !== Duration[Duration.Steady])
      codeParts.push(duration);
    return buildWeatherCode(codeParts);
  }

  private isType(type: Type): boolean {
    return getClosestName(Type, this.type) === Type[type];
  }
}
