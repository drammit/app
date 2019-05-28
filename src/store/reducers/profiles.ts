const profiles = (state: StoreProfiles = {}, action: DrammitAction) => {
  switch (action.type) {
    case 'LOADER_FETCH_FAILED':
      return action.table === 'profiles' ? {
        ...state,
        [action.key]: action.error,
      } : state;
    case 'LOADER_FETCH_SUCCESS':
      return action.table === 'profiles' ? {
        ...state,
        [action.key]: action.payload,
      } : state;
    default:
      return state;
  }
};

export default profiles;
