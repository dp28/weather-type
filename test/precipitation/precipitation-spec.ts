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
});
