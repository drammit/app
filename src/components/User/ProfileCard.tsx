import React from 'react';
import { Body, Text, Card, CardItem, Left } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { getProfile } from '../../store/entities/profiles';
import { getCurrentUser } from '../../store/selectors/user';

import Avatar from './Avatar';
import UsernameLink from './UsernameLink';
import FollowButton from './FollowButton';

interface ProfileCardProps {
  id: number;
  style?: any;
}

const ProfileCard = ({ id, style = {} }: ProfileCardProps) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: StoreShape) => getProfile(id)(state, dispatch));
  const currentUser = useSelector(getCurrentUser);

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
            <FollowButton style={{ marginTop: 6 }} profile={profile} />
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default ProfileCard;
