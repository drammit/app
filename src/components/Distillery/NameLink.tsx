import React from 'react';
import { Text } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

interface NameLinkProps extends NavigationInjectedProps {
  distillery: DistilleryShape;
  style?: any;
}

const NameLink = ({ style = {}, distillery, navigation }: NameLinkProps) => (
  <Text
    style={{
      fontSize: 14,
      ...style,
    }}
    onPress={() => navigation.navigate('Distillery', { id: distillery.id })}
  >
    distilled by {distillery.name}
  </Text>
);

export default withNavigation(NameLink);
