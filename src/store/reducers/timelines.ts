import timeline from './timeline';

export default (state: StoreTimelines = {}, action: DrammitAction): StoreTimelines => {
  switch (action.type) {
    case 'FETCH_USER_TIMELINE_SUCCESS':
      return {
        ...state,
        [action.UserId]: timeline(state[action.UserId], action),
      };
    default:
      return state;
  }
};
