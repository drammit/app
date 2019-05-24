import { setJWT, getJWT } from './jwt';

const API_ROOT = 'http://localhost:3030';

function createUrl(url: string) {
  return [API_ROOT, url].join('');
}

function handleJWT(response: Response) {
  if (response.headers.has('jwt')) setJWT(response.headers.get('jwt'));
  return response;
}

async function handleApiError(response: Response) {
  if (!response.ok) throw new Error(await response.text());
  return response;
}

export function post(url: string, data?: any) {
  const jwt = getJWT();

  const headers: HeadersInit_ = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  const params = {
    body: data ? JSON.stringify(data) : undefined,
    headers,
    method: 'POST',
  };

  console.log(url, params);

  return fetch(
    createUrl(url),
    params,
  )
    .then(handleApiError)
    .then(handleJWT)
    .then(response => response.json());
}
