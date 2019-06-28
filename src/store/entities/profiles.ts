import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [profiles, getProfiles, getProfile] = createLoader<StoreProfiles, ProfileShape>({
  defaultValue: {},
  fallbackValue: {
    createdAt: new Date(),
    drams: 0,
    followers: 0,
    following: 0,
    id: 0,
    isFollowing: false,
    subscription: false,
    username: '',
  },
  reducer: (state = {}, action) => {
    switch (action.type) {
      case 'PROFILE_FOLLOW':
      case 'PROFILE_UNFOLLOW':
        return {
          ...state,
          [action.UserId]: {
            ...state[action.UserId],
            value: {
              ...state[action.UserId].value,
              isFollowing: action.type === 'PROFILE_FOLLOW',
            },
          },
        };
      default:
        return state;
    }
  },
  resolver: id => get(`/user/profile/${id}`),
  table: 'profiles',
});
