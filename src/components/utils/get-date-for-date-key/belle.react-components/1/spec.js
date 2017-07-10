import { expect } from 'chai';

import getDateForDateKey from './impl';

describe('helpers getDateKey method', () => {
  it('should parse a datekey (iso string) properly to a date', () => {
    expect(getDateForDateKey('1912-10-1').getTime()).to.equal(new Date(1912, 9, 1).getTime());
    expect(getDateForDateKey('2018-1-12').getTime()).to.equal(new Date(2018, 0, 12).getTime());
    expect(getDateForDateKey('2112-12-12').getTime()).to.equal(new Date(2112, 11, 12).getTime());
  });
});