/// <reference path="../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import { Some, None } from 'option-t';

import WeatherType from '../src/weather-type';
import Storm from '../src/storm/storm';
import Clouds from '../src/clouds/clouds';
import Precipitation from '../src/precipitation/precipitation';
import { TRANSALATABLE_CODES } from './example-codes';

describe('WeatherType', () => {
  let storm = new Storm(0);
  let precipitation = new Precipitation(0, 0, 0);
  let cloud = new Clouds(0);

  function buildCode(): string {
    return new WeatherType(storm, precipitation, cloud).toCode();
  }

  function stubReturning<T>(value: T): () => T {
    return () => value;
  }

  describe('#toCode', () => {

    context('when the Storm can be translated into a code', () => {
      let stormCode = 'storm_code';

      before(() => storm.toCode = stubReturning(new Some(stormCode)));

      it('should return that code', () => {
        expect(buildCode()).to.equal(stormCode);
      });
    });

    context('when the Storm cannot be translated into a code', () => {
      before(() => storm.toCode = stubReturning(new None<string>()));

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
          cloud.toCode = stubReturning(cloudCode);
        });

        it('should return the Clouds code', () => {
          expect(buildCode()).to.equal(cloudCode);
        });
      });
    });
  });

  describe('WeatherType.fromString', () => {
    context('when a string that can become a Clouds instance is used', () => {
      it('should return a Some of a WeatherType', () => {
        TRANSALATABLE_CODES.forEach(code => {
          expect(WeatherType.fromString(code).isSome).to.be.true
        });
      });
    });

    context('when a string that cannot become a Clouds instance is used', () => {
      it('should return a None', () => {
        ['No data', 'unknown', 'fail'].forEach(code => {
          expect(WeatherType.fromString(code).isNone).to.be.true
        });
      });
    });
  });
});
