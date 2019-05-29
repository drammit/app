import React from 'react';
import { Text, Button, Content } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Message from '../../components/Message/Message';
import Avatar from '../../components/User/Avatar';

import { getUser } from '../../store/selectors/user';
import { getProfile } from '../../store/loadables/profiles';
import { setUserInfo } from '../../store/actions/app';
import { dispatch } from '../../store/store';

type ProfileProps = {
  loginUser: StoreUser;
  profile: StoreProfile;
} & NavigationInjectedProps;

class Profile extends React.Component<ProfileProps> {
  private static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    const title = navigation.getParam('title', '');

    return { title };
  }

  public render() {
    const { navigation, profile } = this.props;

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

    // update the page header if doesn't match
    if (!(profile instanceof Error)) {
      const navTitle = navigation.getParam('title', '');
      if (navTitle !== profile.username) navigation.setParams({ title: profile.username });
    }

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          <Avatar uri={profile.avatar} />

          <Button onPress={() => navigation.push('Profile', { id: 19 })}>
            <Text>Go to other profile</Text>
          </Button>

          <Button onPress={() => dispatch(setUserInfo(1, 'Harry'))}>
            <Text>Update user info</Text>
          </Button>
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
