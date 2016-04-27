/// <reference path="../../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';

import Some from '../../src/utils/some';
import { Unit } from '../../src/utils/option';

describe('Some', () => {
  const value = 1;
  const some = Some(1);

  describe('#map', () => {
    it('should return a Some with the mapping function applied to the value', () => {
      expect(some.map((n: number) => n + 1).equals(Some(2))).to.equal(true);
    });
  });

  describe('#foreach', () => {
    it('should call the handler function', () => {
      let shouldChange: number = 1;
      let sideEffectHandler: Unit<number> = (n: number) => shouldChange = 2;
      some.foreach(sideEffectHandler);
      expect(shouldChange).to.equal(2);
    });
  });

  describe('#getOrElse', () => {
    it('should return the value', () => {
      expect(some.getOrElse(2)).to.equal(value);
    });
  });

  describe('.isDefined', () => {
    it('should be true', () => {
      expect(some.isDefined).to.equal(true);
    });
  });

  describe('.isEmpty', () => {
    it('should be false', () => {
      expect(some.isEmpty).to.equal(false);
    });
  });
});
