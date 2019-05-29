import { envVar } from './env';
import { setJWT, getJWT } from './jwt';
import { info } from './log';

const API_ROOT = envVar('API_ROOT');

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
interface RequestBody {
  [key: string]: string | FileUpload | undefined;
}

export function request(method: RequestMethod = 'GET', url: string, data?: RequestBody) {
  const reqId = +new Date();
  const jwt = getJWT();
  const hasFile = Object.keys(data || {})
    .some(key => Boolean(
      data
      && data[key]
      && typeof data[key] !== 'string'
      && (data[key] as FileUpload).uri,
    ));

  const headers: HeadersInit_ = {
    Accept: 'application/json',
  };

  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  if (method === 'POST' && !hasFile) {
    headers['Content-Type'] = 'application/json';
  }

  if (method === 'POST' && hasFile) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  const params: RequestInit = {
    headers,
    method,
  };

  if (method === 'POST' && data && !hasFile) {
    params.body = JSON.stringify(data);
  }

  if (method === 'POST' && data && hasFile) {
    const formData = new FormData();

    Object.keys(data).forEach(key => formData.append(key, data[key]));

    params.body = formData;
  }

  info('req', reqId, url, params);

  return fetch(
    createUrl(url),
    params,
  )
    .then(handleApiError)
    .then(handleJWT)
    .then(response => response.json())
    .then((response: any) => {
      info('res', reqId, url, response);
      return response;
    });
}

export function get(url: string) {
  return request('GET', url);
}

export function post(url: string, data?: RequestBody) {
  return request('POST', url, data);
}
