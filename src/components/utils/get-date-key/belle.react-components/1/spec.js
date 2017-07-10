import { expect } from 'chai';

import getDateKey from './impl';

describe('getDateKey method', () => {
  it('should return an iso string', () => {
    expect(getDateKey(2012, 10, 1)).to.equal('2012-10-1');
    expect(getDateKey(2200, 1, 31)).to.equal('2200-1-31');
    expect(getDateKey(2016, 12, 12)).to.equal('2016-12-12');
  });
});