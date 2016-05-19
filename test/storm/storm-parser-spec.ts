/// <reference path="../../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import Storm from '../../src/storm/storm';
import { Level } from '../../src/storm/storm';
import { extractStorm } from '../../src/storm/storm-parser';

describe('extractStorm', () => {

  context('when the code contains "storm"', () => {
    it('should be return a Storm with the Level "Thunderstorm"', () => {
      ['storm', 'thunderstorm'].forEach(code => {
        expect(extractStorm(code).level).to.equal(Level.Thunderstorm);
      });
    });
  });

  context('when the code contains "thunder"', () => {
    it('should be return a Storm with the Level "Thunderstorm"', () => {
      ['thunder', 'thunderstorm'].forEach(code => {
        expect(extractStorm(code).level).to.equal(Level.Thunderstorm);
      });
    });
  });

  context('when the code does not contain "storm"', () => {
    it('should be return a Storm with the Level "None"', () => {
      ['', 'rain', 'stor'].forEach(code => {
        expect(extractStorm(code).level).to.equal(Level.None);
      });
    });
  });
});
