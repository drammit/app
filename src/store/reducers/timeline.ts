import { combineReducers } from 'redux';

const items = (
  state: TimelineShape['items'] = [],
  action: DrammitAction,
): TimelineShape['items'] => {
  switch (action.type) {
    case 'FETCH_TIMELINE_REDO':
    case 'LOGOUT':
      return [];
    case 'FETCH_TIMELINE_SUCCESS':
    case 'FETCH_TIMELINE_REFRESH_SUCCESS':
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

const loading = (state: boolean = true, action: DrammitAction): boolean => {
  switch (action.type) {
    case 'FETCH_TIMELINE':
      return true;
    case 'FETCH_TIMELINE_SUCCESS':
    case 'FETCH_TIMELINE_REFRESH_SUCCESS':
    case 'LOGOUT':
      return false;
    default:
      return state;
  }
};

const end = (state: boolean = false, action: DrammitAction): boolean => {
  switch (action.type) {
    case 'FETCH_TIMELINE_SUCCESS':
      return action.payload.drams.length === 0;
    default:
      return state;
  }
};

const refreshing = (state: boolean = false, action: DrammitAction): boolean => {
  switch (action.type) {
    case 'FETCH_TIMELINE_REFRESH':
      return true;
    case 'FETCH_TIMELINE_SUCCESS':
    case 'FETCH_TIMELINE_REFRESH_SUCCESS':
    case 'LOGOUT':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  end,
  items,
  loading,
  refreshing,
});
