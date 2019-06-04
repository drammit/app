export const getTimeline = (state: StoreShape): StoreTimeline => state.timeline;
export const isTimelineLoading = (state: StoreShape): boolean => getTimeline(state).loading;
export const isTimelineRefreshing = (state: StoreShape): boolean => getTimeline(state).refreshing;
export const getTimelineItems = (state: StoreShape): StoreTimeline['items'] => state.timeline.items;
