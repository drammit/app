import { PixelRatio } from 'react-native';

import { envVar } from './env';

const STATIC_ROOT = envVar('STATIC_ROOT');

function createExtension(size: number): string {
  if (size > 360) {
    return '_450.jpg';
  }

  if (size > 270) {
    return '_360.jpg';
  }

  if (size > 180) {
    return '_270.jpg';
  }

  if (size > 90) {
    return '_180.jpg';
  }

  return '_90.jpg';
}

export default function createAvatarUrl(uri?: string, size: number = 90) {
  return [
    STATIC_ROOT,
    '/avatars/',
    uri,
    createExtension(size * PixelRatio.get()),
  ].join('');
}
