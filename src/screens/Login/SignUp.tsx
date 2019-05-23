import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Item, Icon, Input, Button } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  loginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    padding: 15,
  },
  submitButton: {
    marginTop: 24,
  },
});

type SignUpProps = NavigationInjectedProps;

class SignUp extends React.Component<SignUpProps> {
  private static navigationOptions = {
    title: 'Sign Up',
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
          <Button block style={styles.submitButton}>
            <Text>Sign Up</Text>
          </Button>
        </View>
        <View style={styles.loginContainer}>
          <Text>Already have an account?</Text>
          <Button transparent onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
          </Button>
        </View>
      </SafeWithHeader>
    );
  }
}

export default SignUp;
