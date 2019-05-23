import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { View, Text, H3, Button, Icon } from 'native-base';

import Logo from '../../components/Logo/Logo';

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'flex-start',
    paddingBottom: 30,
    paddingTop: 30,
    width: '90%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  introContainer: {
    alignItems: 'center',
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
    justifyContent: 'center',
  },
});

interface WelcomeState {
  topAnim: Animated.Value;
  bottomAnim: Animated.Value;
}

class Welcome extends React.Component<{}, WelcomeState> {
  private static navigationOptions = {
    header: null,
    title: 'Welcome',
  };

  public state = {
    bottomAnim: new Animated.Value(0),
    topAnim: new Animated.Value(0),
  };

  public componentDidMount() {
    Animated.timing(
      this.state.topAnim,
      {
        delay: 300,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        toValue: 1,
      },
    ).start();

    Animated.timing(
      this.state.bottomAnim,
      {
        delay: 800,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        toValue: 1,
      },
    ).start();
  }

  public render() {
    const { topAnim, bottomAnim } = this.state;

    return (
      <ImageBackground
        source={require('./Scotland.jpg')}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={{
              ...styles.top,
              opacity: topAnim,
              transform: [{
                translateY: topAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-40, 0],
                }),
              }],
            }}
          >
            <Logo width={Dimensions.get('window').width * 0.8} />
            <View style={styles.introContainer}>
              <Text>——</Text>
              <H3 style={styles.introText}>
                Keep track of and rate the whiskies you drink
              </H3>
              <Text>——</Text>
            </View>
          </Animated.View>
          <Animated.View
            style={{
              ...styles.bottom,
              opacity: bottomAnim,
              transform: [{
                translateY: bottomAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }),
              }],
            }}
          >
            <Button iconLeft primary full style={{ marginBottom: 16 }}>
              <Icon name="mail" />
              <Text>Continue with Email</Text>
            </Button>
            <Button iconLeft info full style={{ marginBottom: 16 }}>
              <Icon type="FontAwesome5" name="facebook-f" />
              <Text>Login with Facebook</Text>
            </Button>
            <Button light transparent full>
              <Text>New here? Create an account</Text>
            </Button>
          </Animated.View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Welcome;
