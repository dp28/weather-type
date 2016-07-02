/// <reference path="../../typings/mocha/mocha.d.ts" />

import { expect } from 'chai';
import Storm from '../../src/storm/storm';
import { Level } from '../../src/storm/storm';
import { getAllNames } from '../../src/enum-utils';
import { Option } from 'option-t';

describe('Storm', () => {
  describe('#isApplicable', () => {
    let level = 0;

    function isApplicable(): boolean {
      return new Storm(level).isApplicable();
    }

    context('when Level is 0 (Level.None)', () => {
      before(() => level = 0);
      it('should be false', () => {
        expect(isApplicable()).to.be.false;
      });
    });

    context('when Level is 0.4', () => {
      before(() => level = 0.4);
      it('should be false', () => {
        expect(isApplicable()).to.be.false;
      });
    });

    context('when Level is 0.5', () => {
      before(() => level = 0.5);
      it('should be true', () => {
        expect(isApplicable()).to.be.true;
      });
    });

    context('when Level is 1 (Level.Thunderstorm)', () => {
      before(() => level = 1);
      it('should be true', () => {
        expect(isApplicable()).to.be.true;
      });
    });
  });
  });

  describe('#toCode', () => {
    let level = 0;

    function buildCode(): Option<string> {
      return new Storm(level).toCode();
    }

    context('when Level is 0 (Level.None)', () => {
      before(() => level = 0);
      it('should be None', () => {
        expect(buildCode().isNone).to.be.true;
      });
    });

    context('when Level is 0.4', () => {
      before(() => level = 0.4);
      it('should be None', () => {
        expect(buildCode().isNone).to.be.true;
      });
    });

    context('when Level is 0.5', () => {
      before(() => level = 0.5);
      it('should be Some("thunderstorm")', () => {
        expect(buildCode().unwrap()).to.equal('thunderstorm');
      });
    });

    context('when Level is 1 (Level.Thunderstorm)', () => {
      before(() => level = 1);
      it('should be Some("thunderstorm")', () => {
        expect(buildCode().unwrap()).to.equal('thunderstorm');
      });
    });
  });
});
