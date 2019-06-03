import React from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { Content } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Dram from '../../components/Dram/Dram';
import Logo from '../../components/Logo/Logo';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: colors.green,
    flex: 1,
    padding: 12,
  },
  mainContainer: {
    backgroundColor: colors.white,
  },
  parentContainer: {
    backgroundColor: colors.green,
  },
});

type TimelineProps = NavigationInjectedProps;

interface TimelineState {
  refreshing: boolean;
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  private static navigationOptions = {
    headerTitle: (
      <Logo width={120} color={colors.light} />
    ),
    title: 'Timeline',
  };

  public state = {
    refreshing: false,
  };

  public onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(
      () => {
        this.setState({ refreshing: false });
      },
      1000,
    );
  }

  public render() {
    const { refreshing } = this.state;

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content
          contentContainerStyle={styles.mainContainer}
          padder
          refreshing={refreshing}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              tintColor={colors.grey4}
            />
          }
        >
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
      </SafeWithHeader>
    );
  }
}

export default Timeline;
