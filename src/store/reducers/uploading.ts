function itemTypeFromAction(action: DrammitAction) {
  switch (action.type) {
    case 'UPLOAD_DRAM_PHOTO':
    case 'UPLOAD_DRAM_PHOTO_SUCCESS':
    case 'UPLOAD_DRAM_PHOTO_FAILED':
      return 'dram';
    default:
      return 'other';
  }
}

const uploading = (state: UploadItem[] = [], action: DrammitAction): UploadItem[] => {
  switch (action.type) {
    case 'UPLOAD_DRAM_PHOTO':
      return [
        ...state,
        {
          id: action.id,
          type: itemTypeFromAction(action),
        },
      ];
    case 'UPLOAD_DRAM_PHOTO_SUCCESS':
    case 'UPLOAD_DRAM_PHOTO_FAILED':
      return state.filter(u => u.id !== action.id && u.type !== itemTypeFromAction(action));
    default:
      return state;
  }
};

export default uploading;
