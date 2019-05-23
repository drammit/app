import { setItem, getItem } from './storage';

const API_ROOT = 'http://localhost:3030';

function createUrl(url: string) {
  return [API_ROOT, url].join('');
}

function handleJWT(response: Response) {
  if (response.headers.has('jwt')) setItem('jwt', response.headers.get('jwt') || '');
  return response;
}

async function handleApiError(response: Response) {
  if (!response.ok) throw new Error(await response.text());
  return response;
}

export function post(url: string, data: any) {
  const jwt = getItem('jwt');

  const headers: HeadersInit_ = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  return fetch(
    createUrl(url),
    {
      body: JSON.stringify(data),
      headers,
      method: 'POST',
    },
  )
    .then(handleApiError)
    .then(handleJWT)
    .then(response => response.json());
}
