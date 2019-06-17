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
  disableLink?: boolean;
  fullName?: boolean;
}

const UsernameLink = ({
  user,
  navigation,
  disableLink = false,
  fullName = false,
}: UsernameLinkProps) => (
  <Text
    style={styles.username}
    onPress={disableLink ? undefined : () => navigation.navigate('UserProfile', { id: user.id })}
  >
    {fullName ? user.name : user.username}
  </Text>
);

export default withNavigation(UsernameLink);
