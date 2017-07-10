import React from 'react';
import TestUtils from 'react-addons-test-utils';

const TextInput = require('./impl').default;
const injectStyle = require('bit/utils/inject-style');

import {expect} from 'chai';
import sinon from 'sinon';

mockDom('<html><body></body></html>');

describe('TextInput', () => {
  it('should come with default styles', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );
    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    expect(textareaNode.hasAttribute('style')).to.be.true;
    expect(textareaNode.getAttribute('style').indexOf('overflow: hidden') > -1).to.be.true;
  });

  it('should be able to adopt the style of the textInput', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput style={{ color: 'red' }} />
    );
    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    expect(textareaNode.hasAttribute('style')).to.be.true;
    expect(textareaNode.getAttribute('style').indexOf('color: red') > -1).to.be.true;
  });

  it('should calculate its height after initializing', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );

    textInput._triggerResize = sinon.spy();
    textInput.componentDidMount();

    expect(textInput._triggerResize).to.have.been.calledOnce;
  });

  it('should re-calculate its height after changing (default)', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );

    textInput._triggerResize = sinon.spy();

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some input text');

    expect(textInput._triggerResize).to.have.been.calledOnce;
  });

  it('should re-calculate its height after changing (with value & new lines not allowed)', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput value="some text" />
    );

    textInput._triggerResize = sinon.spy();

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some other text');

    expect(textInput._triggerResize).to.have.been.calledOnce;
  });

  it('should re-calculate its height after changing (new lines allowed)', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput value="some text" allowNewLine />
    );

    textInput._triggerResize = sinon.spy();

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some other text');

    expect(textInput._triggerResize).to.have.been.calledOnce;
  });

  it('should be able to bind onKeyDown', () => {
    let wasPressed = false;

    const textInput = TestUtils.renderIntoDocument(
      <TextInput onKeyDown={ () => { wasPressed = true; } } />
    );

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.keyDown(textareaNode, { key: '1' });

    expect(wasPressed).to.be.true;
  });

  it('should be able to bind onUpdate', () => {
    let wasChanged = false;

    const textInput = TestUtils.renderIntoDocument(
      <TextInput onUpdate={ () => { wasChanged = true; } } />
    );

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some text');

    expect(wasChanged).to.be.true;
  });

  it('should be able to provide a valueLink', () => {
    let wasCalled = false;

    const valueLink = {
      requestChange: () => {
        wasCalled = true;
      },

      value: 'some text',
    };

    const textInput = TestUtils.renderIntoDocument(
      <TextInput valueLink={ valueLink } />
    );

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some other text');

    expect(wasCalled).to.be.true;
  });

  it('should be able to provide a className', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput className="test-me" />
    );

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');
    expect(textareaNode.className.indexOf('test-me')).to.be.above(-1);
  });

  it('should remove the custom styles from the dom when the textInput unmounts', () => {
    injectStyle.removeStyle = sinon.spy();

    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );

    textInput.componentWillUnmount();

    expect(injectStyle.removeStyle).to.have.been.calledOnce;
  });
});