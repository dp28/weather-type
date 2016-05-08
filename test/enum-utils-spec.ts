/// <reference path="../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import { getClosestName } from '../src/enum-utils';

describe('getClosestName', () => {
  enum Enum { First, Second, Third }
  let subject = (value) => getClosestName(Enum, value)

  context('when the value provided is negative', () => {
    it('should return the first name', () => {
      expect(subject(-1)).to.equal(Enum[0]);
    });
  });

  context('when the value provided is zero', ()=> {
    it('should return the first name', () => {
      expect(subject(0)).to.equal(Enum[0]);
    });
  });

  context('when the value provided is greater than the number of names', () => {
    it('should return the last name', () => {
      expect(subject(10)).to.equal(Enum[2]);
    });
  });

  context('when the value provided is an index of a name', () => {
    it('should return the specific name', () => {
      expect(subject(1)).to.equal(Enum[1]);
    });
  });

  context('when the value provided can round up to an index of a name', () => {
    it('should return the specific name', () => {
      expect(subject(1.7)).to.equal(Enum[2]);
    });
  });

  context('when the value provided can round down to index of a name', () => {
    it('should return the specific name', () => {
      expect(subject(1.2)).to.equal(Enum[1]);
    });
  });
});
