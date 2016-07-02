/// <reference path="../../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import Precipitation from '../../src/precipitation/precipitation';
import { Level, Duration, Type } from '../../src/precipitation/precipitation';
import { getAllNames } from '../../src/enum-utils';
import { Option } from 'option-t';

describe('Precipitation', () => {
  let level = 0;
  let duration = 0;
  let type = 0;

  function buildPrecipitation(): Precipitation {
    return new Precipitation(level, duration, type);
  }

  describe('#isApplicable', () => {
    function isApplicable(): boolean {
      return buildPrecipitation().isApplicable();
    }

    context('when PrecipitationLevel is', () => {
      context('0 (Level.None)', () => {
        beforeEach(() => level = 0);
        it('should return false', () => {
          expect(isApplicable()).to.be.false;
        });
      });

      context('negative', () => {
        beforeEach(() => level = -1);
        it('should return false', () => {
          expect(isApplicable()).to.be.false;
        });
      });

      [Level.Light, Level.Heavy].map(levelValue => {
        beforeEach(() => level = levelValue);
        it('should return false', () => {
          expect(isApplicable()).to.be.true;
        });
      });
    });
  });

  describe('#toCode', () => {
    function buildCodeOption(): Option<string> {
      return buildPrecipitation().toCode();
    }

    function buildCode(): string {
      return buildCodeOption().unwrap();
    }

    context('when PrecipitationLevel is', () => {
      context('0 (Level.None)', () => {
        beforeEach(() => level = 0);
        it('should return None', () => {
          expect(buildCodeOption().isNone).to.eq(true);
        });
      });

      context('negative', () => {
        beforeEach(() => level = -1);
        it('should return None', () => {
          expect(buildCodeOption().isNone).to.eq(true);
        });
      });

      [Level.Light, Level.Heavy].map(levelValue => {
        context(`${levelValue} (Level.${Level[levelValue]})`, () => {
          beforeEach(() => level = levelValue);

          getAllNames(Type).map(typeName => {
            context(`and the Type value is ${Type[typeName]} (Type.${typeName})`, () => {
              beforeEach(() => type = Type[typeName])

              context('and the Duration value is 0 (Duration.Showers)', () => {
                beforeEach(() => duration = 0)

                const expected = `${Level[levelValue]}_${typeName}_showers`.toLowerCase();

                it(`is Some("${expected}")`, () => {
                  expect(buildCode()).to.equal(expected);
                });
              });

              context('and the Duration value is 1 (Duration.Steady)', () => {
                beforeEach(() => duration = 1)

                const expected = `${Level[levelValue]}_${typeName}`.toLowerCase();

                it(`is Some("${expected}")`, () => {
                  expect(buildCode()).to.equal(expected);
                });
              });
            });
          });
        });
      });
    });
  });

  describe('#isLight', () => {
    context('and the Level is 0 (Level.None)', () => {
      beforeEach(() => level = 0);
      it('is false', () => {
        expect(buildPrecipitation().isLight()).to.be.false
      });
    });

    context('and the Level is 1 (Level.Light)', () => {
      beforeEach(() => level = 1);
      it('is true', () => {
        expect(buildPrecipitation().isLight()).to.be.true
      });
    });

    context('and the Level is 2 (Level.Heavy)', () => {
      beforeEach(() => level = 2);
      it('is false', () => {
        expect(buildPrecipitation().isLight()).to.be.false
      });
    });
  });

  describe('#isHeavy', () => {
    context('and the Level is 0 (Level.None)', () => {
      beforeEach(() => level = 0);
      it('is false', () => {
        expect(buildPrecipitation().isHeavy()).to.be.false
      });
    });

    context('and the Level is 1 (Level.Light)', () => {
      beforeEach(() => level = 1);
      it('is false', () => {
        expect(buildPrecipitation().isHeavy()).to.be.false
      });
    });

    context('and the Level is 2 (Level.Heavy)', () => {
      beforeEach(() => level = 2);
      it('is true', () => {
        expect(buildPrecipitation().isHeavy()).to.be.true
      });
    });
  });

  describe('#isShowers', () => {
    context('and the Duration is 0 (Duration.Showers)', () => {
      beforeEach(() => duration = 0);
      it('is true', () => {
        expect(buildPrecipitation().isShowers()).to.be.true
      });
    });

    context('and the Duration is 1 (Duration.Steady)', () => {
      beforeEach(() => duration = 1);
      it('is false', () => {
        expect(buildPrecipitation().isShowers()).to.be.false
      });
    });
  });

  describe('#isSteady', () => {
    context('and the Duration is 0 (Duration.Showers)', () => {
      beforeEach(() => duration = 0);
      it('is false', () => {
        expect(buildPrecipitation().isSteady()).to.be.false
      });
    });

    context('and the Duration is 1 (Duration.Steady)', () => {
      beforeEach(() => duration = 1);
      it('is true', () => {
        expect(buildPrecipitation().isSteady()).to.be.true
      });
    });
  });

  describe('#isRain', () => {
    context('and the Type is 0 (Type.Rain)', () => {
      beforeEach(() => type = 0);
      it('is true', () => {
        expect(buildPrecipitation().isRain()).to.be.true
      });
    });

    context('and the Type is 1 (Type.Sleet)', () => {
      beforeEach(() => type = 1);
      it('is false', () => {
        expect(buildPrecipitation().isRain()).to.be.false
      });
    });

    context('and the Type is 2 (Type.Snow)', () => {
      beforeEach(() => type = 2);
      it('is false', () => {
        expect(buildPrecipitation().isRain()).to.be.false
      });
    });

    context('and the Type is 3 (Type.Hail)', () => {
      beforeEach(() => type = 3);
      it('is false', () => {
        expect(buildPrecipitation().isRain()).to.be.false
      });
    });
  });

  describe('#isSleet', () => {
    context('and the Type is 0 (Type.Rain)', () => {
      beforeEach(() => type = 0);
      it('is false', () => {
        expect(buildPrecipitation().isSleet()).to.be.false
      });
    });

    context('and the Type is 1 (Type.Sleet)', () => {
      beforeEach(() => type = 1);
      it('is true', () => {
        expect(buildPrecipitation().isSleet()).to.be.true
      });
    });

    context('and the Type is 2 (Type.Snow)', () => {
      beforeEach(() => type = 2);
      it('is false', () => {
        expect(buildPrecipitation().isSleet()).to.be.false
      });
    });

    context('and the Type is 3 (Type.Hail)', () => {
      beforeEach(() => type = 3);
      it('is false', () => {
        expect(buildPrecipitation().isSleet()).to.be.false
      });
    });
  });

  describe('#isSnow', () => {
    context('and the Type is 0 (Type.Rain)', () => {
      beforeEach(() => type = 0);
      it('is false', () => {
        expect(buildPrecipitation().isSnow()).to.be.false
      });
    });

    context('and the Type is 1 (Type.Sleet)', () => {
      beforeEach(() => type = 1);
      it('is false', () => {
        expect(buildPrecipitation().isSnow()).to.be.false
      });
    });

    context('and the Type is 2 (Type.Snow)', () => {
      beforeEach(() => type = 2);
      it('is true', () => {
        expect(buildPrecipitation().isSnow()).to.be.true
      });
    });

    context('and the Type is 3 (Type.Hail)', () => {
      beforeEach(() => type = 3);
      it('is false', () => {
        expect(buildPrecipitation().isSnow()).to.be.false
      });
    });
  });

  describe('#isHail', () => {
    context('and the Type is 0 (Type.Rain)', () => {
      beforeEach(() => type = 0);
      it('is false', () => {
        expect(buildPrecipitation().isHail()).to.be.false
      });
    });

    context('and the Type is 1 (Type.Sleet)', () => {
      beforeEach(() => type = 1);
      it('is false', () => {
        expect(buildPrecipitation().isHail()).to.be.false
      });
    });

    context('and the Type is 2 (Type.Snow)', () => {
      beforeEach(() => type = 2);
      it('is false', () => {
        expect(buildPrecipitation().isHail()).to.be.false
      });
    });

    context('and the Type is 3 (Type.Hail)', () => {
      beforeEach(() => type = 3);
      it('is true', () => {
        expect(buildPrecipitation().isHail()).to.be.true
      });
    });
  });
});
