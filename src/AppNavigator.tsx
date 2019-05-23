import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Login/Login';
import SignUp from './screens/Login/SignUp';

import colors from './config/colors';

const WelcomeStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
    Welcome: {
      screen: Welcome,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.green,
      },
      headerTintColor: '#fff',
    },
    initialRouteName: 'Welcome',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    WelcomeStack,
  },
  {
    initialRouteName: 'WelcomeStack',
  },
);

export default AppNavigator;
