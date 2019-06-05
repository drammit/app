import React from 'react';
import { Image, PixelRatio } from 'react-native';

import { envVar } from '../../core/env';

const STATIC_ROOT = envVar('STATIC_ROOT');

function createExtension(size: number): string {
  if (size > 360) {
    return '_450.jpg';
  }

  if (size > 270) {
    return '_360.jpg';
  }

  if (size > 180) {
    return '_270.jpg';
  }

  if (size > 90) {
    return '_180.jpg';
  }

  return '_90.jpg';
}

interface AvatarProps {
  uri?: string;
  size?: number;
}

const Avatar = ({ uri, size = 90 }: AvatarProps) => {
  const completeUri = [
    STATIC_ROOT,
    '/avatars/',
    uri,
    createExtension(size * PixelRatio.get()),
  ].join('');

  return (
    <Image
      source={{ uri: completeUri }}
      resizeMode="cover"
      style={{
        borderRadius: size / 2,
        height: size,
        width: size,
      }}
    />
  );
}

export default Avatar;
