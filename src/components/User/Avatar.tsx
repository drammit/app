import React from 'react';
import { Image } from 'react-native';

import createAvatarUrl from '../../core/avatarUrl';

import colors from '../../config/colors';

interface AvatarProps {
  uri?: string;
  size?: number;
  style?: any;
}

const Avatar = ({ uri, size = 90, style }: AvatarProps) => {
  const completeUri = createAvatarUrl(uri, size);

  return (
    <Image
      source={{ uri: completeUri }}
      resizeMode="cover"
      style={{
        ...style,
        backgroundColor: colors.grey5,
        borderRadius: size / 2,
        height: size,
        width: size,
      }}
    />
  );
};

export default Avatar;
