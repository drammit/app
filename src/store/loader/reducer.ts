const reducer = (state: StoreLoading = {}, action: DrammitAction): StoreLoading => {
  switch (action.type) {
    case 'LOADER_FETCH':
      return {
        ...state,
        [action.table]: [...(state[action.table] || []), action.key],
      };
    case 'LOADER_FETCH_FAILED':
    case 'LOADER_FETCH_SUCCESS':
      return {
        ...state,
        [action.table]: [...(state[action.table] || [])].filter(value => value !== action.key),
      };
    default:
      return state;
  }
};

export default reducer;
