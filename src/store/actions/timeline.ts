export const fetchTimeline = (from?: number): FetchTimelineAction => ({
  from,
  type: 'FETCH_TIMELINE',
});

export const refreshTimeline = (until?: number): FetchTimelineRefreshAction => ({
  type: 'FETCH_TIMELINE_REFRESH',
  until,
});

export const receiveTimeline = (payload: TimelinePayload): FetchTimelineSuccessAction => ({
  payload,
  type: 'FETCH_TIMELINE_SUCCESS',
});
