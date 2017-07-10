import { expect } from 'chai';

import map from './impl';

describe('map method for arrays', () => {
  const arr = [5, 10, 50, 100];
  const predicate = (obj) => obj / 5;

  it('should map to an output array as per predicate', () => {
    const mapArr = map(arr, predicate);
    expect(mapArr.length).to.equal(4);
    expect(mapArr[0]).to.equal(1);
  });

  it('should not alter original array', () => {
    map(arr, predicate);
    expect(arr.length).to.equal(4);
    expect(arr[0]).to.equal(5);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr2;
    let mapArr = map(arr2, predicate);
    expect(mapArr).to.be.undefined;
    arr2 = null;
    mapArr = map(arr2, predicate);
    expect(mapArr).to.be.undefined;
    arr2 = [];
    mapArr = map(arr2, predicate);
    expect(mapArr.length).to.equal(0);
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate2 = undefined;
    let mapArr = map(arr, predicate2);
    expect(mapArr.length).to.equal(0);
    predicate2 = null;
    mapArr = map(arr, predicate2);
    expect(mapArr.length).to.equal(0);
  });
});