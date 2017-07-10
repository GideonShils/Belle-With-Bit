import { expect } from 'chai';

import find from './impl';

describe('find method', () => {
  const arr = [123, 'abc', () => undefined, undefined];
  const predicate = (object) => typeof object === 'number';

  it('should find first numeric value in array', () => {
    const resultObj = find(arr, predicate);
    expect(resultObj).to.equal(123);
  });

  it('should not alter original array', () => {
    find(arr, predicate);
    expect(arr.length).to.equal(4);
    expect(arr[0]).to.equal(123);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr2;
    let resultObj = find(arr2, predicate);
    expect(resultObj).to.be.undefined;
    arr2 = null;
    resultObj = find(arr2, predicate);
    expect(resultObj).to.be.undefined;
    arr2 = [];
    resultObj = find(arr2, predicate);
    expect(resultObj).to.be.undefined;
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate2 = undefined;
    let resultObj = find(arr, predicate2);
    expect(resultObj).to.be.undefined;
    predicate2 = null;
    resultObj = find(arr, predicate2);
    expect(resultObj).to.be.undefined;
  });
});