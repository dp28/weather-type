/// <reference path="../../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import { Level, Duration, Type } from '../../src/precipitation/precipitation';
import { extractPrecipitation } from '../../src/precipitation/precipitation-parser';

describe('extractPrecipitation', () => {

  function shouldReturnForAll(level: Level, duration: Duration, type: Type, codes: Array<string>) {
    codes.forEach(code => {
      context(`when the code is "${code}"`, () => {
        it(`should return a Precipitation instance with Level "${Level[level]}"`, () => {
          expect(extractPrecipitation(code).level).to.equal(level);
        });

        it(`should return a Precipitation instance with Duration "${Duration[duration]}"`, () => {
          expect(extractPrecipitation(code).duration).to.equal(duration);
        });

        it(`should return a Precipitation instance with Type "${Type[type]}"`, () => {
          expect(extractPrecipitation(code).type).to.equal(type);
        });
      });
    });
  }

  shouldReturnForAll(Level.Heavy, Duration.Steady, Type.Hail, [
    'Hail',
    'heavy hail',
    'heavy hail storm',
    'heavy_hail'
  ]);

  shouldReturnForAll(Level.Heavy, Duration.Steady, Type.Snow, [
    'Heavy snow',
    'snow',
    'heavy snow',
    'heavy snow storm',
    'blizzard',
    'heavy_snow'
  ]);

  shouldReturnForAll(Level.Heavy, Duration.Steady, Type.Sleet, [
    'Sleet',
    'sleet',
    'rain and snow',
    'heavy_sleet'
  ]);

  shouldReturnForAll(Level.Heavy, Duration.Steady, Type.Rain, [
    'Heavy rain',
    'Thunder',
    'Heavy Rain',
    'heavy_rain',
    'rain',
    'moderate rain',
    'heavy intensity rain',
    'very heavy rain',
    'extreme rain',
    'freezing rain',
    'thunderstorm with rain',
    'thunderstorm with heavy rain',
    'thunderstorm',
    'heavy thunderstorm',
    'ragged thunderstorm',
    'heavy storm',
    'storm',
    'heavy_rain'
  ]);

  shouldReturnForAll(Level.Heavy, Duration.Showers, Type.Hail, [
    'Hail shower (night)',
    'Hail shower (day)',
    'hail showers',
    'heavy hail showers',
    'heavy_hail_showers'
  ]);

  shouldReturnForAll(Level.Heavy, Duration.Showers, Type.Snow, [
    'Heavy snow shower (night)',
    'Heavy snow shower (day)',
    'shower snow',
    'heavy shower snow',
    'snow shower (heavy)',
    'heavy_snow_showers'
  ]);

  shouldReturnForAll(Level.Heavy, Duration.Showers, Type.Sleet, [
    'Sleet shower (night)',
    'Sleet shower (day)',
    'shower sleet',
    'heavy sleet showers',
    'heavy_sleet_showers'
  ]);

  shouldReturnForAll(Level.Heavy, Duration.Showers, Type.Rain, [
    'Heavy rain shower (night)',
    'Heavy rain shower (day)',
    'Thunder shower (night)',
    'Thunder shower (day)',
    'Heavy Rain Shower',
    'heavy intensity drizzle',
    'heavy intensity drizzle rain',
    'heavy shower rain and drizzle',
    'heavy intensity shower rain',
    'shower rain',
    'ragged shower rain',
    'thunderstorm with heavy drizzle',
    'heavy_rain_showers'
  ]);

  shouldReturnForAll(Level.Light, Duration.Steady, Type.Hail, [
    'light hail',
    'light_hail'
  ]);

  shouldReturnForAll(Level.Light, Duration.Steady, Type.Snow, [
    'Light snow',
    'light snow',
    'light_snow'
  ]);

  shouldReturnForAll(Level.Light, Duration.Steady, Type.Sleet, [
    'light rain and snow',
    'light sleet',
    'light_sleet'
  ]);

  shouldReturnForAll(Level.Light, Duration.Steady, Type.Rain, [
    'Light rain',
    'Light Rain',
    'light rain',
    'thunderstorm with light rain',
    'light thunderstorm',
    'light_rain',
  ]);

  shouldReturnForAll(Level.Light, Duration.Showers, Type.Hail, [
    'light hail shower',
    'light_hail_showers'
  ]);

  shouldReturnForAll(Level.Light, Duration.Showers, Type.Snow, [
    'Light snow shower (night)',
    'Light snow shower (day)',
    'light shower snow',
    'light snow shower',
    'light_snow_shower'
  ]);

  shouldReturnForAll(Level.Light, Duration.Showers, Type.Sleet, [
    'light rain and snow shower',
    'light sleet shower',
    'light_sleet_showers'
  ]);

  shouldReturnForAll(Level.Light, Duration.Showers, Type.Rain, [
    'Light rain shower (night)',
    'Light rain shower (day)',
    'Drizzle',
    'Light Rain Shower',
    'light intensity drizzle',
    'drizzle',
    'light intensity drizzle rain',
    'drizzle rain',
    'shower rain and drizzle',
    'shower drizzle',
    'light intensity shower rain',
    'thunderstorm with light drizzle',
    'thunderstorm with drizzle',
    'light_rain_showers'
  ]);

  shouldReturnForAll(Level.None, Duration.Showers, Type.Rain, [
    'Clear night',
    'Sunny day',
    'Partly cloudy (night)',
    'Sunny intervals',
    'Mist',
    'Fog',
    'Cloudy',
    'Overcast',
    'No data',
    'Clear Sky',
    'Sunny',
    'Sunny Intervals',
    'Partly Cloudy',
    'Light Cloud',
    'Thick Cloud',
    'Mist',
    'Fog',
    'clear sky',
    'few clouds',
    'scattered clouds',
    'broken clouds',
    'overcast clouds',
    'mist',
    'haze',
    'fog',
    'unknown',
    'clear',
    'broken_clouds',
    'light_clouds',
    'heavy_clouds'
  ]);
});
