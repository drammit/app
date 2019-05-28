import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Icon } from 'native-base';

import colors from '../../config/colors';

function createViewStyle(error: boolean) {
  let extra = {};

  if (error) {
    extra = {
      backgroundColor: colors.red,
    };
  }

  return StyleSheet.create({
    style: {
      ...extra,
      alignItems: 'center',
      flexDirection: 'row',
      padding: 14,
    },
  });
}

function createTextStyle(error: boolean) {
  const extra = {};

  return StyleSheet.create({
    style: {
      ...extra,
      color: colors.light,
      flex: 1,
      fontWeight: '700',
      lineHeight: 24,
    },
  });
}

interface MessageProps {
  children: string;
  error?: boolean;
}

const Message = ({ children, error = false }: MessageProps) => (
  <View style={createViewStyle(error).style}>
    {error && <Icon name="alert" style={{ color: colors.light, fontSize: 40, marginRight: 20 }}/>}
    <Text textBreakStrategy="simple" style={createTextStyle(error).style}>
      {children}
    </Text>
  </View>
);

export default Message;
