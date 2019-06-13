import React from 'react';
import { View, Text, Button, Content } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import * as Yup from 'yup';
import { Formik, FormikActions } from 'formik';
import { StyleSheet } from 'react-native';

import TextInput from '../../components/Form/TextInput';
import ErrorMessage from '../../components/Form/ErrorMessage';
import ImagePicker from '../../components/Form/ImagePicker';
import SafeWithHeader from '../../components/Pages/SafeWithHeader';

import { userExists, registerUser } from '../../store/api/login';

import { fileFromURI } from '../../core/files';

import { dispatch } from '../../store/store';
import { login } from '../../store/actions/auth';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  form: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 15,
    marginTop: 15,
  },
  inputs: {
    flexGrow: 1,
    width: 'auto',
  },
  intro: {
    lineHeight: 24,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 24,
  },
});

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[A-Za-z0-9_.-]+$/, 'You can only use letters, numbers and _ or . in your username')
    .required('Username is required'),
});

type SignUpContinuedProps = NavigationInjectedProps;

class SignUpContinued extends React.Component<SignUpContinuedProps> {
  private static navigationOptions = {
    title: 'Personal Information',
  };

  private fullNamedRef = React.createRef<any>();

  private onSubmit = (values: any, { setSubmitting, setStatus, resetForm }: FormikActions<any>) => {
    const { navigation } = this.props;

    setStatus();

    userExists(values.username)
      .then((exists) => {
        setSubmitting(false);

        if (exists) throw new Error(`Username '${values.username}' is already in use`);

        const email = navigation.getParam('email');
        const password = navigation.getParam('password');

        return registerUser(
          email,
          password,
          values.username,
          values.fullName,
          fileFromURI(values.avatar),
        );
      })
      .then((registered) => {
        if (!registered) throw new Error('Something went wrong while registering.');

        resetForm();
        dispatch(login());
      })
      .catch((e) => {
        setStatus(e);
        setSubmitting(false);
      });
  }

  public render() {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Formik
          initialValues={{ username: '', fullName: '' }}
          onSubmit={this.onSubmit}
          validationSchema={SignupSchema}
        >
          {props => (
            <Content padder>
              <Text style={styles.intro}>
                Almost done! Tell us a bit about yourself.
              </Text>
              <View style={styles.form}>
                <View style={styles.image}>
                  <ImagePicker
                    name="avatar"
                    formikProps={props}
                    placeholder="Choose Profile Picture"
                  />
                </View>
                <View style={styles.inputs}>
                  <TextInput
                    name="username"
                    formikProps={props}
                    placeholder="Pick your username"
                    returnKeyType="next"
                    textContentType="username"
                    keyboardType="email-address"
                    autoCorrect={false}
                    onSubmitEditing={() => {
                      if (this.fullNamedRef.current) this.fullNamedRef.current._root.focus();
                    }}
                  />
                  <TextInput
                    name="fullName"
                    formikProps={props}
                    setRef={this.fullNamedRef}
                    placeholder="Full name (optional)"
                    returnKeyType="send"
                    textContentType="name"
                    autoCorrect={false}
                    onSubmitEditing={props.isSubmitting ? () => undefined : props.handleSubmit}
                  />
                </View>
              </View>
              {props.status && (<ErrorMessage>{props.status.message}</ErrorMessage>)}
              <Button
                block
                style={styles.submitButton}
                disabled={props.isSubmitting}
                onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
              >
                <Text>Complete Sign Up</Text>
              </Button>
            </Content>
          )}
        </Formik>
      </SafeWithHeader>
    );
  }
}

export default SignUpContinued;
