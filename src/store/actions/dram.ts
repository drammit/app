export const slainteDram = (DramId: number, UserId: number): DramSlainteAction => ({
  DramId,
  UserId,
  type: 'DRAM_SLAINTE',
});

export const addComment = (DramId: number, UserId: number, comment: string): DramCommentAction => ({
  DramId,
  UserId,
  comment,
  id: +new Date(),
  type: 'DRAM_COMMENT',
});

export const replaceComment = (
  DramId: number,
  id: number,
  comment: DramCommentShape,
): DramCommentReplaceAction => ({
  DramId,
  comment,
  id,
  type: 'DRAM_COMMENT_REPLACE',
});

export const addDram = (dram: DramShape): DramAddAction => ({
  dram,
  type: 'DRAM_ADD',
});

export const uploadDramImage = (id: number, uri: string): UploadDramPhoto => ({
  id,
  type: 'UPLOAD_DRAM_PHOTO',
  uri,
});

export const uploadDramImageSuccess = (id: number, image: string): UploadDramPhotoSuccess => ({
  id,
  image,
  type: 'UPLOAD_DRAM_PHOTO_SUCCESS',
});

export const uploadDramImageFailed = (id: number): UploadDramPhotoFailed => ({
  id,
  type: 'UPLOAD_DRAM_PHOTO_FAILED',
});

export const removeDram = (id: number): DramRemoveAction => ({
  id,
  type: 'DRAM_REMOVE',
});
