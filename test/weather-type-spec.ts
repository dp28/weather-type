/// <reference path="../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import WeatherType from '../src/weather-type';
import Storm from '../src/storm/storm';
import Clouds from '../src/clouds/clouds';
import Precipitation from '../src/precipitation/precipitation';
import { Some, None } from 'option-t';

describe('WeatherType', () => {
  let stormLevel = new Storm(0);
  let precipitation = new Precipitation(0, 0, 0);
  let cloudLevel = new Clouds(0);

  function buildCode(): string {
    return new WeatherType(stormLevel, precipitation, cloudLevel).toCode();
  }

  function stubReturning<T>(value: T): () => T {
    return () => value;
  }

  describe('#toCode', () => {

    context('when the Storm can be translated into a code', () => {
      let stormCode = 'storm_code';

      before(() => stormLevel.toCode = stubReturning(new Some(stormCode)));

      it('should return that code', () => {
        expect(buildCode()).to.equal(stormCode);
      });
    });

    context('when the Storm cannot be translated into a code', () => {
      before(() => stormLevel.toCode = stubReturning(new None<string>()));

      context('when the Precipitation can be translated into a code', () => {
        let rainCode = 'rain_code';

        before(() => precipitation.toCode = stubReturning(new Some(rainCode)));

        it('should return that code', () => {
          expect(buildCode()).to.equal(rainCode);
        });
      });

      context('when the Precipitation cannot be translated into a code', () => {
        let cloudCode = 'cloud_code';

        before(() => {
          precipitation.toCode = stubReturning(new None<string>())
          cloudLevel.toCode = stubReturning(cloudCode);
        });

        it('should return the Clouds code', () => {
          expect(buildCode()).to.equal(cloudCode);
        });
      });
    });
  });
});
