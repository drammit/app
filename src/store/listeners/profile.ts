import { followUser, unfollowUser } from '../api/profile';
import { refetchTimeline } from '../actions/timeline';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: any) => {
      followUser(action.UserId)
        .then(() => dispatch(refetchTimeline()));
    },
    type: ['PROFILE_FOLLOW'],
  },
  {
    listener: (dispatch, action: any) => {
      unfollowUser(action.UserId)
        .then(() => dispatch(refetchTimeline()));
    },
    type: ['PROFILE_UNFOLLOW'],
  },
];

export default listeners;
