import React, { useState } from 'react';
import { Image, View } from 'react-native';

import { envVar } from '../../core/env';

const STATIC_ROOT = envVar('STATIC_ROOT');

interface DramImageProps {
  uri?: string;
}

const DramImage = ({ uri }: DramImageProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const completeUri = [
    STATIC_ROOT,
    '/drams/',
    uri,
    '_800.jpg',
  ].join('');

  return (
    <Image
      source={{ uri: completeUri }}
      resizeMode="cover"
      style={{ flex: 1, width, height }}
      onLayout={(e) => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
        setHeight(newWidth * 0.75);
      }}
    />
  );
}

export default DramImage;
