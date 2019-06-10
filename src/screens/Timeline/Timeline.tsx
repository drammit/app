import React from 'react';
import { StyleSheet, RefreshControl, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Content, Spinner } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';

import { dispatch } from '../../store/store';
import { fetchTimeline, refreshTimeline } from '../../store/actions/timeline';
import {
  getTimelineItems,
  isTimelineLoading,
  isTimelineRefreshing,
} from '../../store/selectors/timeline';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Dram from '../../components/Dram/Dram';
import Logo from '../../components/Logo/Logo';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
  },
});

interface TimelineProps extends NavigationInjectedProps {
  isLoading: boolean;
  isRefreshing: boolean;
  timeline: StoreTimeline['items'];
}

class Timeline extends React.Component<TimelineProps> {
  private static navigationOptions = {
    headerTitle: (
      <Logo width={120} color={colors.light} />
    ),
    title: 'Timeline',
  };

  public static fetchTimeline(from?: number) {
    dispatch(fetchTimeline(from));
  }

  public componentDidMount(): void {
    Timeline.fetchTimeline();
  }

  public onRefresh = () => {
    const { isLoading, timeline } = this.props;

    if (!isLoading) {
      dispatch(refreshTimeline(Math.max(...timeline)));
    }
  }

  public onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { isLoading, timeline } = this.props;

    if (!isLoading) {
      const { layoutMeasurement, contentSize, contentOffset } = e.nativeEvent;

      const bottom = layoutMeasurement.height + contentOffset.y;

      if (bottom > (contentSize.height - layoutMeasurement.height)) {
        Timeline.fetchTimeline(Math.min(...timeline));
      }
    }
  }

  public render() {
    const { isRefreshing, isLoading, timeline } = this.props;

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content
          onScroll={this.onScroll}
          contentContainerStyle={styles.mainContainer}
          padder
          refreshing={isRefreshing}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}
              tintColor={colors.grey4}
            />
          }
        >
          {timeline.map(id => <Dram key={id} id={id} />)}
          {isLoading && <Spinner color={colors.grey3} />}
        </Content>
      </SafeWithHeader>
    );
  }
}

const mapStateToProps = (state: StoreShape) => ({
  isLoading: isTimelineLoading(state),
  isRefreshing: isTimelineRefreshing(state),
  timeline: getTimelineItems(state),
});

export default connect(mapStateToProps)(Timeline);
