import React from 'react';
import { View, Text, Button } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import * as Yup from 'yup';
import { Formik, FormikActions } from 'formik';
import { StyleSheet } from 'react-native';

import TextInput from '../../components/Form/TextInput';
import ErrorMessage from '../../components/Form/ErrorMessage';
import ImagePicker from '../../components/Form/ImagePicker';

const styles = StyleSheet.create({
  container: {
    padding: 15,
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

  private onSubmit = (values: any, { setSubmitting, setStatus }: FormikActions<any>) => {
    const { navigation } = this.props;

    setStatus();

    console.log(values);
  }

  public render() {
    return (
      <Formik
        initialValues={{ username: '', fullName: '' }}
        onSubmit={this.onSubmit}
        validationSchema={SignupSchema}
      >
        {props => (
          <View style={styles.container}>
            <Text style={styles.intro}>
              Almost done! Tell us a bit about yourself.
            </Text>
            <ImagePicker placeholder="Choose Profile Picture" />
            <TextInput
              name="username"
              autoFocus
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
            <Button
              block
              style={styles.submitButton}
              disabled={props.isSubmitting}
              onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
            >
              <Text>Complete Sign Up</Text>
            </Button>
            {props.status && (<ErrorMessage>{props.status.message}</ErrorMessage>)}
          </View>
        )}
      </Formik>
    );
  }
}

export default SignUpContinued;
