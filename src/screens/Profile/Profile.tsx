import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Content, H3, Icon } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Message from '../../components/Message/Message';
import Avatar from '../../components/User/Avatar';

import { getUser } from '../../store/selectors/user';
import { getProfile } from '../../store/loadables/profiles';

import colors from '../../config/colors';

import { dispatch } from '../../store/store';
import { logout } from '../../store/actions/auth';

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 12,
  },
  figureItem: {
    alignItems: 'center',
  },
  figureItemName: {
    color: colors.grey1,
    fontSize: 14,
  },
  figureItemNumber: {
    fontSize: 18,
  },
  figureItems: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  topbar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
});

type ProfileProps = {
  loginUser: StoreUser;
  profile: StoreProfile;
} & NavigationInjectedProps;

class Profile extends React.Component<ProfileProps> {
  private static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    const title = navigation.getParam('title', '');
    const headerBackTitle = navigation.getParam('headerBackTitle', '');

    return {
      headerBackTitle,
      title,
    };
  }

  public render() {
    const { navigation, profile, loginUser } = this.props;

    if (!profile) {
      // @todo: Placeholders
      return null;
    }

    if (profile instanceof Error) {
      const errorMessage = 'Couldn\'t load';
      const navTitle = navigation.getParam('title', '');
      if (navTitle !== errorMessage) navigation.setParams({ title: errorMessage });

      return (
        <SafeWithHeader style={{ flex: 1 }}>
          <Content padder>
            <Message error>{`Something went wrong:\n${profile.message}`}</Message>
          </Content>
        </SafeWithHeader>
      );
    }

    const isSelf = loginUser.id === profile.id;

    // update the page header if doesn't match
    if (!(profile instanceof Error)) {
      const navTitle = navigation.getParam('title', '');
      if (navTitle !== profile.username) {
        navigation.setParams({
          headerBackTitle: isSelf ? 'Profile' : profile.username,
          title: profile.username,
        });
      }
    }

    const actions = isSelf
      ? (
        <View style={styles.actions}>
          <Button small dark bordered onPress={() => navigation.navigate('ProfileSettings')}>
            <Text>Edit profile</Text>
          </Button>

          <Button small dark bordered onPress={() => dispatch(logout())}>
            <Text>Log out</Text>
          </Button>
        </View>
      )
      : (
        <View style={styles.actions}>
          <Text>No me!</Text>
        </View>
      );

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          <View style={styles.topbar}>
            <Avatar uri={profile.avatar} />

            <View style={styles.figureItems}>
              <View style={styles.figureItem}>
                <Text style={styles.figureItemNumber}>{profile.drams}</Text>
                <Text style={styles.figureItemName}>Drams</Text>
              </View>

              <View style={styles.figureItem}>
                <Text style={styles.figureItemNumber}>{profile.followers}</Text>
                <Text style={styles.figureItemName}>Followers</Text>
              </View>

              <View style={styles.figureItem}>
                <Text style={styles.figureItemNumber}>{profile.following}</Text>
                <Text style={styles.figureItemName}>Following</Text>
              </View>
            </View>
          </View>
          <View>
            <H3>{profile.name || profile.username}</H3>
            <Text>Joined {distanceInWordsToNow(profile.createdAt)} ago</Text>
          </View>

          {actions}
        </Content>
      </SafeWithHeader>
    );
  }
}

const mapStateToProps = (state: StoreShape, otherProps: ProfileProps) => {
  const loginUser = getUser(state);

  const idParam: null | number = otherProps.navigation.getParam('id', null);
  const userId = idParam || loginUser.id;

  const profile = getProfile(userId)(state);

  return {
    loginUser,
    profile,
  };
};

export default connect(mapStateToProps)(Profile);
