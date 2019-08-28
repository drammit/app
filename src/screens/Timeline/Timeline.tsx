import React, { useCallback } from 'react';
import { Button, Content, Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTimeline, refreshTimeline } from '../../store/actions/timeline';
import {
  getTimeline,
  getTimelineItems,
  isTimelineLoading,
} from '../../store/selectors/timeline';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Timeline from '../../components/Dram/Timeline';
import Logo from '../../components/Logo/Logo';

import colors from '../../config/colors';

type TimelineProps = NavigationInjectedProps;

const TimelinePage = ({ navigation }: TimelineProps) => {
  const dispatch = useDispatch();
  const timeline = useSelector(getTimeline);

  const onRefresh = useCallback(
    (until: number) => {
      dispatch(refreshTimeline({ until }));
    },
    [],
  );

  const onFetch = useCallback(
    (from?: number) => {
      dispatch(fetchTimeline({ from }));
    },
    [],
  );

  if (!timeline) return null;

  const isLoading = isTimelineLoading(timeline);
  const items = getTimelineItems(timeline);

  if (!isLoading && items.length === 0 && navigation.isFocused()) {
    // redirect to WelcomeTour is focused
    navigation.navigate('WelcomeTour');
  }

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Timeline
        timeline={timeline}
        onFetch={onFetch}
        onRefresh={onRefresh}
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
};

TimelinePage.navigationOptions = {
  headerTitle: (
    <Logo width={120} color={colors.light} />
  ),
  title: 'Drams',
};

export default TimelinePage;
