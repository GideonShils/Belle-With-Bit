import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Option = require('./impl').default;

import sinon from 'sinon';
import {expect} from 'chai';

mockDom('<html><body></body></html>');

describe('Option', () => {
  let shallowRenderer;

  beforeEach(() => {
    shallowRenderer = TestUtils.createRenderer();
  });

  it('should initialise _isDisplayedAsSelected during construction', () => {
    shallowRenderer.render(
      <Option value="rome">Rome</Option>,
      { isDisabled: false, }
    );
    const option = shallowRenderer.getRenderOutput();

    expect(option._isDisplayedAsSelected).to.be.undefined;
  });

  it('should show the select style in case _isDisplayedAsSelected is true', () => {
    shallowRenderer.render(
      <Option value="rome" _isDisplayedAsSelected>Rome</Option>,
      { isDisabled: false, }
    );
    const option = shallowRenderer.getRenderOutput();

    expect(option.props.style.padding).to.equal(0);
  });

  it('should show the hover style in case _isHovered is true', () => {
    shallowRenderer.render(
      <Option value="rome">Rome</Option>,
      {
        isDisabled: false,
        isHoveredValue: 'rome',
      }
    );
    const option = shallowRenderer.getRenderOutput();

    expect(option.props.style.background).to.equal('#F5F5F5');
  });

  it('should be able to provide custom properties', () => {
    shallowRenderer.render(
      <Option value="rome" data-custom="example">Rome</Option>,
      { isDisabled: false, }
    );
    const option = shallowRenderer.getRenderOutput();

    expect(option.props['data-custom']).to.equal('example');
  });
});