import React from 'react';
import TestUtils from 'react-addons-test-utils';

const ComboBox = require('./impl').default;
const Option = require('bit/components/option').default;

import {expect} from 'chai';

mockDom('<html><body></body></html>');

describe('ComboBox', () => {
  it('should initialise inputValue & filteredOptions during construction', () => {
    const combobox = TestUtils.renderIntoDocument(
      <ComboBox value="vie">
        <Option value="rome">Rome</Option>
        <Option value="vienna">Vienna</Option>
      </ComboBox>
    );

    expect(combobox.state.inputValue).to.equal('vie');
    expect(React.Children.count(combobox.filteredOptions)).to.equal(1);
  });

  it('should filter all values case no value, defaultValue or valueLink is defined', () => {
    const combobox = TestUtils.renderIntoDocument(
      <ComboBox>
        <Option value="rome">Rome</Option>
        <Option value="vienna">Vienna</Option>
      </ComboBox>
    );

    expect(combobox.state.inputValue).to.equal('');
    expect(React.Children.count(combobox.filteredOptions)).to.equal(2);
  });

  it('should be able to provide a onUpdate callback', () => {
    let wasCalled = false;

    const combobox = TestUtils.renderIntoDocument(
      <ComboBox onUpdate={ () => { wasCalled = true; }}>
        <Option value="rome">Rome</Option>
        <Option value="vienna" className="vienna-option">Vienna</Option>
      </ComboBox>
    );

    const viennaOptionNode = TestUtils.findRenderedDOMComponentWithClass(combobox, 'vienna-option');
    TestUtils.Simulate.click(viennaOptionNode);

    expect(wasCalled).to.be.true;
  });

  it('should provide a parameter with 2 fields: value and identifier in onUpdate callback', () => {
    let value;
    let identifier;
    let isMatch;
    let isSelect;

    const combobox = TestUtils.renderIntoDocument(
      <ComboBox
        onUpdate={ (obj) => {
          value = obj.value;
          identifier = obj.identifier;
          isMatch = obj.isMatchingOption;
          isSelect = obj.isOptionSelection;
        }}
      >
        <Option value="rome" identifier={1}>Rome</Option>
        <Option value="vienna" identifier={2} className="vienna-option">Vienna</Option>
      </ComboBox>
    );

    const viennaOptionNode = TestUtils.findRenderedDOMComponentWithClass(combobox, 'vienna-option');
    TestUtils.Simulate.click(viennaOptionNode);

    expect(value).to.equal('vienna');
    expect(identifier).to.equal(2);
    expect(isMatch).to.be.true;
    expect(isSelect).to.be.true;
  });

  it('should change the inputValue on selection', () => {
    const combobox = TestUtils.renderIntoDocument(
      <ComboBox defaultValue="vie">
        <Option value="vienna123">Rome</Option>
        <Option value="vienna" className="vienna-option">Vienna</Option>
      </ComboBox>
    );

    const viennaOptionNode = TestUtils.findRenderedDOMComponentWithClass(combobox, 'vienna-option');
    TestUtils.Simulate.click(viennaOptionNode);

    expect(combobox.state.inputValue).to.equal('vienna');
  });

  it('should be able to adopt the styles of a combobox', () => {
    const combobox = TestUtils.renderIntoDocument(
      <ComboBox style={{ cursor: 'cross' }}>
        <Option value="rome">Rome</Option>
        <Option value="vienna">Vienna</Option>
      </ComboBox>
    );

    const selectedAreaNode = TestUtils.scryRenderedDOMComponentsWithTag(combobox, 'input')[1];
    expect(selectedAreaNode.hasAttribute('style')).to.be.true;
    expect(selectedAreaNode.getAttribute('style').indexOf('cursor: cross') > -1).to.be.true;
  });

  describe('updating props', () => {
    let combobox;

    beforeEach(() => {
      combobox = TestUtils.renderIntoDocument(
        <ComboBox>
          <Option value="rome">Rome</Option>
          <Option value="vienna">Vienna</Option>
        </ComboBox>
      );
    });

    it('should update it\'s state in case value is provided', () => {
      const properties = {
        ...combobox.props,
        value: 'vienna',
      };
      combobox.componentWillReceiveProps(properties);

      expect(combobox.state.inputValue).to.equal('vienna');
    });

    it('should update it\'s state in case value is provided', () => {
      const valueLink = {
        requestChange: () => undefined,
        value: 'vienna',
      };

      const properties = {
        ...combobox.props,
        valueLink,
      };
      combobox.componentWillReceiveProps(properties);

      expect(combobox.state.inputValue).to.equal('vienna');
    });

    /*
     it('should not update it\'s state in case defaultValue is updated', () => {
     const properties = extend({}, combobox.props, { defaultValue: "vienna" });
     combobox.componentWillReceiveProps(properties);
     expect(combobox.state.inputValue).to.equal("rome");
     });
     */
  });

  function testKeyEvents(container) {
    it('should open the menu by pressing ArrowDown', () => {
      TestUtils.Simulate.keyDown(container.comboNode, { key: 'ArrowDown' });
      expect(container.combobox.state.isOpen).to.be.true;
    });

    it('should open the menu by pressing ArrowUp', () => {
      TestUtils.Simulate.keyDown(container.comboNode, { key: 'ArrowUp' });
      expect(container.combobox.state.isOpen).to.be.true;
    });

    it('should open the menu by pressing Space', () => {
      TestUtils.Simulate.keyDown(container.comboNode, { key: 'ArrowUp' });
      expect(container.combobox.state.isOpen).to.be.true;
    });

    describe('when the menu is open', () => {
      beforeEach(() => {
        container.combobox.setState({ isOpen: true });
      });

      it('should close menu when pressing Escape', () => {
        TestUtils.Simulate.keyDown(container.comboNode, { key: 'Escape' });
        expect(container.combobox.state.isOpen).to.be.false;
      });

      it('should focus on the next option when pressing ArrowDown', () => {
        container.combobox.setState({ focusedOptionIndex: 0 });
        expect(container.combobox.state.focusedOptionIndex).to.equal(0);
        TestUtils.Simulate.keyDown(container.comboNode, { key: 'ArrowDown' });
        expect(container.combobox.state.focusedOptionIndex).to.equal(1);
      });

      it('should focus on the first option when pressing ArrowDown and none was focused on', () => {
        container.combobox.setState({ focusedOptionIndex: undefined });
        TestUtils.Simulate.keyDown(container.comboNode, { key: 'ArrowDown' });
        expect(container.combobox.state.focusedOptionIndex).to.equal(0);
      });

      it('should focus on the previous option when pressing ArrowUp', () => {
        container.combobox.setState({ focusedOptionIndex: 2 });
        expect(container.combobox.state.focusedOptionIndex).to.equal(2);
        TestUtils.Simulate.keyDown(container.comboNode, { key: 'ArrowUp' });
        expect(container.combobox.state.focusedOptionIndex).to.equal(1);
      });

      it('should focus on the last option when pressing ArrowUp and none was focused on', () => {
        container.combobox.setState({ focusedOptionIndex: undefined });
        TestUtils.Simulate.keyDown(container.comboNode, { key: 'ArrowUp' });
        expect(container.combobox.state.focusedOptionIndex).to.equal(2);
      });

      it('should select the focused option when pressing Enter', () => {
        container.combobox.setState({ focusedOptionIndex: 2 });
        TestUtils.Simulate.keyDown(container.comboNode, { key: 'Enter' });
        expect(container.combobox.state.inputValue).to.equal('berlin');
      });

      it('should select the focused option when pressing Tab', () => {
        container.combobox.setState({ focusedOptionIndex: 2 });
        TestUtils.Simulate.keyDown(container.comboNode, { key: 'Tab' });
        expect(container.combobox.state.inputValue).to.equal('berlin');
      });
    });
  }

  describe('manage key events for simple list', () => {
    // in order to ensure no references are lost a container object is used
    const container = {};

    beforeEach(() => {
      container.combobox = TestUtils.renderIntoDocument(
        <ComboBox>
          <Option value="rome">Rome</Option>
          <Option value="vienna">Vienna</Option>
          <Option value="berlin">Berlin</Option>
        </ComboBox>
      );
      container.comboNode = TestUtils.scryRenderedDOMComponentsWithTag(container.combobox, 'input')[1];
    });

    testKeyEvents(container);
  });
});