import { expect } from 'chai';

import mapObject from './impl';

describe('mapObject method', () => {
  const obj = { five: 5, ten: 10, fifty: 50, hundred: 100 };
  const predicate = (value) => value / 5;

  const objIdTest = { 50: 5, 100: 10, 500: 50, 1000: 100 };
  const predicateIdTest = (value, id) => id / value;

  it('should map to an output array as per predicate', () => {
    const resultObj = mapObject(obj, predicate);
    expect(resultObj[0]).to.equal(1);
    expect(resultObj[1]).to.equal(2);
    expect(resultObj[2]).to.equal(10);
    expect(resultObj[3]).to.equal(20);
  });

  it('should pass second parameter value to predicate', () => {
    const resultObj = mapObject(objIdTest, predicateIdTest);
    expect(resultObj[0]).to.equal(10);
    expect(resultObj[1]).to.equal(10);
    expect(resultObj[2]).to.equal(10);
    expect(resultObj[3]).to.equal(10);
  });
});