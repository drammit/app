export const fetchTimeline = ({
  from,
  UserId,
}: {
  from?: number;
  UserId?: number;
}): FetchTimelineAction => ({
  UserId,
  from,
  type: 'FETCH_TIMELINE',
});

export const refreshTimeline = ({
  until,
  UserId,
}: {
  until: number;
  UserId?: number;
}): FetchTimelineRefreshAction => ({
  UserId,
  type: 'FETCH_TIMELINE_REFRESH',
  until,
});

export const receiveTimeline = (
  payload: TimelinePayload,
  UserId?: number,
): FetchTimelineSuccessAction => ({
  UserId,
  payload,
  type: 'FETCH_TIMELINE_SUCCESS',
});

export const receiveRefreshedTimeline = (
  payload: TimelinePayload,
  UserId?: number,
): FetchTimelineRefreshSuccessAction => ({
  UserId,
  payload,
  type: 'FETCH_TIMELINE_REFRESH_SUCCESS',
});

export const refetchTimeline = (): FetchTimelineRedoAction => ({
  type: 'FETCH_TIMELINE_REDO',
});
