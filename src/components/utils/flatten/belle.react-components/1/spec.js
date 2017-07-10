import { expect } from 'chai';

import flatten from './impl';

describe('flatten method', () => {
  const arr1 = [123, 456, 789];
  const arr2 = ['abc', 'def', 'ghi'];
  const arr3 = [true, false, 123];
  const arr4 = [true, false, ['lmn', 'opq', [98, 45]]];

  it('should return all elements from all arrays', () => {
    const resultArr = flatten(arr1, arr2, arr3);
    expect(resultArr.length).to.equal(9);
  });

  it('should not remove duplicates', () => {
    const resultArr = flatten(arr1, arr3);
    expect(resultArr[0]).to.equal(123);
    expect(resultArr[5]).to.equal(123);
  });

  it('should not alter original arrays', () => {
    flatten(arr1, arr2);
    expect(arr1.length).to.equal(3);
    expect(arr2.length).to.equal(3);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    const resultArr = flatten(undefined, null, []);
    expect([].length).to.equal(0);
  });

  it('should be able to flatten to any level', () => {
    const resultArr = flatten(arr1, arr4);
    expect(resultArr.length).to.equal(9);
  });
});