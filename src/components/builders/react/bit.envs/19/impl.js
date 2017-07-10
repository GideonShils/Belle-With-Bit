/**
 * # Babel-based transpiling environment for React components
 * Bit build enviroment for transpiling React components using Bit.
 * 
 * ## How to use?
 * 
 * Import the environment
 * ```bash
 *  bit import bit.envs/builders/react -cs
 * ```
 * 
 * ## What's inside
 * - Babel with JSX and [babel-preset-latest](https://babeljs.io/docs/plugins/preset-latest/).
 */
const babel = require('babel-core');

const plugins = [
  // enable import syntax
  require.resolve('babel-plugin-transform-class-properties'),
  [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    {
      useBuiltIns: true,
    },
  ],
  [
    require.resolve('babel-plugin-transform-react-jsx'),
    {
      useBuiltIns: true,
    },
  ],
  [
    require.resolve('babel-plugin-transform-regenerator'),
    {
      async: false,
    },
  ],
  [
    require.resolve('babel-plugin-transform-runtime')
  ]
];

const presets = [
  // Latest stable ECMAScript features
  require.resolve('babel-preset-latest'),
  // JSX, Flow
  require.resolve('babel-preset-react')
];

function compile(src) {
  const options = {
    presets,
    plugins,
    sourceMaps: true,
    ast: false,
    minified: false,
  };
  
  const { code, map } = babel.transform(src, options);
  return { code, mappings: map.mappings };
}

function build({ src }) {
  try {
    return Promise.resolve(compile(src));
  } catch (e) {
    return Promise.reject(e);
  }
}

function getTemplate() {
  return `/** @flow */
import React, { Component } from 'react';

/**
 * My new and awesome React component
 */
class MyComponent extends Component {

}

module.exports = MyComponent;
`;
}

module.exports = {
  compile,
  build,
  getTemplate
};
