import React from 'react';
import { StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { View, Text, H3, Button, Icon } from 'native-base';

import Logo from '../../components/Logo/Logo';

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '90%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  introContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  introText: {
    lineHeight: 30,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  top: {
    flex: 1,
    justifyContent: 'flex-end',
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
          <View style={styles.top}>
            <Logo width={Dimensions.get('window').width * 0.8} />
            <View style={styles.introContainer}>
              <Text>——</Text>
              <H3 style={styles.introText}>
                Keep track of and rate the whiskies you drink
              </H3>
              <Text>——</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <Button iconLeft block>
              <Icon name="arrow-back" />
              <Text>Login with Email</Text>
            </Button>
            <Button iconLeft block>
              <Icon name="facebook" />
              <Text>Login with Facebook</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Welcome;
