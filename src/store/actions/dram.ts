export const slainteDram = (DramId: number, UserId: number): DramSlainteAction => ({
  DramId,
  UserId,
  type: 'DRAM_SLAINTE',
});

export const addComment = (DramId: number, UserId: number, comment: string): DramCommentAction => ({
  DramId,
  UserId,
  comment,
  type: 'DRAM_COMMENT',
});
