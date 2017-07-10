import { expect } from 'chai';

import has from './impl';

describe('has method', () => {
  const obj = { test: true };

  it('should return true if object has the field', () => {
    expect(has(obj, 'test')).to.be.true;
  });

  it('should return false if object does not have the field', () => {
    expect(has(obj, 'rest')).to.be.false;
  });

  it('should not break if object is undefined or null', () => {
    expect(has(undefined, 'rest')).to.be.false;
    expect(has(null, 'rest')).to.be.false;
    expect(has({}, 'rest')).to.be.false;
  });

  it('should not break if field passed is undefined or null', () => {
    expect(has(obj, undefined)).to.be.false;
    expect(has(obj, null)).to.be.false;
  });
});