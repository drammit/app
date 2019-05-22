import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Welcome from './screens/Welcome/Welcome';

const AppNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
    },
  },
  {
    initialRouteName: 'Welcome',
  },
);

export default AppNavigator;
