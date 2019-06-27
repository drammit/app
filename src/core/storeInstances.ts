export const paramFromInstance = (instance: any, param: string, defaultValue?: any) => {
  return (instance && !(instance instanceof Error) && (instance as any)[param])
    ? instance[param]
    : defaultValue;
};
