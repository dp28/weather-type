import Type from './precipitation-type';
import Intensity from './precipitation-intensity';
import Duration from './precipitation-duration';

export { Type, Intensity, Duration };

export default class Precipitation {

  readonly code: string;

  constructor(
    private type: Type,
    private intensity: Intensity,
    private duration: Duration
  ) {
    this.code = buildCode(type, intensity, duration);
  }
}

function buildCode(type: Type, intensity: Intensity, duration: Duration) {
  const isSteady = duration == Duration.Steady;
  const duration_suffix = isSteady ? '' : `_${Duration[duration]}`;
  return `${Intensity[intensity]}_${Type[type]}${duration_suffix}`;
}
