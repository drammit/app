import React from 'react';
import * as Svg from 'react-native-svg';

import colors from '../../config/colors';

interface RatingStarProps {
  width?: number;
  color?: string;
  state?: 'full' | 'half' | 'empty';
}

const RatingStart = ({ width = 20, color = colors.orange, state = 'full' }: RatingStarProps) => (
  <Svg.Svg
    width={width}
    height={width}
    viewBox="0 0 500 500"
  >
    <Svg.Path
      fill={color}
      opacity={state !== 'empty' ? 1 : 0.5}
      d="M249.9,12.5c-7.2,0-13.7,4.1-16.9,10.5l-66.7,135.1L17.1,179.8c-7.1,1-13,6-15.2,12.8
      c-2.2,6.8-0.4,14.3,4.8,19.3l108,105.1L89.3,465.5c-1.2,7.1,1.7,14.2,7.5,18.4
      c5.8,4.2,13.5,4.8,19.8,1.4L250,415.2V12.5C250,12.5,249.9,12.5,249.9,12.5z"
    />
    <Svg.Path
      fill={color}
      opacity={state === 'full' ? 1 : 0.5}
      d="M497.8,192.6c-2.2-6.8-8.1-11.8-15.2-12.8l-149.1-21.7L266.8,23c-3.2-6.4-9.6-10.5-16.8-10.5
      v402.7l133.3,70.2c2.8,1.4,5.8,2.2,8.7,2.2c3.9,0,7.8-1.2,11.1-3.6c5.8-4.2,8.7-11.3,7.5-18.4
      l-25.5-148.5L493,211.9C498.1,206.9,500,199.4,497.8,192.6z"
    />
  </Svg.Svg>
);

export default RatingStart;
