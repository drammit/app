export const fetchTimeline = (from?: number): FetchTimelineAction => ({
  from,
  type: 'FETCH_TIMELINE',
});

export const refreshTimeline = (from?: number): FetchTimelineRefreshAction => ({
  from,
  type: 'FETCH_TIMELINE_REFRESH',
});

export const receiveTimeline = (payload: TimelinePayload): FetchTimelineSuccessAction => ({
  payload,
  type: 'FETCH_TIMELINE_SUCCESS',
});
