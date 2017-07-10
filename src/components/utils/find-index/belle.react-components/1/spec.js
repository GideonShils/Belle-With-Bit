import { expect } from 'chai';

import findIndex from './impl';

describe('findIndex method', () => {
  const arr = [123, 'abc', () => undefined, undefined];
  const predicate = (object) => typeof object === 'number';

  it('should find index of first numeric value in array', () => {
    const index = findIndex(arr, predicate);
    expect(index).to.equal(0);
  });

  it('should not alter original array', () => {
    findIndex(arr, predicate);
    expect(arr.length).to.equal(4);
    expect(arr[0]).to.equal(123);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let obj2;
    let resultObj = findIndex(obj2, predicate);
    expect(resultObj).to.be.undefined;
    obj2 = null;
    resultObj = findIndex(obj2, predicate);
    expect(resultObj).to.be.undefined;
    obj2 = [];
    resultObj = findIndex(obj2, predicate);
    expect(resultObj).to.be.undefined;
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate2 = undefined;
    let resultObj = findIndex(arr, predicate2);
    expect(resultObj).to.be.undefined;
    predicate2 = null;
    resultObj = findIndex(arr, predicate);
    expect(resultObj).to.equal(0);
  });

  it('should return undefined in case the entry could not be found', () => {
    const customPredicate = (resultObj) => resultObj === 567;

    const index = findIndex(arr, customPredicate);
    expect(index).to.be.undefined;
  });
});