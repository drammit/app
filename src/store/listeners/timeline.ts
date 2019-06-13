import { getDrams } from '../../components/Dram/api';

import { receiveTimeline, receiveRefreshedTimeline } from '../actions/timeline';

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
        .then((result: TimelinePayload) => dispatch(receiveRefreshedTimeline(result)));
    },
    type: ['FETCH_TIMELINE_REFRESH'],
  },
];

export default listeners;
