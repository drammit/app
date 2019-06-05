import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'native-base';

import AuthLoading from './screens/Login/AuthLoading';

import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Login/Login';
import SignUp from './screens/Login/SignUp';
import SignUpContinued from './screens/Login/SignUpContinued';

import Timeline from './screens/Timeline/Timeline';
import DramDetails from './screens/Timeline/DramDetails';

import Search from './screens/Search/Search';
import Notifications from './screens/Notifications/Notifications';

import Profile from './screens/Profile/Profile';
import ProfileSettings from './screens/Profile/Settings';

import colors from './config/colors';
import Dram from './components/Dram/Dram';

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.green,
  },
  headerTintColor: colors.light,
};

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
    SignUpContinued: {
      path: 'signupcontinued',
      screen: SignUpContinued,
    },
    Welcome: {
      screen: Welcome,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
    initialRouteName: 'Welcome',
  },
);

const TimelineStack = createStackNavigator(
  {
    Distillery: {
      path: 'distillery',
      screen: DramDetails,
    },
    DramDetails: {
      path: 'dram',
      screen: DramDetails,
    },
    Timeline: {
      path: 'timeline',
      screen: Timeline,
    },
    UserProfile: {
      path: 'user-profile',
      screen: Profile,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
    initialRouteName: 'Timeline',
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      path: 'profile',
      screen: Profile,
    },
    ProfileSettings: {
      path: 'profile-settings',
      screen: ProfileSettings,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
    initialRouteName: 'Profile',
  },
);

function iconByRoutename(routeName: string) {
  switch (routeName) {
    case 'Profile':
      return 'contact';
    case 'Search':
      return 'search';
    case 'Notifications':
      return 'notifications-outline';
    case 'Timeline':
    default:
      return 'list';
  }
}

const MainStack = createBottomTabNavigator(
  {
    Timeline: {
      path: 'timeline',
      screen: TimelineStack,
    },
    // tslint:disable-next-line:object-literal-sort-keys
    Search: {
      path: 'search',
      screen: Search,
    },
    Notifications: {
      path: 'notifications',
      screen: Notifications,
    },
    Profile: {
      path: 'profile/:id',
      screen: ProfileStack,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const name = iconByRoutename(navigation.state.routeName);

        return (
          <Icon
            active={focused}
            style={{
              color: tintColor,
              fontSize: 24,
            }}
            color={tintColor || ''}
            fontSize={12}
            name={name}
          />
        );
      },
    }),
    initialRouteName: 'Timeline',
    tabBarOptions: {
      activeTintColor: colors.lightGreen,
      inactiveTintColor: colors.grey1,
    },
  },
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading,
    AuthStack,
    MainStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default AppNavigator;
