import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { View, Text, H3, Button, Icon } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import Logo from '../../components/Logo/Logo';
import SafeWithoutHeader from '../../components/Pages/SafeWithoutHeader';

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'flex-start',
    paddingBottom: 30,
    paddingTop: 30,
    width: '90%',
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
  startContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  top: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

type WelcomeProps = NavigationInjectedProps;

interface WelcomeState {
  topAnim: Animated.Value;
  bottomAnim: Animated.Value;
}

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  private static navigationOptions = {
    header: null,
    title: 'Start',
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
    const { navigation } = this.props;

    return (
      <ImageBackground
        source={require('./Scotland.jpg')}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <SafeWithoutHeader style={styles.startContainer}>
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
            <Button
              iconLeft
              primary
              block
              style={{ marginBottom: 16 }}
              onPress={() => navigation.navigate('Login')}
            >
              <Icon name="mail" />
              <Text>Continue with Email</Text>
            </Button>
            <Button iconLeft info block style={{ marginBottom: 16 }}>
              <Icon type="FontAwesome5" name="facebook-f" />
              <Text>Login with Facebook</Text>
            </Button>
            <Button light transparent full onPress={() => navigation.navigate('SignUp')}>
              <Text>New here? Create an account</Text>
            </Button>
          </Animated.View>
        </SafeWithoutHeader>
      </ImageBackground>
    );
  }
}

export default Welcome;
