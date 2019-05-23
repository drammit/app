import { AsyncStorage } from 'react-native';

const storeName = '@Drammit';
const localStorage: { [key: string]: string } = {};

function makeKey(key: string) {
  return [storeName, key].join(':');
}

export function setItemAsync(key: string, data: string, prefix: boolean = true) {
  return AsyncStorage.setItem(prefix ? makeKey(key) : key, data);
}

export function getItemAsync(key: string, prefix: boolean = true) {
  return AsyncStorage.getItem(prefix ? makeKey(key) : key);
}

export function getItemsAsync(keys: string[], prefix: boolean = true) {
  return AsyncStorage.multiGet(prefix ? keys.map(makeKey) : keys)
    .then((values: [string, string][]) => {
      values.forEach(([key, value]) => {
        setItem(key.replace(storeName, ''), value, true);
      });

      return values;
    });
}

export function setItem(key: string, data: any, skipAsync: boolean = false) {
  const stringifiedData = JSON.stringify(data);

  if (!skipAsync) setItemAsync(key, stringifiedData);
  localStorage[makeKey(key)] = stringifiedData;
}

export function getItem(key: string) {
  try {
    return JSON.parse(localStorage[makeKey(key)]);
  } catch (e) {
    return undefined;
  }
}
