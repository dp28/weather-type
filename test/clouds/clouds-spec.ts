/// <reference path="../../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import Clouds from '../../src/clouds/clouds';
import { Level } from '../../src/clouds/clouds';
import { getAllNames } from '../../src/enum-utils';

describe('Clouds', () => {
  let level = 0;

  function buildCloud(): Clouds {
    return new Clouds(level);
  }

  describe('#toCode', () => {
    function buildCode(): string {
      return buildCloud().toCode();
    }

    function itShouldBe(code) {
      it(`should be "${code}"`, () => {
        expect(buildCode()).to.equal(code);
      });
    }

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

  describe('#isClear', () => {
    context('and the Level is 0 (Level.Clear)', () => {
      beforeEach(() => level = 0);
      it('is true', () => {
        expect(buildCloud().isClear()).to.be.true
      });
    });

    getAllNames(Level).filter(level => level !== Level[Level.Clear]).forEach(levelName => {
      context(`and the Level is ${Level[levelName]} (Level.${levelName})`, () => {
        beforeEach(() => level = Level[levelName]);
        it('is false', () => {
          expect(buildCloud().isClear()).to.be.false
        });
      });
    });
  });

  describe('#isBroken', () => {
    context('and the Level is 1 (Level.Broken)', () => {
      beforeEach(() => level = 1);
      it('is true', () => {
        expect(buildCloud().isBroken()).to.be.true
      });
    });

    getAllNames(Level).filter(level => level !== Level[Level.Broken]).forEach(levelName => {
      context(`and the Level is ${Level[levelName]} (Level.${levelName})`, () => {
        beforeEach(() => level = Level[levelName]);
        it('is false', () => {
          expect(buildCloud().isBroken()).to.be.false
        });
      });
    });
  });

  describe('#isLight', () => {
    context('and the Level is 2 (Level.Light)', () => {
      beforeEach(() => level = 2);
      it('is true', () => {
        expect(buildCloud().isLight()).to.be.true
      });
    });

    getAllNames(Level).filter(level => level !== Level[Level.Light]).forEach(levelName => {
      context(`and the Level is ${Level[levelName]} (Level.${levelName})`, () => {
        beforeEach(() => level = Level[levelName]);
        it('is false', () => {
          expect(buildCloud().isLight()).to.be.false
        });
      });
    });
  });

  describe('#isHeavy', () => {
    context('and the Level is 3 (Level.Heavy)', () => {
      beforeEach(() => level = 3);
      it('is true', () => {
        expect(buildCloud().isHeavy()).to.be.true
      });
    });

    getAllNames(Level).filter(level => level !== Level[Level.Heavy]).forEach(levelName => {
      context(`and the Level is ${Level[levelName]} (Level.${levelName})`, () => {
        beforeEach(() => level = Level[levelName]);
        it('is false', () => {
          expect(buildCloud().isHeavy()).to.be.false
        });
      });
    });
  });

  describe('#isMist', () => {
    context('and the Level is 4 (Level.Mist)', () => {
      beforeEach(() => level = 4);
      it('is true', () => {
        expect(buildCloud().isMist()).to.be.true
      });
    });

    getAllNames(Level).filter(level => level !== Level[Level.Mist]).forEach(levelName => {
      context(`and the Level is ${Level[levelName]} (Level.${levelName})`, () => {
        beforeEach(() => level = Level[levelName]);
        it('is false', () => {
          expect(buildCloud().isMist()).to.be.false
        });
      });
    });
  });

  describe('#isFog', () => {
    context('and the Level is 5 (Level.Fog)', () => {
      beforeEach(() => level = 5);
      it('is true', () => {
        expect(buildCloud().isFog()).to.be.true
      });
    });

    getAllNames(Level).filter(level => level !== Level[Level.Fog]).forEach(levelName => {
      context(`and the Level is ${Level[levelName]} (Level.${levelName})`, () => {
        beforeEach(() => level = Level[levelName]);
        it('is false', () => {
          expect(buildCloud().isFog()).to.be.false
        });
      });
    });
  });
});
