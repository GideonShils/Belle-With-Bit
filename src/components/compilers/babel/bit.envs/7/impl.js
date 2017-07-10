/**
 * # Babel-based transpiling environment.
 * Bit build enviroment for transpiling using Bit.
 * 
 * ## How to use?
 * 
 * Import the environment
 * ```bash
 *  bit import bit.envs/compilers/babel -cs
 * ```
 * 
 * ## What's inside
 * - Babel with [babel-preset-latest](https://babeljs.io/docs/plugins/preset-latest/).
 * @bit
 */
const babel = require('babel-core');

function compile(src) {
  const options = {
    presets: [require.resolve('babel-preset-latest')],
    sourceMaps: true,
    ast: false,
    minified: false,
    plugins: [require.resolve("babel-plugin-transform-object-rest-spread")]
  };

  try {
    const { code, map } = babel.transform(src, options);
    return { code, mappings: map.mappings };
  } catch (e) {
    throw e;
  }
}

module.exports = {
  compile,
};
