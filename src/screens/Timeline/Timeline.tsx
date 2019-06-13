import React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Button, Content,  Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';

import { dispatch } from '../../store/store';
import { fetchTimeline, refreshTimeline } from '../../store/actions/timeline';
import {
  getTimeline,
  getTimelineItems, isTimelineEnd,
  isTimelineLoading,
  isTimelineRefreshing,
} from '../../store/selectors/timeline';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Timeline from '../../components/Dram/Timeline';
import Logo from '../../components/Logo/Logo';

import colors from '../../config/colors';

interface TimelineProps extends NavigationInjectedProps {
  isEnd: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  items: TimelineShape['items'];
  timeline: TimelineShape;
}

class TimelinePage extends React.Component<TimelineProps> {
  private static navigationOptions = {
    headerTitle: (
      <Logo width={120} color={colors.light} />
    ),
    title: 'Drams',
  };

  public onRefresh = (from: number) => {
    dispatch(refreshTimeline(from));
  }

  public onFetch = (from?: number) => {
    dispatch(fetchTimeline(from));
  }

  public render() {
    const { isLoading, items, navigation, timeline } = this.props;

    if (!isLoading && items.length === 0) {
      // redirect to WelcomeTour is focused
      if (navigation.isFocused()) navigation.navigate('WelcomeTour');
    }

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Timeline
          timeline={timeline}
          onFetch={this.onFetch}
          onRefresh={this.onRefresh}
          fallback={(
            <Content key="intro" scrollEnabled={false} padder style={{ padding: 24 }}>
              <Text>
                You have not added a dram review yet, or are not following anyone who has.{'\n'}
                {'\n'}
                Add your first review or start following people with reviews.
              </Text>
              <Button
                style={{ marginTop: 24 }}
                block
                onPress={() => navigation.navigate('WelcomeTour')}
              >
                <Text>
                  Read introduction
                </Text>
              </Button>
            </Content>
          )}
        />
      </SafeWithHeader>
    );
  }
}

const mapStateToProps = (state: StoreShape) => {
  const timeline = getTimeline(state);

  return {
    isEnd: isTimelineEnd(timeline),
    isLoading: isTimelineLoading(timeline),
    isRefreshing: isTimelineRefreshing(timeline),
    items: getTimelineItems(timeline),
    timeline,
  };
};

export default connect(mapStateToProps)(TimelinePage);
