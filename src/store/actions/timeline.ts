export const receiveTimeline = (payload: TimelinePayload): FetchTimelineSuccessAction => ({
  payload,
  type: 'FETCH_TIMELINE_SUCCESS',
});
