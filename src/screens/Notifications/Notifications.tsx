import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  submitButton: {
    marginTop: 24,
  },
});

type TimelineProps = NavigationInjectedProps;

class Notifications extends React.Component<TimelineProps> {
  private static navigationOptions = {
    title: 'Notifications',
  };

  public render() {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>Notifications</Text>
        </View>
      </SafeWithHeader>
    );
  }
}

export default Notifications;
