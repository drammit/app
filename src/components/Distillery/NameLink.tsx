import React from 'react';
import { Text } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

interface NameLinkProps extends NavigationInjectedProps {
  distillery: DistilleryShape;
  disableLink?: boolean;
  style?: any;
  prefix?: string;
}

const NameLink = ({
  style = {},
  distillery,
  navigation,
  disableLink = false,
  prefix = 'distilled by',
}: NameLinkProps) => (
  <Text
    style={{
      fontSize: 14,
      ...style,
    }}
    onPress={disableLink
      ? undefined
      : () => navigation.navigate('Distillery', { id: distillery.id })
    }
  >
    {prefix} {distillery.name}
  </Text>
);

export default withNavigation(NameLink);
