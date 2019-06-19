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
import PlaceholderDetails from './screens/Timeline/PlaceholderDetails';
import WelcomeTour from './screens/Timeline/Welcome';

import Search from './screens/Search/Search';
import Notifications from './screens/Notifications/Notifications';

import Profile from './screens/Profile/Profile';
import ProfileSettings from './screens/Profile/Settings';
import SettingsAvatar from './screens/Profile/SettingsAvatar';
import SettingsDisplayName from './screens/Profile/SettingsDisplayName';
import SettingsPassword from './screens/Profile/SettingsPassword';

import colors from './config/colors';

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

const DramsStack = createStackNavigator(
  {
    Distillery: {
      path: 'distillery',
      screen: PlaceholderDetails,
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
    WelcomeTour: {
      path: 'welcome-tour',
      screen: WelcomeTour,
    },
    Whisky: {
      path: 'whisky',
      screen: PlaceholderDetails,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
    initialRouteName: 'Timeline',
  },
);

DramsStack.navigationOptions = ({ navigation }: any) => {
  const currentRoutes = navigation.state.routes;
  const hideTabOn = ['DramDetails'];

  return {
    tabBarVisible: hideTabOn.indexOf(currentRoutes[currentRoutes.length - 1].routeName) === -1,
  };
};

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
    SettingsAvatar: {
      path: 'settings-avatar',
      screen: SettingsAvatar,
    },
    SettingsDisplayName: {
      path: 'settings-display-name',
      screen: SettingsDisplayName,
    },
    SettingsPassword: {
      path: 'settings-password',
      screen: SettingsPassword,
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
    Drams: {
      path: 'timeline',
      screen: DramsStack,
    },
    // tslint:disable-next-line:object-literal-sort-keys
    Search: {
      path: 'search',
      screen: Search,
    },
    // tslint:disable-next-line:object-literal-sort-keys
    Notifications: {
      path: 'notifications',
      screen: Notifications,
    },
    Profile: {
      path: 'profile',
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
    initialRouteName: 'Profile', // 'Drams',
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
