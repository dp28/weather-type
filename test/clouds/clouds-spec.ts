/// <reference path="../../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import Clouds from '../../src/clouds/clouds';
import { Level } from '../../src/clouds/clouds';
import { getAllNames } from '../../src/enum-utils';

describe('Clouds', () => {
  let level = 0;

  function buildCode(): string {
    return new Clouds(level).toCode();
  }

  function itShouldBe(code) {
    it(`should be "${code}"`, () => {
      expect(buildCode()).to.equal(code);
    });
  }

  describe('#toCode', () => {
    context('when Level is 0 (Level.Clear)', () => {
      before(() => level = 0);
      itShouldBe('clear');
    });

    context('when Level is 1 (Level.Broken)', () => {
      before(() => level = 1);
      itShouldBe('broken_clouds');
    });

    context('when Level is 2 (Level.Light)', () => {
      before(() => level = 2);
      itShouldBe('light_clouds');
    });

    context('when Level is 3 (Level.Heavy)', () => {
      before(() => level = 3);
      itShouldBe('heavy_clouds');
    });

    context('when Level is 4 (Level.Mist)', () => {
      before(() => level = 4);
      itShouldBe('mist');
    });

    context('when Level is 5 (Level.Fog)', () => {
      before(() => level = 5);
      itShouldBe('fog');
    });
  });
});
