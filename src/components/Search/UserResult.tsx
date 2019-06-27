import React from 'react';
import { Body, Icon, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import Avatar from '../User/Avatar';

import { getUser } from '../../store/entities/users';

interface UserResultProps extends NavigationInjectedProps {
  id: number;
}

const UserResult = ({ id, navigation }: UserResultProps) => {
  const user: StoreUser = getUser(id);

  if (!user) {
    return (
      <ListItem avatar>
        <Body>
          <Text />
          <Text note />
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  if (user instanceof Error) {
    return null;
  }

  const image = user.avatar;

  return (
    <ListItem
      avatar={image !== ''}
      onPress={() => navigation.navigate('UserProfile', { id })}
    >
      {image
        ? (
          <Left>
            <Avatar uri={image} size={36} />
          </Left>
        )
        : null}
      <Body>
        <Text>{user.username}</Text>
        {user.name ? <Text note>{user.name}</Text> : null}
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default withNavigation(UserResult);
