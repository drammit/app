import React from 'react';
import { StyleSheet } from 'react-native';
import { Content, View } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithSlimHeader from '../../components/Pages/SafeWithSlimHeader';
import Dram from '../../components/Dram/Dram';
import Logo from '../../components/Logo/Logo';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.green,
    flex: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: colors.white,
  },
  parentContainer: {
    backgroundColor: colors.green,
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
        <Content style={styles.parentContainer}>
          <View style={styles.header}>
            <Logo width={160} color={colors.light} />
          </View>
          <Content contentContainerStyle={styles.mainContainer} padder>
            <Dram />
            <Dram />
            <Dram />
            <Dram />
            <Dram />
            <Dram />
            <Dram />
            <Dram />
            <Dram />
            <Dram />
          </Content>
        </Content>
      </SafeWithSlimHeader>
    );
  }
}

export default Timeline;
