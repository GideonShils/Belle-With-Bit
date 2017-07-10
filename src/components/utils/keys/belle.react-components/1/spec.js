import { expect } from 'chai';

import keys from './impl';

describe('keys method', () => {
  it('should return all keys in an object', () => {
    const key = keys({ a: 1, b: 2, c: 3 });
    expect(key.length).to.equal(3);
    expect(key.indexOf('a')).to.be.above(-1);
    expect(key.indexOf('toString')).to.be.below(0);
  });

  it('should should not break for undefined/ null objects', () => {
    expect(keys(undefined).length).to.equal(0);
    expect(keys(null).length).to.equal(0);
    expect(keys({}).length).to.equal(0);
  });
});