import Storm from './storm/storm';
import Clouds from './clouds/clouds';
import Precipitation from './precipitation/precipitation';

export default class WeatherType {

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
