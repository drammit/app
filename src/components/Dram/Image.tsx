import React, { useState } from 'react';
import { Image, View } from 'react-native';

import { envVar } from '../../core/env';

const STATIC_ROOT = envVar('STATIC_ROOT');

interface DramImageProps {
  uri?: string;
  aspectRatio?: number;
}

const DramImage = ({ uri, aspectRatio }: DramImageProps) => {
  const defaultWidth = '100%';
  const defaultHeight = aspectRatio ? 350 / aspectRatio : 'auto';

  const [width, setWidth] = useState<string | number>(defaultWidth);
  const [height, setHeight] = useState<string | number>(defaultHeight);

  const completeUri = [
    STATIC_ROOT,
    '/drams/',
    uri,
    '_800.jpg',
  ].join('');

  return (
    <View style={{ width, height }}>
      <Image
        source={{ uri: completeUri }}
        resizeMode={aspectRatio ? 'cover' : 'contain'}
        style={{ width, height }}
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          const newHeight = e.nativeEvent.layout.height;
          setWidth(newWidth);
          setHeight(aspectRatio ? newWidth / aspectRatio : newHeight);
        }}
      />
    </View>
  );
}

export default DramImage;
