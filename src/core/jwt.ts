import { decode } from 'base-64';

import { setItem, getItem } from './storage';

export function setJWT(jwt?: string | null) {
  setItem('jwt', jwt || '');
}

export function getJWT() {
  return getItem('jwt');
}

function decodePayload(jwt: string) {
  try {
    return JSON.parse(decode(jwt.split('.')[1]));
  } catch (e) {
    throw new Error('Invalid JWT');
  }
}

export function isJWTExpired() {
  const jwt = getItem('jwt');
  const payload = decodePayload(jwt);

  return (Date.now() / 1000) > payload.exp;
}
