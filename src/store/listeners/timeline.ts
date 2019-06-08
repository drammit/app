import { getDrams } from '../../screens/Timeline/api';

import { receiveTimeline } from '../actions/timeline';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: FetchTimelineAction) => {
      getDrams(action.from)
        .then((result: TimelinePayload) => dispatch(receiveTimeline(result)));
    },
    type: ['FETCH_TIMELINE', 'FETCH_TIMELINE_REFRESH'],
  },
];

export default listeners;
