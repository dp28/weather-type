import { Some, None, Option } from 'option-t';
import { getClosestName } from '../enum-utils';
import { buildWeatherCode } from '../weather-code-utils';

export enum Level {
  None,
  Thunderstorm
}

export default class Storm {
  constructor(public level: number) {}

  public toCode(): Option<string> {
    const levelCode = getClosestName(Level, this.level);
    if (Level[levelCode] === Level.None)
      return new None<string>()
    else
      return new Some(buildWeatherCode([levelCode]));
  }
}
