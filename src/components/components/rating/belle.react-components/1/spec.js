import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Rating = require('./impl').default;

import {expect} from 'chai';

mockDom('<html><body></body></html>');

describe('Rating', () => {
  it('should be able to provide a valueLink', () => {
    const valueLink = {
      requestChange: () => undefined,
      value: 1,
    };
    const rating = TestUtils.renderIntoDocument(<Rating valueLink={ valueLink } />);

    expect(rating.state.value).to.equal(1);
  });

  it('should be able to provide a value', () => {
    const rating = TestUtils.renderIntoDocument(<Rating value={ 4 } />);
    expect(rating.state.value).to.equal(4);
  });

  it('should be able to provide a defaultValue', () => {
    const rating = TestUtils.renderIntoDocument(<Rating defaultValue={ 2 } />);
    expect(rating.state.value).to.equal(2);
  });

  it('should to not provide any kind of value', () => {
    const rating = TestUtils.renderIntoDocument(<Rating />);
    expect(rating.state.value).to.be.undefined;
  });

  it('should not be able to change value via the user interface if a value property is defined', () => {
    const rating = TestUtils.renderIntoDocument(<Rating value={ 4 } />);
    rating.setState({ focusedValue: 3 });
    rating._triggerComponentUpdate();
    expect(rating.state.value).to.equal(4);
  });

  describe('update the internal value', () => {
    let rating;

    beforeEach(() => {
      rating = TestUtils.renderIntoDocument(
        <Rating />
      );
    });

    it('should be possible by updating the value property', () => {
      rating.componentWillReceiveProps({ value: 2 });
      expect(rating.state.value).to.equal(2);
    });

    it('should be possible by updating the valueLink property', () => {
      const valueLink = {
        requestChange: () => undefined,
        value: 1,
      };

      rating.componentWillReceiveProps({ valueLink });
      expect(rating.state.value).to.equal(1);
    });

    it('should not be possible by updating the defaultValue property', () => {
      rating.componentWillReceiveProps({ defaultValue: 3 });
      expect(rating.state.value).to.be.undefined;
    });
  });
});