import React from 'react';

/**
 * @bit
 * @name getArrayForReactChildren
 * @description Looks through a collection of React children elements, filtering them according to the predicate passed.
 * @param {Array/Object} children - collection of >=1 react elements
 */

export default function getArrayForReactChildren(children) {
  if (children) {
    const result = [];
    React.Children.forEach(children, (entry) => {
      result.push(entry);
    });
    return result;
  }

  return undefined;
}