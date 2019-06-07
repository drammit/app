import React, { useState } from 'react';
import { Image, View } from 'react-native';

import { envVar } from '../../core/env';

const STATIC_ROOT = envVar('STATIC_ROOT');

interface DramImageProps {
  uri?: string;
}

const DramImage = ({ uri }: DramImageProps) => {
  const [width, setWidth] = useState<string | number>('auto');
  const [height, setHeight] = useState(263);

  const completeUri = [
    STATIC_ROOT,
    '/drams/',
    uri,
    '_800.jpg',
  ].join('');

  return (
    <View
      style={{ flex: 1, width, height }}
      onLayout={(e) => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
        setHeight(newWidth * 0.75);
      }}
    >
      <Image
        source={{ uri: completeUri }}
        resizeMode="cover"
        style={{ flex: 1, width, height }}
      />
    </View>
  );
}

export default DramImage;
