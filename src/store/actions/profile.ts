export const followProfile = (UserId: number): ProfileFollowAction => ({
  UserId,
  type: 'PROFILE_FOLLOW',
});

export const unfollowProfile = (UserId: number): ProfileUnfollowAction => ({
  UserId,
  type: 'PROFILE_UNFOLLOW',
});

export const updateAvatar = (avatar: string): UpdateAvatarAction => ({
  avatar,
  type: 'UPDATE_AVATAR',
});
