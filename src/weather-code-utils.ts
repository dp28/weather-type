const SEPARATOR = '_';

export function buildWeatherCode(parts: Array<string>): string {
  return parts.map(part => part.toLowerCase()).join(SEPARATOR);
}
