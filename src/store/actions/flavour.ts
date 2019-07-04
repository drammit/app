export const fetchFlavours = (): FetchFlavoursAction => ({
  type: 'FETCH_FLAVOURS',
});

export const fetchFlavoursSuccess = (
  payload: { flavours: FlavourShape[] },
): FetchFlavoursSuccessAction => ({
  payload,
  type: 'FETCH_FLAVOURS_SUCCESS',
});

export const fetchFlavoursFailed = (): FetchFlavoursFailedAction => ({
  type: 'FETCH_FLAVOURS_FAILED',
});
