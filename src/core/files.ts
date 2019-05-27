export function fileFromURI(uri: string): FileUpload {
  return {
    name: uri.split('/').pop() || uri,
    type: `image/${uri.split('.').pop() || 'file'}`,
    uri,
  };
}
