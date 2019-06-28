import React, { useCallback, useEffect } from 'react';
import { Spinner, Content } from 'native-base';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, StyleSheet } from 'react-native';

import colors from '../../config/colors';

import Dram from './Dram';
import {
  getTimelineItems,
  isTimelineEnd,
  isTimelineLoading,
  isTimelineRefreshing,
} from '../../store/selectors/timeline';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

interface TimelineProps {
  timeline: TimelineShape;
  header?: React.ReactElement;
  fallback: React.ReactElement;
  onRefresh: (from: number) => void;
  onFetch: (from?: number) => void;
}

const Timeline = ({ timeline, fallback, header, onRefresh, onFetch }: TimelineProps) => {
  const items = getTimelineItems(timeline);
  const isRefreshing = isTimelineRefreshing(timeline);
  const isLoading = isTimelineLoading(timeline);
  const isEnd = isTimelineEnd(timeline);

  const triggerRefresh = useCallback(
    () => {
      if (!isRefreshing) onRefresh(Math.max(...items));
    },
    [isRefreshing, items],
  );

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!isLoading && items.length > 0 && !isEnd) {
        const { layoutMeasurement, contentSize, contentOffset } = e.nativeEvent;

        const bottom = layoutMeasurement.height + contentOffset.y;

        if (bottom > (contentSize.height - layoutMeasurement.height)) {
          onFetch(Math.min(...items));
        }
      }
    },
    [isLoading, items, isEnd],
  );

  // fetch timeline on first mount
  useEffect(() => onFetch(), []);

  if (!isLoading && items.length === 0) {
    return (
      <Content padder>
        {header ? header : null}
        {fallback}
      </Content>
    );
  }

  return (
    // @ts-ignore
    <Content
      scrollEnabled
      onScroll={onScroll}
      contentContainerStyle={styles.mainContainer}
      padder
      refreshing={isRefreshing}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={triggerRefresh}
          tintColor={colors.grey4}
        />
      }
    >
      {header ? header : null}
      {items.map((id: number) => <Dram compact key={id} id={id} />)}
      {!isRefreshing && isLoading ? <Spinner color={colors.grey3} /> : null}
    </Content>
  );
};

export default Timeline;
