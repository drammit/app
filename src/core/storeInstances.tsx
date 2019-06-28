import React from 'react';

import Message from '../components/Message/Message';

export function paramFromInstance<T>(
  instance: StoreResolvable<T>,
  param: string,
  defaultValue?: any,
) {
  if (
    instance
    && instance.value
    && instance.isResolved
    && !instance.error
    && typeof (instance.value as any)[param] !== 'undefined'
  ) {
    return (instance.value as any)[param];
  }

  return defaultValue;
}

export const errorComponent = (possible: StoreResolvable<any>[]) => {
  if (possible.some(p => p.error)) {
    const item = possible.find(p => p.error);
    if (!item) return null;
    // @ts-ignore
    return <Message error>{`Something went wrong:\n${item.error.message}`}</Message>;
  }

  return null;
};
