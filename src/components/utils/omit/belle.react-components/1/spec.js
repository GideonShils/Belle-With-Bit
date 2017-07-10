import { expect } from 'chai';

import omit from './impl';

describe('omit method', () => {
  const obj = { test1: 123, test2: 'abc', test3: () => ({}), test4: undefined };

  it('should return new object with keys omitted', () => {
    const keys = ['test1', 'test2'];
    const newObj = omit(obj, keys);
    expect(newObj).to.not.have.property('test1');
    expect(newObj).to.not.have.property('test2');
    expect(newObj).to.have.property('test3');
    expect(newObj).to.have.property('test4');
  });

  it('should not break if object is undefined or null', () => {
    let obj2 = undefined;
    let newObj;
    const keys = ['test1', 'test2'];
    newObj = omit(obj2, keys);
    expect(newObj).to.be.undefined;
    obj2 = null;
    newObj = omit(obj2, keys);
    expect(newObj).to.be.undefined;
  });

  it('should not break if keys is undefined or null or has length 0', () => {
    let newObj;
    let keys;
    newObj = omit(obj, keys);
    expect(newObj).to.have.property('test1');
    expect(newObj).to.have.property('test2');
    expect(newObj).to.have.property('test3');
    expect(newObj).to.have.property('test4');
    keys = null;
    newObj = omit(obj, keys);
    expect(newObj).to.have.property('test1');
    expect(newObj).to.have.property('test2');
    expect(newObj).to.have.property('test3');
    expect(newObj).to.have.property('test4');
    keys = [];
    newObj = omit(obj, keys);
    expect(newObj).to.have.property('test1');
    expect(newObj).to.have.property('test2');
    expect(newObj).to.have.property('test3');
    expect(newObj).to.have.property('test4');
  });

  it('should not change original object', () => {
    const keys = ['test1', 'test2'];
    omit(obj, keys);
    expect(obj).to.have.property('test1');
    expect(obj).to.have.property('test2');
    expect(obj).to.have.property('test3');
    expect(obj).to.have.property('test4');
  });
});
