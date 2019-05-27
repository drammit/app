import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Content } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import TextInput from '../../components/Form/TextInput';
import ErrorMessage from '../../components/Form/ErrorMessage';

import { dispatch } from '../../store/store';
import { login } from '../../store/actions/auth';

import { authenticate } from './api';

const styles = StyleSheet.create({
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

  private onSubmit = (values: any, { setSubmitting, setStatus, resetForm }: FormikActions<any>) => {
    setStatus();

    authenticate(values.email, values.password)
      .then(() => {
        resetForm();
        dispatch(login());
      })
      .catch((e) => {
        setStatus(e);
        setSubmitting(false);
      });
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
            <Content padder>
              <TextInput
                name="email"
                icon="person"
                formikProps={props}
                placeholder="Email address or username"
                returnKeyType="next"
                textContentType="username"
                keyboardType="email-address"
                autoCorrect={false}
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
                block
                style={styles.loginButton}
                disabled={props.isSubmitting}
                onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
              >
                <Text>Sign In</Text>
              </Button>
              {props.status && (<ErrorMessage>{props.status.message}</ErrorMessage>)}
              <Button transparent style={styles.forgotButton}>
                <Text>Forgot password?</Text>
              </Button>
            </Content>
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
