import React from 'react';
import { Text, Button, Content } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

import { getUser } from '../../store/selectors/user';
import { getProfile } from '../../store/selectors/profile';
import { setUserInfo } from '../../store/actions/app';
import { dispatch } from '../../store/store';

type ProfileProps = {
  loginUser: StoreUser;
  profile: StoreProfile;
} & NavigationInjectedProps;

class Profile extends React.Component<ProfileProps> {
  private static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    return {
      title: navigation.getParam('username', ''),
    };
  }

  public render() {
    const { navigation, profile } = this.props;

    console.log(profile);

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          <Text>Profile</Text>

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
