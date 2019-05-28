import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  submitButton: {
    marginTop: 24,
  },
});

type TimelineProps = NavigationInjectedProps;

class Search extends React.Component<TimelineProps> {
  private static navigationOptions = {
    title: 'Search',
  };

  public render() {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>Search</Text>
        </View>
      </SafeWithHeader>
    );
  }
}

export default Search;
