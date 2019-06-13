import React, { useCallback } from 'react';
import { Body, Text, Card, CardItem, Left, Button, Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { getProfile } from '../../store/entities/profiles';
import { getCurrentUser } from '../../store/selectors/user';
import { followProfile, unfollowProfile } from '../../store/actions/profile';

import Avatar from './Avatar';
import UsernameLink from './UsernameLink';

interface ProfileCardProps {
  id: number;
  style?: any;
}

const ProfileCard = ({ id, style = {} }: ProfileCardProps) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: StoreShape) => getProfile(id)(state, dispatch));
  const currentUser = useSelector(getCurrentUser);
  const onFollow = useCallback(
    () => {
      if (!profile || profile instanceof Error) return;
      dispatch(followProfile(profile.id));
    },
    [profile, dispatch],
  );
  const onUnfollow = useCallback(
    () => {
      if (!profile || profile instanceof Error) return;
      dispatch(unfollowProfile(profile.id));
    },
    [profile, dispatch],
  );

  if (!profile || profile instanceof Error || currentUser.id === 19) {
    return (
      <Card style={{ ...style }}>
        <CardItem>
          <Left>
            <Avatar size={80} />
          </Left>
        </CardItem>
      </Card>
    );
  }

  return (
    <Card style={{ ...style }}>
      <CardItem>
        <Left>
          <Avatar size={80} uri={profile.avatar} />
          <Body style={{ marginLeft: 16 }}>
            <UsernameLink fullName user={profile} />
            <Text note>{profile.username}</Text>
            <Button
              style={{ marginTop: 6 }}
              small
              bordered={!profile.isFollowing}
              iconRight={profile.isFollowing}
              onPress={profile.isFollowing ? onUnfollow : onFollow}
            >
              <Text>{profile.isFollowing ? 'Following' : 'Follow'}</Text>
              {profile.isFollowing ? <Icon name="checkmark" /> : null}
            </Button>
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default ProfileCard;
