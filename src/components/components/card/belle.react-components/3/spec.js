import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Card = require('./impl').default;

import {expect} from 'chai';

mockDom('<html><body></body></html>');

describe('Card', () => {
  it('should come with default styles', () => {
    const card = TestUtils.renderIntoDocument(
      <Card />
    );
    const divNode = TestUtils.findRenderedDOMComponentWithTag(card, 'div');
    expect(divNode.hasAttribute('style')).to.be.true;

    expect(divNode.getAttribute('style').indexOf('background: rgb(255, 255, 255)') > -1).to.be.true;
  });

  it('should be able to adopt the style of the card', () => {
    const card = TestUtils.renderIntoDocument(
      <Card style={{ background: '#F00' }} />
    );
    const divNode = TestUtils.findRenderedDOMComponentWithTag(card, 'div');
    expect(divNode.getAttribute('style').indexOf('background: rgb(255, 0, 0)') > -1).to.be.true;
  });

  it('should render its children', () => {
    const card = TestUtils.renderIntoDocument(
      <Card><span>Hello there</span></Card>
    );
    const divNode = TestUtils.findRenderedDOMComponentWithTag(card, 'div');
    const spanNode = TestUtils.findRenderedDOMComponentWithTag(card, 'span');

    expect(divNode.tagName).to.equal('DIV');
    expect(divNode.childNodes[0].tagName).to.equal('SPAN');
    expect(spanNode.textContent).to.equal('Hello there');
  });
});