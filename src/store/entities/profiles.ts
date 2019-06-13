import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [profiles, getProfiles, getProfile] = createLoader<StoreProfiles, StoreProfile>({
  defaultValue: {},
  reducer: (state = {}, action) => {
    switch (action.type) {
      case 'PROFILE_FOLLOW':
      case 'PROFILE_UNFOLLOW':
        return {
          ...state,
          [action.UserId]: {
            ...state[action.UserId],
            isFollowing: action.type === 'PROFILE_FOLLOW',
          },
        };
      default:
        return state;
    }
  },
  resolver: id => get(`/user/profile/${id}`),
  table: 'profiles',
});
