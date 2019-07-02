import React from 'react';
import { Text } from 'native-base';
import { View, StyleSheet } from 'react-native';

import RatingStar from './RatingStar';

function stateByRating(rating: number, star: 1 | 2 | 3 | 4 | 5) {
  if (rating >= star) return 'full';
  if (rating <= star - 1) return 'empty';
  return 'half';
}

const styles = StyleSheet.create({
  starContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

interface RatingProps {
  rating: number;
  showNumber?: boolean;
}

const Rating = ({ rating, showNumber = false }: RatingProps) => (
  <View style={styles.starContainer}>
    <RatingStar state={stateByRating(rating, 1)} />
    <RatingStar state={stateByRating(rating, 2)} />
    <RatingStar state={stateByRating(rating, 3)} />
    <RatingStar state={stateByRating(rating, 4)} />
    <RatingStar state={stateByRating(rating, 5)} />
    {showNumber
      ? <Text note style={{ marginLeft: 6, fontSize: 16 }}>{rating.toFixed(1)}</Text>
      : null}
  </View>
);

export default Rating;
