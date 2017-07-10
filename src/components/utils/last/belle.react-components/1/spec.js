import { expect } from 'chai';

import last from './impl';

describe('last method', () => {
  it('should find last element of an array', () => {
    expect(last([1, 2, 3])).to.equal(3);
    expect(last([1, 2, 3, null])).to.be.null;
    expect(last([1, 2, 3, undefined])).to.be.undefined;
  });

  it('should not break for empty array', () => {
    expect(last(undefined)).to.be.undefined;
    expect(last(null)).to.be.undefined;
    expect(last([])).to.be.undefined;
  });
});