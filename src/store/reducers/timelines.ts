import timeline from './timeline';

export default (state: StoreTimelines = {}, action: DrammitAction): StoreTimelines => {
  const UserId = (action as any).UserId;

  if (typeof UserId === 'undefined') {
    return state;
  }

  return {
    ...state,
    [UserId]: timeline(state[UserId], action),
  };
};
