import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

const SafeWithoutHeader = ({ style, children }: any) => (
  <SafeAreaView style={style}>
    <StatusBar barStyle="dark-content" />
    {children}
  </SafeAreaView>
);

export default SafeWithoutHeader ;
