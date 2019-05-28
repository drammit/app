import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

import { select } from '../../store/store';
import { getUser } from '../../store/selectors/user';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  submitButton: {
    marginTop: 24,
  },
});

type TimelineProps = NavigationInjectedProps;

class Profile extends React.Component<TimelineProps> {
  private static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    return {
      title: navigation.getParam('username', ''),
    };
  }

  public componentDidMount(): void {
    const { navigation } = this.props;

    const idParam: null | number = navigation.getParam('id', null);
    const userId = idParam || 0;

    console.log(select(getUser));
  }

  public render() {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>Profile</Text>
        </View>
      </SafeWithHeader>
    );
  }
}

export default Profile;
