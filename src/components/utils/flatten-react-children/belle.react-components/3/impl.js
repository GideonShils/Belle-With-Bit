import React from 'react';
import getArrayForReactChildren from 'bit/utils/get-array-for-react-children';
import isEmpty from 'bit/utils/is-empty';
import flatten from 'bit/utils/flatten';

/**
 * @bit
 * @name flattenReactChildren
 * @description Helper method for Belle components.
 */

export default function flattenReactChildren(children) {
  if (!isEmpty(children)) {
    if (Array.isArray(children)) {
      return flatten(children);
    }

    return getArrayForReactChildren(children);
  }

  return undefined;
}