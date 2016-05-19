import Storm from './storm';
import { Level } from './storm';

export function extractStorm(code: string): Storm {
  const level = isStorm(code) ? Level.Thunderstorm : Level.None;
  return new Storm(level);
}

function isStorm(code: string): boolean {
  return code.indexOf('storm') >= 0 || code.indexOf('thunder') >= 0;
}
