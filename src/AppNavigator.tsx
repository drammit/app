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

import AddWhisky from './screens/AddNew/AddWhisky';
import AddDistillery from './screens/AddNew/AddDistillery';
import AddBottler from './screens/AddNew/AddBottler';
import PickDistillery from './screens/AddNew/PickDistillery';

import Search from './screens/Search/Search';

import DramReview from './screens/DramReview/DramReview';
import FlavourPicker from './components/Form/Flavours/FlavourPicker';

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
    borderBottomColor: colors.green,
  },
  headerTintColor: colors.light,
};

const defaultProfileStack = {
  Collection: {
    path: 'collection',
    screen: Collection,
  },
  ProfilePage: {
    path: 'profile',
    screen: Profile,
  },
  WishList: {
    path: 'wish-list',
    screen: WishList,
  },
};

const defaultDramStack = {
  DramDetails: {
    path: 'dram',
    screen: DramDetails,
  },
};

const defaultWhiskyStack = {
  Distillery: {
    path: 'distillery',
    screen: Distillery,
  },
  DramReview: {
    path: 'dram-review',
    screen: DramReview,
  },
  FlavourPicker: {
    path: 'dram-review/flavour-picker',
    screen: FlavourPicker,
  },
  Whisky: {
    path: 'whisky',
    screen: Whisky,
  },
};

const defaultAddStack = {
  AddBottler: {
    path: 'add-bottler',
    screen: AddBottler,
  },
  AddDistillery: {
    path: 'add-distillery',
    screen: AddDistillery,
  },
  AddWhisky: {
    path: 'add-whisky',
    screen: AddWhisky,
  },
  PickDistillery: {
    path: 'pick-distillery',
    screen: PickDistillery,
  },
};

const hideTabsOnPage = ({ navigation }: any) => {
  const currentRoutes = navigation.state.routes;
  const hideTabOn = ['DramDetails', 'DramReview', 'FlavourPicker'];

  return {
    tabBarVisible: hideTabOn.indexOf(currentRoutes[currentRoutes.length - 1].routeName) === -1,
  };
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
  },
);

DramsStack.navigationOptions = hideTabsOnPage;

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
    initialRouteName: 'ProfilePage',
  },
);

ProfileStack.navigationOptions = hideTabsOnPage;

const SearchStack = createStackNavigator(
  {
    ...defaultProfileStack,
    ...defaultWhiskyStack,
    ...defaultAddStack,
    SearchPage: {
      path: 'search',
      screen: Search,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
    initialRouteName: 'AddWhisky', // 'SearchPage',
  },
);

SearchStack.navigationOptions = hideTabsOnPage;

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
