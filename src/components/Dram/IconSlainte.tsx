import React from 'react';
import * as Svg from 'react-native-svg';

import colors from '../../config/colors';

interface SlainteProps {
  active?: boolean;
  height?: number;
  style?: any;
}

const IconSlainte = ({ active = false, height = 22, style = {} }: SlainteProps) => {
  const currentColor = active ? colors.deepOrange : colors.grey2;

  return (
    <Svg.Svg
      style={style}
      width={(661.1 / 629.8) * height}
      height={height}
      viewBox="0 0 629.8 661.1"
    >
      <Svg.Path
        fill={currentColor}
        d="M194.9,661.1c-2.1,0-4.7,0-7.8-0.2c-3.8-0.1-8.1-0.3-12.7-0.6h-0.1
        c-33.5-2.4-65.9-6.1-99-11.3h-0.1c-5.1-0.9-9.1-1.6-12.5-2.3c-11.7-2.3-15.6-3.6-18-5
        c-0.8-0.5-1.6-0.9-2.6-1.4c-4.4-2.4-10.5-5.8-15.1-11.1c-6.4-7.4-8.2-16.4-5.1-26
        c5.5-17.2,30.8-52.8,33.7-56.8c0.7-0.9,1.1-1.4,2-2.1c0.9-0.8,3.9-4.2,1.9-10.8l-0.1-0.3
        c-0.1-0.3-0.2-0.6-0.3-0.8c-1-2.7-2.6-5.6-4.9-8.6c-2.7-3.6-6.1-7.6-9.7-11.9
        C32.4,497.7,16.1,478.4,7,452c-1.4-4.2-2.7-8.6-3.7-13c-2.9-12.6-3.9-26.1-2.9-39.9
        C2.3,372,14.2,343.3,28,310c19.2-46,42.9-103.3,47-176.7c0.2-2.7,1.4-5.3,3.5-7.1
        c2.1-1.8,4.8-2.6,7.6-2.3l97.7,11.1l97.7,11.1c2.7,0.3,5.2,1.7,6.9,3.9c1.7,2.2,2.3,5,1.9,7.7
        c-12.5,72.4-2.2,133.6,6,182.8c6,35.5,11.1,66.1,6.9,93c-0.2,1.4-0.5,2.8-0.7,4.1
        c-2.6,14-7.2,27.3-13.7,39.3c-0.1,0.1-0.1,0.3-0.2,0.4c-1.2,2.2-2.4,4.3-3.6,6.2
        c-14.7,23.7-35,38.9-49.8,49.9c-4.5,3.4-8.7,6.5-12.1,9.4c-2.8,2.4-5,4.8-6.5,7.1l-0.1,0.1
        c-0.2,0.3-0.4,0.6-0.6,0.9l-0.3,0.5c-3.5,6.4-0.5,10.5-0.5,10.6c0.6,0.8,1.2,1.6,1.6,2.6
        c1.9,4.5,18.6,44.9,20.1,62.9c0.8,10.1-2.9,18.4-10.9,24.2c-5.7,4.2-12.4,6.1-17.2,7.4
        c-1,0.3-2,0.6-2.8,0.8C204.1,660.6,201.8,661.1,194.9,661.1z"
      />
      <Svg.Path
        fill={currentColor}
        d="M423.9,659.9c-0.8-0.2-1.8-0.5-2.8-0.8c-4.8-1.3-11.5-3.2-17.2-7.4
        c-8-5.8-11.7-14.1-10.9-24.2c1.5-18,18.2-58.4,20.1-62.9c0.4-1,1-1.8,1.6-2.6
        c0-0.1,3-4.2-0.5-10.6l-0.3-0.5c-0.2-0.3-0.4-0.6-0.6-0.9l-0.1-0.1c-1.5-2.3-3.7-4.7-6.5-7.1
        c-3.4-2.9-7.6-6-12.1-9.4c-14.8-11-35.1-26.2-49.8-49.9c-1.2-1.9-2.4-4-3.6-6.2
        c-0.1-0.1-0.1-0.3-0.2-0.4c-6.5-12-11.1-25.3-13.7-39.3c-0.2-1.3-0.5-2.7-0.7-4.1
        c-4.2-26.9,0.9-57.5,6.9-93c8.2-49.2,18.5-110.4,6-182.8c-0.4-2.7,0.2-5.5,1.9-7.7
        c1.7-2.2,4.2-3.6,6.9-3.9L446,135l97.7-11.1c2.8-0.3,5.5,0.5,7.6,2.3c2.1,1.8,3.3,4.4,3.5,7.1
        c4.1,73.4,27.8,130.7,47,176.7c13.8,33.3,25.7,62,27.6,89.1c1,13.8,0,27.3-2.9,39.9
        c-1,4.4-2.3,8.8-3.7,13c-9.1,26.4-25.4,45.7-37.5,59.9c-3.6,4.3-7,8.3-9.7,11.9
        c-2.3,3-3.9,5.9-4.9,8.6c-0.1,0.2-0.2,0.5-0.3,0.8l-0.1,0.3c-2,6.6,1,10,1.9,10.8
        c0.9,0.7,1.3,1.2,2,2.1c2.9,4,28.2,39.6,33.7,56.8c3.1,9.6,1.3,18.6-5.1,26
        c-4.6,5.3-10.7,8.7-15.1,11.1c-1,0.5-1.8,0.9-2.6,1.4c-2.4,1.4-6.3,2.7-18,5
        c-3.4,0.7-7.4,1.4-12.5,2.3h-0.1c-33.1,5.2-65.5,8.9-99,11.3h-0.1c-4.6,0.3-8.9,0.5-12.7,0.6
        c-3.1,0.2-5.7,0.2-7.8,0.2C428,661.1,425.7,660.6,423.9,659.9z"
      />
      <Svg.Line
        strokeWidth={25}
        strokeMiterlimit={10}
        stroke={currentColor}
        x1="314.9"
        y1="111"
        x2="314.9"
        y2="0"
      />
      <Svg.Line
        strokeWidth={25}
        strokeMiterlimit={10}
        stroke={currentColor}
        x1="356.5"
        y1="111"
        x2="400.8"
        y2="37.2"
      />
      <Svg.Line
        strokeWidth={25}
        strokeMiterlimit={10}
        stroke={currentColor}
        x1="270.7"
        y1="111"
        x2="226.4"
        y2="37.2"
      />
    </Svg.Svg>
  );
}

export default IconSlainte;
