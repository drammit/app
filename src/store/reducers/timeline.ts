import { combineReducers } from 'redux';

const items = (
  state: StoreTimeline['items'] = [],
  action: DrammitAction,
): StoreTimeline['items'] => {
  switch (action.type) {
    case 'LOGOUT':
      return [];
    case 'FETCH_USER_TIMELINE_SUCCESS':
    case 'FETCH_TIMELINE_SUCCESS':
      return [
        ...state,
        ...action.payload.drams
          .map(dram => dram.id)
          .filter(id => state.indexOf(id) === -1),
      ];
    default:
      return state;
  }
};

const loading = (state: boolean = false, action: DrammitAction): boolean => {
  switch (action.type) {
    case 'FETCH_TIMELINE':
      return true;
    case 'FETCH_USER_TIMELINE_SUCCESS':
    case 'FETCH_TIMELINE_SUCCESS':
    case 'LOGOUT':
      return false;
    default:
      return state;
  }
};

const refreshing = (state: boolean = false, action: DrammitAction): boolean => {
  switch (action.type) {
    case 'FETCH_TIMELINE_REFRESH':
      return true;
    case 'FETCH_USER_TIMELINE_SUCCESS':
    case 'FETCH_TIMELINE_SUCCESS':
    case 'LOGOUT':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  items,
  loading,
  refreshing,
});
