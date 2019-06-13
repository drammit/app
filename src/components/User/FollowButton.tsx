import { Button, Icon, Text } from 'native-base';
import React, { useCallback } from 'react';

import { followProfile, unfollowProfile } from '../../store/actions/profile';
import { useDispatch } from 'react-redux';

interface FollowButtonProps {
  style?: any;
  profile: ProfileShape;
}

const FollowButton = ({ style, profile }: FollowButtonProps) => {
  const dispatch = useDispatch();
  const onFollow = useCallback(
    () => dispatch(followProfile(profile.id)),
    [profile, dispatch],
  );
  const onUnfollow = useCallback(
    () => dispatch(unfollowProfile(profile.id)),
    [profile, dispatch],
  );

  return (
    <Button
      style={style}
      small
      bordered={!profile.isFollowing}
      iconRight={profile.isFollowing}
      onPress={profile.isFollowing ? onUnfollow : onFollow}
    >
      <Text>{profile.isFollowing ? 'Following' : 'Follow'}</Text>
      {profile.isFollowing ? <Icon name="checkmark" /> : null}
    </Button>
  );
};

export default FollowButton;
