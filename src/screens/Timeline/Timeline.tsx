import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithSlimHeader from '../../components/Pages/SafeWithSlimHeader';
import Dram from '../../components/Dram/Dram';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  submitButton: {
    marginTop: 24,
  },
});

type TimelineProps = NavigationInjectedProps;

class Timeline extends React.Component<TimelineProps> {
  private static navigationOptions = {
    header: null,
    title: 'Timeline',
  };

  public render() {
    return (
      <SafeWithSlimHeader style={{ flex: 1 }}>
        <View style={styles.container}>
          <Dram />
          <Dram />
          <Dram />
          <Dram />
          <Dram />
        </View>
      </SafeWithSlimHeader>
    );
  }
}

export default Timeline;
