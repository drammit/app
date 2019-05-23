import React from 'react';
import { StyleSheet, ImageBackground, Dimensions, SafeAreaView } from 'react-native';
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
        <SafeAreaView style={{ flex: 1 }}>
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
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Welcome;
