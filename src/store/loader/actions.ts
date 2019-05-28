export const fetch = (table: string, key: string | number): FetchInformationAction => ({
  key,
  table,
  type: 'LOADER_FETCH',
});

export const fetchSuccess = (
  table: string,
  key: string | number,
  payload: any,
): FetchInformationSuccessAction => ({
  key,
  payload,
  table,
  type: 'LOADER_FETCH_SUCCESS',
});

export const fetchFailed = (
  table: string,
  key: string | number,
  error: Error,
): FetchInformationFailedAction => ({
  error,
  key,
  table,
  type: 'LOADER_FETCH_FAILED',
});
