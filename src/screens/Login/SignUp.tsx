import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Item, Input, Button } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import TextInput from '../../components/Form/TextInput';
import ErrorMessage from '../../components/Form/ErrorMessage';

import { emailExists } from './api';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  intro: {
    lineHeight: 24,
    marginBottom: 16,
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

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password you entered is too short')
    .required('Password is required'),
});

type SignUpProps = NavigationInjectedProps;

class SignUp extends React.Component<SignUpProps> {
  private static navigationOptions = {
    title: 'Sign Up',
  };

  private passwordRef = React.createRef<any>();

  private onSubmit = (values: any, { setSubmitting, setStatus }: FormikActions<any>) => {
    const { navigation } = this.props;

    setStatus();

    emailExists(values.email)
      .then((exists) => {
        setSubmitting(false);

        if (exists) {
          setStatus(new Error('Email address already in use'));
        } else {
          navigation.navigate('SignUpContinued', values);
        }
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
          validationSchema={SignupSchema}
        >
          {props => (
            <View style={styles.container}>
              <Text style={styles.intro}>
                First, provide your email address and a desired password.
              </Text>
              <TextInput
                name="email"
                icon="mail"
                formikProps={props}
                placeholder="Email address or username"
                returnKeyType="next"
                textContentType="emailAddress"
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
                style={styles.submitButton}
                disabled={props.isSubmitting}
                onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
              >
                <Text>Continue</Text>
              </Button>
              {props.status && (<ErrorMessage>{props.status.message}</ErrorMessage>)}
            </View>
          )}
        </Formik>
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
