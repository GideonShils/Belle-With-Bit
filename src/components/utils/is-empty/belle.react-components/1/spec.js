import { expect } from 'chai';

import isEmpty from './impl';

describe('isEmpty method', () => {
  it('should return false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).to.be.false;
  });

  it('should return true for empty array', () => {
    expect(isEmpty([])).to.be.true;
    expect(isEmpty(null)).to.be.true;
    expect(isEmpty(undefined)).to.be.true;
  });
});