import { combineReducers } from 'redux';

const items = (state: Timeline['items'] = [], action: DrammitAction): Timeline['items'] => {
  switch (action.type) {
    case 'FETCH_USER_TIMELINE_SUCCESS':
    case 'FETCH_TIMELINE_SUCCESS':
      return [
        ...state,
        ...action.payload.drams.map(dram => dram.id),
      ];
    default:
      return state;
  }
};

const loading = (state: boolean = false, action: DrammitAction): boolean => {
  switch (action.type) {
    case 'FETCH_USER_TIMELINE_SUCCESS':
    case 'FETCH_TIMELINE_SUCCESS':
      return false;
    default:
      return state;
  }
};

const refreshing = (state: boolean = false, action: DrammitAction): boolean => {
  switch (action.type) {
    case 'FETCH_USER_TIMELINE_SUCCESS':
    case 'FETCH_TIMELINE_SUCCESS':
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
