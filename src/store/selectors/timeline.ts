export const getTimeline = (state: StoreShape): StoreTimeline => state.timeline;
export const isTimelineEnd = (state: StoreShape): boolean => getTimeline(state).end;
export const isTimelineLoading = (state: StoreShape): boolean => getTimeline(state).loading;
export const isTimelineRefreshing = (state: StoreShape): boolean => getTimeline(state).refreshing;
export const getTimelineItems = (state: StoreShape): StoreTimeline['items'] => getTimeline(state)
  .items
  .sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });
