import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Placeholder = require('bit/components/placeholder').default;

import {expect} from 'chai';

mockDom('<html><body></body></html>');

describe('Placeholder', () => {
  it('should come with a set of default styles', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.hasAttribute('style')).to.be.true;
    expect(div.getAttribute('style').indexOf('color: rgb(102, 102, 102)') > -1).to.be.true;
  });

  it('should be able to overwrite the default styles', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder style={{ color: '#F00' }}>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.hasAttribute('style')).to.be.true;
    expect(div.getAttribute('style').indexOf('color: rgb(255, 0, 0)') > -1).to.be.true;
  });

  it('should be able to provide custom properties', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder data-custom="example">Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.getAttribute('data-custom')).to.equal('example');
  });
});