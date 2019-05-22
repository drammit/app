import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

class Welcome extends React.Component {
  private static navigationOptions = {
    header: null,
    title: 'Welcome',
  };

  // check current login status

  public render() {
    return (
      <ImageBackground
        source={require('./Scotland.jpg')}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </ImageBackground>
    );
  }
}

export default Welcome;
