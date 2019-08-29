import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

const Bottler = ({}: NavigationInjectedProps) => {
  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Pick Bottler</Text>
      </View>
    </SafeWithHeader>
  );
};

Bottler.navigationOptions = {
  title: 'Choose bottler',
};

export default Bottler;
