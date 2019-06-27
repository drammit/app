import React from 'react';

import Message from '../components/Message/Message';

export const paramFromInstance = (instance: any, param: string, defaultValue?: any) => {
  return (instance && !(instance instanceof Error) && (instance as any)[param])
    ? instance[param]
    : defaultValue;
};

export const errorComponent = (possible: any[]) => {
  if (possible.some(p => p instanceof Error)) {
    const message = possible.find(p => p instanceof Error).message;

    return <Message error>{`Something went wrong:\n${message}`}</Message>;
  }

  return null;
};
