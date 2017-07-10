import { expect } from 'chai';

import union from './impl';

describe('union method', () => {
  const arr1 = [123, 456, 789];
  const arr2 = ['abc', 'def', 'ghi'];
  const arr3 = [true, false];

  it('should return union of arrays', () => {
    const resultArr = union(arr1, arr2, arr3);
    expect(resultArr.length).to.equal(8);
  });

  it('should not alter original arrays', () => {
    union(arr1, arr2);
    expect(arr1.length).to.equal(3);
    expect(arr2.length).to.equal(3);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    const resultArr = union(undefined, null, []);
    expect(resultArr.length).to.equal(0);
  });
});