export function fileFromURI(uri?: string): FileUpload | undefined {
  if (!uri) return undefined;

  return {
    name: uri.split('/').pop() || uri,
    type: `image/${uri.split('.').pop() || 'file'}`,
    uri,
  };
}
