import React from 'react';

/**
 * @bit
 * @name filterReactChildren
 * @description Looks through a collection of React children elements, filtering them according to the predicate passed.
 * @param {Array/Object} children - colleciton of >=1 react elements
 * @param {function} predicate - function returning true when provided with an entry as argument
 */

export default function filterReactChildren(children, predicate) {
  if (children) {
    const result = [];
    React.Children.forEach(children, (entry) => {
      if (predicate && predicate.call(this, entry)) {
        result.push(entry);
      }
    });
    return result;
  }

  return undefined;
}