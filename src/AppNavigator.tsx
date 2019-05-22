import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Welcome from './Screens/Welcome/Welcome';

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
