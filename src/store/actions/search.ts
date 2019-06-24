export const receiveSearchResults = (payload: any): SearchReceive => ({
  payload,
  results: payload.results,
  type: 'SEARCH_RECEIVE',
});
