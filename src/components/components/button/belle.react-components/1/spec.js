import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

const Button = require('./impl').default;
const injectStyle = require('bit/utils/inject-style');

import sinon from 'sinon';
import {expect} from 'chai';

mockDom('<html><body></body></html>');

describe('Button', () => {
  describe('without any properties', () => {
    let button;
    let buttonNode;

    beforeEach(() => {
      injectStyle.injectStyles = sinon.spy();
      button = TestUtils.renderIntoDocument(
        <Button>Follow</Button>
      );
      buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    });

    it('should come with default styles', () => {
      expect(buttonNode.hasAttribute('style')).to.be.true;
    });

    it('should set the type to button by default', () => {
      expect(buttonNode.type).to.equal('button');
    });

    it('should inject styles for active & foucs', () => {
      expect(injectStyle.injectStyles).to.have.been.CalledOnce;

      const styles = injectStyle.injectStyles.args[0][0];
      expect(styles[0].pseudoClass).to.equal('active');
      expect(styles[2].pseudoClass).to.equal('focus');
    });
  });

  it('should be able to bind onClick', () => {
    let wasClicked = false;

    // Render a button with an onClick handler
    const button = TestUtils.renderIntoDocument(
      <Button onClick={ () => { wasClicked = true; }}>Follow</Button>
    );

    // Simulate a click
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));

    expect(wasClicked).to.be.true;
  });

  it('should be able to provide a className', () => {
    const button = TestUtils.renderIntoDocument(
      <Button className="test-me">Follow</Button>
    );

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.className).to.contain('test-me');
  });

  it('should be able to adopt the style of the button', () => {
    const button = TestUtils.renderIntoDocument(
      <Button style={{ color: '#F00' }}>Follow</Button>
    );

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.getAttribute('style').indexOf('color: rgb(255, 0, 0)') > -1).to.be.true;
  });

  it('should be able to use a primary button', () => {
    const defaultButton = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    const primaryButton = TestUtils.renderIntoDocument(
      <Button primary>Follow</Button>
    );

    const defaultButtonNode = TestUtils.findRenderedDOMComponentWithTag(defaultButton, 'button');
    const prmaryButtonNode = TestUtils.findRenderedDOMComponentWithTag(primaryButton, 'button');

    expect(prmaryButtonNode.getAttribute('style')).not.to.equal(defaultButtonNode.getAttribute('style'));
  });

  it('should be able to change the type to submit or reset', () => {
    const submitButton = TestUtils.renderIntoDocument(
      <Button type="submit">Submit</Button>
    );
    const submitButtonNode = TestUtils.findRenderedDOMComponentWithTag(submitButton, 'button');
    expect(submitButtonNode.type).to.equal('submit');

    const resetButton = TestUtils.renderIntoDocument(
      <Button type="reset">Submit</Button>
    );
    const resetButtonNode = TestUtils.findRenderedDOMComponentWithTag(resetButton, 'button');
    expect(resetButtonNode.type).to.equal('reset');
  });

  it('should be able to adopt the pseudoClass styles of the button', () => {
    injectStyle.injectStyles = sinon.spy();

    const bodyWithButton = TestUtils.renderIntoDocument(
      <Button
        hoverStyle={{ color: 'red' }}
        focusStyle={{ color: 'brown' }}
        activeStyle={{ color: 'green' }}
        preventFocusStyleForTouchAndClick={ false }
      >
        Follow
      </Button>
    );

    TestUtils.findRenderedDOMComponentWithTag(bodyWithButton, 'button');

    expect(injectStyle.injectStyles).to.have.been.calledOnce;

    const styles = injectStyle.injectStyles.args[0][0];

    expect(styles[0].pseudoClass).to.equal('active');
    expect(styles[0].style.color).to.equal('green');
    expect(styles[2].pseudoClass).to.equal('focus');
    expect(styles[2].style.color).to.equal('brown');
  });

  it('should remove the custom styles from the dom when the button unmounts', () => {
    injectStyle.removeStyle = sinon.spy();
    expect(injectStyle.removeStyle).to.not.have.been.called;

    const button = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    button.componentWillUnmount();

    expect(injectStyle.removeStyle).to.have.been.calledOnce;
  });

  it('should set isHovered state to true on mouseEnter and false on mouseLeave', () => {
    const button = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    expect(button.state.isHovered).to.be.false;
    TestUtils.Simulate.mouseEnter(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));
    expect(button.state.isHovered).to.be.true;
    TestUtils.Simulate.mouseLeave(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));
    expect(button.state.isHovered).to.be.false;
  });
});