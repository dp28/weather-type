import { Some, None, Option } from 'option-t';
import { getClosestName } from '../enum-utils';
import { buildWeatherCode } from '../weather-code-utils';

export enum Level {
  None,
  Thunderstorm
}

export default class Storm {
  constructor(public level: number) {}

  public isApplicable(): boolean {
    return Level[this.levelCode] !== Level.None;
  }

  public toCode(): Option<string> {
    if (this.isApplicable())
      return new Some(buildWeatherCode([this.levelCode]));
    else
      return new None<string>();
  }

  private get levelCode(): string {
    return getClosestName(Level, this.level)
  }
}
