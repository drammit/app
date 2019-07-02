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
import WelcomeTour from './screens/Timeline/Welcome';

import Distillery from './screens/Distillery/Distillery';
import Whisky from './screens/Whisky/Whisky';

import Search from './screens/Search/Search';
import Notifications from './screens/Notifications/Notifications';

import Profile from './screens/Profile/Profile';
import WishList from './screens/Profile/WishList';
import Collection from './screens/Profile/Collection';
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

const defaultProfileStack = {
  Collection: {
    path: 'collection',
    screen: Collection,
  },
  Profile: {
    path: 'profile',
    screen: Profile,
  },
  WishList: {
    path: 'wish-list',
    screen: WishList,
  },
};

const defaultWhiskyStack = {
  Distillery: {
    path: 'distillery',
    screen: Distillery,
  },
  Whisky: {
    path: 'whisky',
    screen: Whisky,
  },
};

const defaultDramStack = {
  DramDetails: {
    path: 'dram',
    screen: DramDetails,
  },
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
    ...defaultProfileStack,
    ...defaultWhiskyStack,
    ...defaultDramStack,
    Timeline: {
      path: 'timeline',
      screen: Timeline,
    },
    WelcomeTour: {
      path: 'welcome-tour',
      screen: WelcomeTour,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
    initialRouteName: 'Timeline',
    initialRouteParams: {
      id: 1517,
    },
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
    ...defaultProfileStack,
    ...defaultWhiskyStack,
    ...defaultDramStack,
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

const SearchStack = createStackNavigator(
  {
    ...defaultProfileStack,
    ...defaultWhiskyStack,
    Search: {
      path: 'search',
      screen: Search,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
    initialRouteName: 'Whisky', // 'Search',
    initialRouteParams: {
      id: 53587,
    },
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
      screen: SearchStack,
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
    initialRouteName: 'Search', // 'Drams',
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
