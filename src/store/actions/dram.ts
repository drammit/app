export const slainteDram = (DramId: number, UserId: number): DramSlainteAction => ({
  DramId,
  UserId,
  type: 'DRAM_SLAINTE',
});
