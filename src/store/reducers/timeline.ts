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
    case 'DRAM_ADD':
      return [action.dram.id, ...state];
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

const timeline = combineReducers({
  end,
  items,
  loading,
  refreshing,
});

export const singleReducer = (state: TimelineShape | undefined, action: DrammitAction) => {
  if (typeof (action as any).UserId !== 'undefined') return state;

  return timeline(state, action);
};

export default timeline;
