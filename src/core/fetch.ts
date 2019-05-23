const API_ROOT = 'http://localhost:3030';

function storeJWT(jwt: string) {
  console.log(jwt);
}

function createUrl(url: string) {
  return [API_ROOT, url].join('');
}

function handleJWT(response: Response) {
  if (response.headers.has('jwt')) storeJWT(response.headers.get('jwt') || '');

  return response;
}

async function handleApiError(response: Response) {
  if (!response.ok) throw new Error(await response.text());
  return response;
}

export function post(url: string, data: any) {
  return fetch(
    createUrl(url),
    {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  )
    .then(handleApiError)
    .then(handleJWT)
    .then(response => response.json());
}
