import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Spinner = require('./impl').default;

import {expect} from 'chai';

mockDom('<html><body></body></html>');

describe('Spinner', () => {
  it('should come with default styles', () => {
    const spinner = TestUtils.renderIntoDocument(
      <Spinner />
    );
    const spanNode = TestUtils.scryRenderedDOMComponentsWithTag(spinner, 'span')[0];
    expect(spanNode.hasAttribute('style')).to.be.true;
    expect(spanNode.getAttribute('style')).to.contain('font-size: 15px');
  });

  it('should be able to adopt the style of the spinner wrapper', () => {
    const spinner = TestUtils.renderIntoDocument(
      <Spinner style={{ width: 200 }} />
    );
    const spanNode = TestUtils.scryRenderedDOMComponentsWithTag(spinner, 'span')[0];
    expect(spanNode.getAttribute('style')).to.contain('width: 200px');
  });

  it('should be able to adopt the character style of the spinner', () => {
    const spinner = TestUtils.renderIntoDocument(
      <Spinner characterStyle={{ color: 'red' }} />
    );
    const spanNode = TestUtils.scryRenderedDOMComponentsWithTag(spinner, 'span')[1];
    expect(spanNode.getAttribute('style')).to.contain('color: red');
  });
});