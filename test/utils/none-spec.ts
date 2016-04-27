/// <reference path="../../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';

import None from '../../src/utils/none';
import { Unit } from '../../src/utils/option';

describe('None', () => {
  const none = None<number>();

  describe('#map', () => {
    it('should return the same object', () => {
      expect(none.map((n: number) => 'test')).to.equal(none);
    });
  });

  describe('#foreach', () => {
    it('should not call the handler function', () => {
      const originalVal = 1;
      let shouldNotChange: number = originalVal;
      let sideEffectHandler: Unit<number> = (n: number) => shouldNotChange = 2;
      none.foreach(sideEffectHandler);
      expect(shouldNotChange).to.equal(originalVal);
    });
  });

  describe('#getOrElse', () => {
    it('should return the supplied fallback', () => {
      expect(none.getOrElse(1)).to.equal(1);
    });
  });

  describe('.isDefined', () => {
    it('should be false', () => {
      expect(none.isDefined).to.equal(false);
    });
  });

  describe('.isEmpty', () => {
    it('should be true', () => {
      expect(none.isEmpty).to.equal(true);
    });
  });
});
