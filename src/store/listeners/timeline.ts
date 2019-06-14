import { getDrams } from '../api/drams';

import { receiveTimeline, receiveRefreshedTimeline } from '../actions/timeline';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: FetchTimelineAction) => {
      getDrams({ from: action.from, UserId: action.UserId  })
        .then((result: TimelinePayload) => {
          dispatch(receiveTimeline(result, action.UserId));
        });
    },
    type: ['FETCH_TIMELINE', 'FETCH_TIMELINE_REDO'],
  },
  {
    listener: (dispatch, action: any) => {
      getDrams({ until: action.until, UserId: action.UserId })
        .then((result: TimelinePayload) => {
          dispatch(receiveRefreshedTimeline(result, action.UserId));
        });
    },
    type: ['FETCH_TIMELINE_REFRESH'],
  },
];

export default listeners;
