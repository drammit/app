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

type RequestMethod = 'GET' | 'POST';

export function request(method: RequestMethod = 'GET', url: string, data?: any) {
  const jwt = getJWT();

  const headers: HeadersInit_ = {
    Accept: 'application/json',
  };

  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  if (method === 'POST') {
    headers['Content-Type'] = 'application/json';
  }

  const params: RequestInit = {
    headers,
    method,
  };

  if (method === 'POST' && data) {
    params.body = JSON.stringify(data);
  }

  console.info(url, params);

  return fetch(
    createUrl(url),
    params,
  )
    .then(handleApiError)
    .then(handleJWT)
    .then(response => response.json());
}

export function get(url: string) {
  return request('GET', url);
}

export function post(url: string, data?: any) {
  return request('POST', url, data);
}
