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
    return this.level && getClosestName(Level, this.level) !== Level[Level.None];
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
}
