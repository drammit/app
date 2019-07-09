export const isUploadingByType = (
  type: UploadItem['type'],
  id: number,
) => (state: StoreShape): boolean => state.uploading
  .findIndex(i => i.id === id && i.type === type) > -1;
