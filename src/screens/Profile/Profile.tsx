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
} & NavigationInjectedProps;

class Profile extends React.Component<ProfileProps> {
  private static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    return {
      title: navigation.getParam('username', ''),
    };
  }

  public componentDidMount(): void {
    const { navigation, loginUser } = this.props;

    const idParam: null | number = navigation.getParam('id', null);
    const userId = idParam || loginUser.id;

    console.log(userId, 'mount');
  }

  public render() {
    const { navigation } = this.props;

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

const mapStateToProps = (state: StoreShape) => ({
  loginUser: getUser(state),
  profile: getProfile(getUser(state).id)(state),
});

export default connect(mapStateToProps)(Profile);
