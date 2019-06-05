import React from 'react';
import { View, StyleSheet } from 'react-native';

import RatingStar from './RatingStar';

function stateByRating(rating: number, star: 1 | 2 | 3 | 4 | 5) {
  if (rating >= star) return 'full';
  if (rating <= star - 1) return 'empty';
  return 'half';
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => (
  <View style={styles.container}>
    <RatingStar state={stateByRating(rating, 1)} />
    <RatingStar state={stateByRating(rating, 2)} />
    <RatingStar state={stateByRating(rating, 3)} />
    <RatingStar state={stateByRating(rating, 4)} />
    <RatingStar state={stateByRating(rating, 5)} />
  </View>
);

export default Rating;
