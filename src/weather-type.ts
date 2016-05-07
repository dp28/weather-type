export default class WeatherType {
  precipitation: Precipitation;
  cloudLevel: CloudLevel;
  stormy: Boolean;
  constructor(public raw: string) {
  }
}

interface Precipitation {
  type: PreciptitationType;
  intensity: PrecipitationIntensity;
  duration: PrecipitationDuration;
}

enum PreciptitationType {
  Rain,
  Sleet,
  Snow,
  Hail
}

enum PrecipitationIntensity {
  Light,
  Heavy
}

enum PrecipitationDuration {
  Showers,
  Steady
}

enum CloudLevel {
  Broken,
  Light,
  Heavy,
  Fog
}
