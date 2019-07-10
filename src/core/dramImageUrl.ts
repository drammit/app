import { envVar } from './env';

const STATIC_ROOT = envVar('STATIC_ROOT');

export default function createDramImageUrl(uri?: string) {
  if (!uri) return '';

  return [
    STATIC_ROOT,
    '/drams/',
    uri,
    '_800.jpg',
  ].join('');
}
