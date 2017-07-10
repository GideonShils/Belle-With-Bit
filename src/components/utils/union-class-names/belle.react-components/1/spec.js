import { expect } from 'chai';

import unionClassNames from './impl';

describe('unionClassNames method', () => {
  it('should add a class to existing ones', () => {
    expect(unionClassNames('first button', 'last')).to.equal('first button last');
  });

  it('should not add a class in case it is a duplicate', () => {
    expect(unionClassNames('first button', 'button')).to.equal('first button');
  });

  it('should ignore undefined values', () => {
    expect(unionClassNames(undefined, undefined)).to.equal('');
    expect(unionClassNames(undefined, 'button')).to.equal('button');
    expect(unionClassNames('first', undefined)).to.equal('first');
  });

  it('should work with names which contain the new class', () => {
    expect(unionClassNames('first button-first', 'button')).to.equal('first button-first button');
  });
});