'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @bit
 * @name spinnerStyle
 * @description Used for styling the Belle Spinner component
 */

var spinnerStyle = {
  style: {
    display: 'inline-block',
    fontSize: 15,
    textAlign: 'center'
  },

  characterStyle: {
    color: '#666',
    display: 'inline-block',
    WebkitAnimation: 'belle-spinner-pulse 2s infinite ease-in-out',
    OAnimation: 'belle-spinner-pulse 2s infinite ease-in-out',
    animation: 'belle-spinner-pulse 2s infinite ease-in-out'
  }
};

exports.default = spinnerStyle;

//# sourceMappingURL=impl.js.map