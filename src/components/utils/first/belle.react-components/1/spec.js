import { expect } from 'chai';

import first from './impl';

describe('first method', () => {
  it('should find first element of an array', () => {
    expect(first([1, 2, 3])).to.equal(1);
    expect(first([null, 1, 2, 3, null])).to.be.null;
    expect(first([undefined, 1, 2, 3])).to.be.undefined;
  });

  it('should not break for empty array', () => {
    expect(first(undefined)).to.be.undefined;
    expect(first(null)).to.be.undefined;
    expect(first([])).to.be.undefined;
  });
});