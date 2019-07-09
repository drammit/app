import React, { useEffect, useRef, useState } from 'react';
import { View } from 'native-base';
import { Animated } from 'react-native';

import Glass from './Glass';

import colors from '../../config/colors';

const useAnimation = (animation: (animationValue: Animated.Value) => void, delay = 0) => {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(
    () => { setTimeout(() => animation(value), delay); },
    [animation],
  );

  return value;
};

const SlainteAnimation = () => {
  const [width, setWidth] = useState<number>(0);
  const springAnim = useAnimation(
    (anim) => {
      Animated.spring(anim, {
        friction: 3,
        toValue: 100,
        useNativeDriver: true,
      }).start();
    },
    100,
  );
  const easeAnim = useAnimation(
    (anim) => {
      Animated.timing(anim, {
        toValue: 100,
        useNativeDriver: true,
      }).start();
    },
    100,
  );

  return (
    <View
      onLayout={e => setWidth(e.nativeEvent.layout.width)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Animated.View
        style={{
          transform: [
            {
              rotate: springAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['-25deg', '0deg'],
              }),
            },
            {
              translateX: easeAnim.interpolate({
                inputRange: [0, 30, 100],
                outputRange: [0, width * 0.05, 0],
              }),
            },
            {
              translateY: easeAnim.interpolate({
                inputRange: [0, 30, 100],
                outputRange: [0, width * -0.1, 0],
              }),
            },
          ],
        }}
      >
        <Glass color={colors.green} width={width * 0.45} />
      </Animated.View>
      <Animated.View
        style={{
          transform: [
            { scaleX: -1 },
            {
              rotate: springAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['-25deg', '0deg'],
              }),
            },
            {
              translateX: easeAnim.interpolate({
                inputRange: [0, 30, 100],
                outputRange: [0, width * 0.05, 0],
              }),
            },
            {
              translateY: easeAnim.interpolate({
                inputRange: [0, 30, 100],
                outputRange: [0, width * -0.1, 0],
              }),
            },
          ],
        }}
      >
        <Glass color={colors.green} width={width * 0.45} />
      </Animated.View>
    </View>
  );
};

export default SlainteAnimation;
