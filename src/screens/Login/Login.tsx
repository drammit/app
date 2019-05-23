import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import TextInput from '../../components/Form/TextInput';
import ErrorMessage from '../../components/Form/ErrorMessage';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  errorMessage: {
    color: colors.red,
    marginTop: 12,
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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email address or username is required'),
  password: Yup.string()
    .min(6, 'Password you entered is too short')
    .required('Password is required'),
});

type LoginProps = NavigationInjectedProps;

class Login extends React.Component<LoginProps> {
  private static navigationOptions = {
    title: 'Login',
  };

  private passwordRef = React.createRef<any>();

  public onSubmit(values: any, { setSubmitting, setStatus }: FormikActions<any>) {
    setStatus();

    setTimeout(
      () => {
        setStatus(new Error('Testing out error'));
        setSubmitting(false);
      },
      1000,
    );
  }

  public render() {
    const { navigation } = this.props;

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={this.onSubmit}
          validationSchema={LoginSchema}
        >
          {props => (
            <View style={styles.container}>
              <TextInput
                name="email"
                icon="person"
                formikProps={props}
                placeholder="Email address or username"
                returnKeyType="next"
                textContentType="emailAddress"
                autoFocus
                onSubmitEditing={() => {
                  if (this.passwordRef.current) this.passwordRef.current._root.focus();
                }}
              />
              <TextInput
                name="password"
                icon="unlock"
                setRef={this.passwordRef}
                placeholder="Password"
                formikProps={props}
                secureTextEntry
                returnKeyType="send"
                textContentType="password"
                onSubmitEditing={props.isSubmitting ? () => undefined : props.handleSubmit}
              />
              <Button
                disabled={props.isSubmitting}
                block
                style={styles.loginButton}
                onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
              >
                <Text>Sign In</Text>
              </Button>
              {props.status && (<ErrorMessage>{props.status.message}</ErrorMessage>)}
              <Button transparent style={styles.forgotButton}>
                <Text>Forgot password?</Text>
              </Button>
            </View>
          )}
        </Formik>
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
