import React from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { Content } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import { getDrams } from './api';

import { dispatch } from '../../store/store';
import { receiveTimeline } from '../../store/actions/timeline';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Dram from '../../components/Dram/Dram';
import Logo from '../../components/Logo/Logo';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
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

  public static fetchTimeline() {
    return getDrams()
      .then((result: TimelinePayload) => dispatch(receiveTimeline(result)));
  }

  public componentDidMount(): void {
    Timeline.fetchTimeline();
  }

  public onRefresh = () => {
    this.setState({ refreshing: true });
    Timeline.fetchTimeline()
      .then(() => this.setState({ refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
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
