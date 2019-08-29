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

const Whisky = ({}: NavigationInjectedProps) => {
  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Add new whisky</Text>
      </View>
    </SafeWithHeader>
  );
};

Whisky.navigationOptions = {
  title: 'Add whisky',
};

export default Whisky;
