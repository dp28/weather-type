/// <reference path="../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import WeatherType from '../src/weather-type';

describe('WeatherType', () => {
  let subject: WeatherType;
  let raw: string = 'test';

  beforeEach(function () {
    subject = new WeatherType(raw);
  });

  describe('#raw', () => {
    it('should add two numbers together', () => {
      expect(subject.raw).to.equal(raw);
    });
  });
});
