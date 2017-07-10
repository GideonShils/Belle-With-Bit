import { expect } from 'chai';

import filter from './impl';

describe('filter method', () => {
  const arr = [123, 'abc', () => undefined, undefined];
  const predicate = (object) => object !== 123;

  it('should filter out objects from iterable as per predicate', () => {
    const filteredArr = filter(arr, predicate);
    expect(filteredArr.length).to.equal(3);
    expect(filteredArr.indexOf(123)).to.be.below(0);
  });

  it('should not alter original array', () => {
    filter(arr, predicate);
    expect(arr.length).to.equal(4);
    expect(arr.indexOf(123)).to.equal(0);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr2;
    let filteredArr = filter(arr2, predicate);
    expect(filteredArr).to.be.undefined;
    arr2 = null;
    filteredArr = filter(arr2, predicate);
    expect(filteredArr).to.be.undefined;
    arr2 = [];
    filteredArr = filter(arr2, predicate);
    expect(filteredArr.length).to.equal(0);
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate2 = undefined;
    let filteredArr = filter(arr, predicate2);
    expect(filteredArr.length).to.equal(0);
    predicate2 = null;
    filteredArr = filter(arr, predicate2);
    expect(filteredArr.length).to.equal(0);
  });
});