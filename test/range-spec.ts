/// <reference path="../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import Range from '../src/range';

describe('Range', () => {
  let first = 'test 1';
  let second = 'test 2';
  let third = 'test 3';

  let subject = new Range(first, second, third);

  describe('.names', () => {
    it('should return the names passed in to the constructor in order', () => {
      expect(subject.names).to.deep.equal([first, second, third]);
    });
  });

  describe('.values', () => {
    it('should return the indices of the array of names', () => {
      expect(subject.values).to.deep.equal([0, 1, 2]);
    });
  });

  describe('#getClosest', () => {
    context('when the value provided is negative', () => {
      it('should return the first name', () => {
        expect(subject.getClosest(-1)).to.equal(first);
      });
    });

    context('when the value provided is zero', ()=> {
      it('should return the first name', () => {
        expect(subject.getClosest(0)).to.equal(first);
      });
    });

    context('when the value provided is greater than the number of names', () => {
      it('should return the last name', () => {
        expect(subject.getClosest(10)).to.equal(third);
      });
    });

    context('when the value provided is an index of a name', () => {
      it('should return the specific name', () => {
        expect(subject.getClosest(1)).to.equal(second);
      });
    });

    context('when the value provided can round up to an index of a name', () => {
      it('should return the specific name', () => {
        expect(subject.getClosest(1.7)).to.equal(third);
      });
    });

    context('when the value provided can round down to index of a name', () => {
      it('should return the specific name', () => {
        expect(subject.getClosest(1.2)).to.equal(second);
      });
    });
  });
});
