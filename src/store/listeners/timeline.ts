import { getDrams } from '../../screens/Timeline/api';

import { receiveTimeline } from '../actions/timeline';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: FetchTimelineAction) => {
      getDrams({ from: action.from })
        .then((result: TimelinePayload) => dispatch(receiveTimeline(result)));
    },
    type: ['FETCH_TIMELINE'],
  },
  {
    listener: (dispatch, action: FetchTimelineRefreshAction) => {
      getDrams({ until: action.until })
        .then((result: TimelinePayload) => dispatch(receiveTimeline(result)));
    },
    type: ['FETCH_TIMELINE_REFRESH'],
  },
];

export default listeners;
