import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Separator = require('./impl').default;

import {expect} from 'chai';

mockDom('<html><body></body></html>');

describe('Separator', () => {
  it('should come with a set of default styles', () => {
    const separator = TestUtils.renderIntoDocument(
      <Separator>Europe</Separator>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(separator, 'div');
    expect(div.hasAttribute('style')).to.be.true;
    expect(div.getAttribute('style').indexOf('color: rgb(102, 102, 102)') > -1).to.be.true;
  });

  it('should be able to overwrite the default styles', () => {
    const separator = TestUtils.renderIntoDocument(
      <Separator style={{ color: '#F00' }}>Please select a city</Separator>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(separator, 'div');
    expect(div.hasAttribute('style')).to.be.true;
    expect(div.getAttribute('style').indexOf('color: rgb(255, 0, 0)') > -1).to.be.true;
  });

  it('should be able to provide custom properties', () => {
    const separator = TestUtils.renderIntoDocument(
      <Separator data-custom="example">Please select a city</Separator>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(separator, 'div');
    expect(div.getAttribute('data-custom')).to.equal('example');
  });
});