export const followProfile = (UserId: number): ProfileFollowAction => ({
  UserId,
  type: 'PROFILE_FOLLOW',
});

export const unfollowProfile = (UserId: number): ProfileUnfollowAction => ({
  UserId,
  type: 'PROFILE_UNFOLLOW',
});

export const updateAvatar = (avatar: string): ProfileUpdateAvatarAction => ({
  avatar,
  type: 'PROFILE_UPDATE_AVATAR',
});

export const updateName = (name: string): ProfileUpdateNameAction => ({
  name,
  type: 'PROFILE_UPDATE_NAME',
});
