import { getDrams } from '../api/drams';

import { receiveTimeline, receiveRefreshedTimeline } from '../actions/timeline';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: FetchTimelineAction) => {
      getDrams({ from: action.from })
        .then((result: TimelinePayload) => dispatch(receiveTimeline(result)));
    },
    type: ['FETCH_TIMELINE', 'FETCH_TIMELINE_REDO'],
  },
  {
    listener: (dispatch, action: FetchTimelineRefreshAction) => {
      getDrams({ until: action.until })
        .then((result: TimelinePayload) => dispatch(receiveRefreshedTimeline(result)));
    },
    type: ['FETCH_TIMELINE_REFRESH'],
  },
];

export default listeners;
