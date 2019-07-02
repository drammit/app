import React, { useState } from 'react';
import { Text } from 'native-base';
import { View, StyleSheet } from 'react-native';

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
  container: {
    marginBottom: 12,
    marginTop: 24,
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
  showNumber?: boolean;
}

const Rating = ({ rating }: RatingProps) => {
  const [starWidth, setStarWidth] = useState<number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.starAndScore}>
        <View
          style={styles.starContainer}
          onLayout={e => setStarWidth(e.nativeEvent.layout.width / 6.5)}
        >
          <RatingStar width={starWidth} state={stateByRating(rating, 1)} />
          <RatingStar width={starWidth} state={stateByRating(rating, 2)} />
          <RatingStar width={starWidth} state={stateByRating(rating, 3)} />
          <RatingStar width={starWidth} state={stateByRating(rating, 4)} />
          <RatingStar width={starWidth} state={stateByRating(rating, 5)} />
        </View>
        <Text style={{ marginLeft: 18, fontSize: 26 }}>{rating.toFixed(1)}</Text>
      </View>
      <Text note style={styles.caption}>Tap or slide to rate</Text>
    </View>
  );
};

export default Rating;
