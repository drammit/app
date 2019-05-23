import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Item, Icon, Input, Button } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  forgotButton: {
    marginTop: 12,
  },
  loginButton: {
    marginTop: 24,
  },
  signupContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    padding: 15,
  },
});

type LoginProps = NavigationInjectedProps;

class Login extends React.Component<LoginProps> {
  private static navigationOptions = {
    title: 'Login',
  };

  public render() {
    const { navigation } = this.props;

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <View style={styles.container}>
          <Item>
            <Icon active name="person" />
            <Input placeholder="Email address or username" />
          </Item>
          <Item>
            <Icon active name="unlock" />
            <Input secureTextEntry placeholder="Password" />
          </Item>
          <Button block style={styles.loginButton}>
            <Text>Sign In</Text>
          </Button>
          <Button transparent style={styles.forgotButton}>
            <Text>Forgot password?</Text>
          </Button>
        </View>
        <View style={styles.signupContainer}>
          <Text>Don't have an account yet?</Text>
          <Button transparent onPress={() => navigation.navigate('SignUp')}>
            <Text>Sign up</Text>
          </Button>
        </View>
      </SafeWithHeader>
    );
  }
}

export default Login;
