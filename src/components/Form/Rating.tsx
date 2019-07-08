import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { useDebounce } from 'use-debounce';

import RatingStar from '../Dram/RatingStar';

function stateByRating(rating: number, star: 1 | 2 | 3 | 4 | 5) {
  if (rating >= star) return 'full';
  if (rating <= star - 1) return 'empty';
  return 'half';
}

const styles = StyleSheet.create({
  caption: {
    margin: 12,
    textAlign: 'center',
  },
  starAndScore: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  starContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

interface RatingProps {
  rating: number;
  onUpdate: (rating: number) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

const divRate = 6.5;

function posToScore(pos: number, totalWidth: number, maxScore: number, divider: number): number {
  const itemWidth = totalWidth / divider;
  const spacing = (totalWidth - (itemWidth * maxScore)) / (maxScore - 1);

  for (let i = 0; i < maxScore; i += 1) {
    const totalSpace = (itemWidth * (i + 1)) + (i * spacing);
    if (pos < totalSpace - (itemWidth / 2)) {
      return i + 0.5;
    }

    if (pos < totalSpace + spacing) {
      return i + 1;
    }
  }

  return 5;
}

const Rating = ({ rating, onUpdate, onStart, onEnd }: RatingProps) => {
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [score, setScore] = useState<number>(rating);
  const [debouncedScore] = useDebounce(score, 400);

  const starWidth = inputWidth / divRate;

  const onUpdateScore = useCallback(
    (position: number) => setScore(posToScore(position, inputWidth, 5, divRate)),
    [inputWidth, divRate],
  );

  const onLayout = useCallback(
    (e) => {
      setInputWidth(e.nativeEvent.layout.width);
    },
    [setInputWidth],
  );

  const onGrant = useCallback(
    (e) => {
      onUpdateScore(e.nativeEvent.locationX);
      if (onStart) onStart();
    },
    [onUpdateScore, onStart],
  );

  const onMove = useCallback(
    (e) => {
      onUpdateScore(e.nativeEvent.locationX);
    },
    [onUpdateScore],
  );

  const onRelease = useCallback(
    (e) => {
      onUpdateScore(e.nativeEvent.locationX);
      if (onEnd) onEnd();
    },
    [onUpdateScore, onEnd],
  );

  useEffect(
    () => {
      if (debouncedScore !== rating) onUpdate(debouncedScore);
    },
    [rating, debouncedScore],
  );

  return (
    <View
      onResponderGrant={onGrant}
      onResponderMove={onMove}
      onResponderRelease={onRelease}
      onStartShouldSetResponderCapture={() => true}
      onResponderTerminationRequest={() => false}
      accessible
      accessibilityRole="adjustable"
      pointerEvents="box-only"
      style={{ flexGrow: 1, width: '100%' }}
    >
      <View style={styles.starAndScore}>
        <View
          style={styles.starContainer}
          onLayout={onLayout}
        >
          <RatingStar width={starWidth} state={stateByRating(score, 1)} />
          <RatingStar width={starWidth} state={stateByRating(score, 2)} />
          <RatingStar width={starWidth} state={stateByRating(score, 3)} />
          <RatingStar width={starWidth} state={stateByRating(score, 4)} />
          <RatingStar width={starWidth} state={stateByRating(score, 5)} />
        </View>
        <Text style={{ textAlign: 'right', fontSize: 26, width: 60 }}>{score.toFixed(1)}</Text>
      </View>
      <Text note style={styles.caption}>Tap or slide to rate</Text>
    </View>
  );
};

export default Rating;
