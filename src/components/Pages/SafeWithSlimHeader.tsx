import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

const SafeWithSlimHeader = ({ style, children }: any) => (
  <View style={styles.container}>
    <StatusBar backgroundColor={colors.green} barStyle="light-content" />
    <SafeAreaView style={style}>
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  </View>
);

export default SafeWithSlimHeader ;
