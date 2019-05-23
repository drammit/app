import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Login/Login';
import SignUp from './screens/Login/SignUp';
import Timeline from './screens/Timeline/Timeline';

import colors from './config/colors';

const AuthStack = createStackNavigator(
  {
    Login: {
      path: 'login',
      screen: Login,
    },
    SignUp: {
      path: 'signup',
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

const MainStack = createStackNavigator(
  {
    Timeline: {
      path: 'timeline',
      screen: Timeline,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.green,
      },
      headerTintColor: '#fff',
    },
    initialRouteName: 'Timeline',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    AuthStack,
    MainStack,
  },
  {
    initialRouteName: 'AuthStack',
  },
);

export default AppNavigator;
