export const getTimeline = (state: StoreShape): TimelineShape => state.timeline;
export const isTimelineEnd = (timeline: TimelineShape): boolean => timeline.end;
export const isTimelineLoading = (timeline: TimelineShape): boolean => timeline.loading;
export const isTimelineRefreshing = (timeline: TimelineShape): boolean => timeline.refreshing;
export const getTimelineItems = (timeline: TimelineShape): TimelineShape['items'] => timeline
  .items
  .sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });
