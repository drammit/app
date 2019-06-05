import React from 'react';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  username: {
    fontSize: 14,
  },
});

interface NameLinkProps extends NavigationInjectedProps {
  distillery: DistilleryShape;
}

const NameLink = ({ distillery, navigation }: NameLinkProps) => (
  <Text
    style={styles.username}
    onPress={() => navigation.navigate('Distillery', { id: distillery.id })}
  >
    distilled by {distillery.name}
  </Text>
);

export default withNavigation(NameLink);
