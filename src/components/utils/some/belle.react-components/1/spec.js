import { expect } from 'chai';

import some from './impl';

describe('some method', () => {
  const arr = [123, 'abc', () => undefined, undefined];
  const predicate = (obj) => typeof obj === 'number';

  it('should return true is predicate is true for some element', () => {
    const result = some(arr, predicate);
    expect(result).to.be.true;
  });

  it('should not alter original array', () => {
    some(arr, predicate);
    expect(arr.length).to.equal(4);
    expect(arr[0]).to.equal(123);
  });
});