import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

const SafeWithHeader = ({ style, children }: any) => (
  <SafeAreaView style={style}>
    <StatusBar barStyle="light-content" />
    {children}
  </SafeAreaView>
);

export default SafeWithHeader;
