/// <reference path="../../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import Clouds from '../../src/clouds/clouds';
import { Level } from '../../src/clouds/clouds';
import { extractClouds } from '../../src/clouds/clouds-parser';

describe('extractClouds', () => {

  function shouldReturnLevelForAll(level: Level, codes: Array<string>) {
    codes.forEach(code => {
      context(`when the code is "${code}"`, () => {
        it(`should be return a Some of a Clouds instance with the Level "${Level[level]}"`, () => {
          expect(extractClouds(code).unwrap().level).to.equal(level);
        });
      });
    });
  }

  shouldReturnLevelForAll(Level.Fog, ['Fog', 'fog', 'haze']);
  shouldReturnLevelForAll(Level.Mist, ['Mist', 'mist']);

  shouldReturnLevelForAll(Level.Heavy, [
    'Overcast',
    'Heavy rain shower (night)',
    'Heavy rain shower (day)',
    'Heavy rain',
    'Heavy snow shower (night)',
    'Heavy snow shower (day)',
    'Heavy snow',
    'Sleet shower (night)',
    'Sleet shower (day)',
    'Sleet',
    'Hail shower (night)',
    'Hail shower (day)',
    'Hail',
    'Thunder shower (night)',
    'Thunder shower (day)',
    'Thunder',
    'Thick Cloud',
    'Heavy Rain Shower',
    'Heavy Rain',
    'overcast clouds',
    'heavy intensity drizzle',
    'heavy intensity drizzle rain',
    'heavy shower rain and drizzle',
    'moderate rain',
    'heavy intensity rain',
    'very heavy rain',
    'extreme rain',
    'freezing rain',
    'snow',
    'heavy snow',
    'sleet',
    'shower sleet',
    'rain and snow',
    'shower snow',
    'thunderstorm with rain',
    'thunderstorm with heavy rain',
    'thunderstorm',
    'heavy thunderstorm',
    'ragged thunderstorm',
    'thunderstorm with heavy drizzle',
    'heavy_clouds'
  ]);

  shouldReturnLevelForAll(Level.Light, [
    'Cloudy',
    'Light rain shower (night)',
    'Light rain shower (day)',
    'Drizzle',
    'Light rain',
    'Light snow shower (night)',
    'Light snow shower (day)',
    'Light snow',
    'Light Cloud',
    'Light Rain Shower',
    'Light Rain',
    'light intensity drizzle',
    'drizzle',
    'light intensity drizzle rain',
    'drizzle rain',
    'shower rain and drizzle',
    'shower drizzle',
    'light rain',
    'light snow',
    'light rain and snow',
    'light shower snow',
    'thunderstorm with light rain',
    'light thunderstorm',
    'thunderstorm with light drizzle',
    'thunderstorm with drizzle',
    'light_clouds'
  ]);

  shouldReturnLevelForAll(Level.Broken, [
    'Partly cloudy (night)',
    'Sunny intervals',
    'Sunny Intervals',
    'Sunny spells',
    'Partly Cloudy',
    'few clouds',
    'scattered clouds',
    'broken clouds',
    'broken_clouds',
  ]);

  shouldReturnLevelForAll(Level.Clear, [
    'Clear night',
    'Sunny day',
    'Clear Sky',
    'Sunny',
    'clear sky',
    'clear',
  ]);

  context('when the code includes "mist" and "fog"', () => {
    it('should return the larger enum value (Level.Fog)', () => {
      expect(extractClouds('mist_fog').unwrap().level).to.equal(Level.Fog);
    });
  });

  ['No data', 'unknown', '', 'bla bla bla'].forEach(code => {
    context(`when the code is "${code}"`, () => {
      it('should be return a None', () => {
        expect(extractClouds(code).isNone).to.be.true;
      });
    });
  });
});
