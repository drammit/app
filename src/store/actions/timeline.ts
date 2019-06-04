export const fetchTimeline = (from?: Date): FetchTimelineAction => ({
  from,
  type: 'FETCH_TIMELINE',
});

export const refreshTimeline = (from?: Date): FetchTimelineRefreshAction => ({
  from,
  type: 'FETCH_TIMELINE_REFRESH',
});

export const receiveTimeline = (payload: TimelinePayload): FetchTimelineSuccessAction => ({
  payload,
  type: 'FETCH_TIMELINE_SUCCESS',
});
