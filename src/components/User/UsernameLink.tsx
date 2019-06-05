import React from 'react';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  username: {
    color: colors.green,
    fontWeight: '700',
  },
});

interface UsernameLinkProps extends NavigationInjectedProps {
  user: UserShape;
}

const UsernameLink = ({ user, navigation }: UsernameLinkProps) => (
  <Text
    style={styles.username}
    onPress={() => navigation.navigate('UserProfile', { id: user.id })}
  >
    {user.username}
  </Text>
);

export default withNavigation(UsernameLink);
