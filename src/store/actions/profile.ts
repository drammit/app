export const followProfile = (UserId: number): ProfileFollowAction => ({
  UserId,
  type: 'PROFILE_FOLLOW',
});

export const unfollowProfile = (UserId: number): ProfileUnfollowAction => ({
  UserId,
  type: 'PROFILE_UNFOLLOW',
});
