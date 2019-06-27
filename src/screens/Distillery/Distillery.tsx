import React from 'react';
import { Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

const Distillery = () => (
  <SafeWithHeader>
    <Text>Distillery</Text>
  </SafeWithHeader>
);

Distillery.navigationOptions = ({ navigation }: NavigationInjectedProps) => {
  const title = navigation.getParam('title', '');

  return {
    title,
  };
};

export default Distillery;
