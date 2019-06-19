import React, { useRef } from 'react';
import { Content, Button, Text } from 'native-base';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-native';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import TextInput from '../../components/Form/TextInput';
import { updatePassword } from '../../store/api/profile';
import ErrorMessage from '../../components/Form/ErrorMessage';

const PasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Password you entered is too short')
    .required('Enter your new password'),
  oldPassword: Yup.string()
    .required('Enter your current password'),
});

interface FormProps {
  oldPassword: string;
  newPassword: string;
}

const SettingsPassword = () => {
  const newPasswordRef = useRef<any>();

  const onSubmit = (
    values: FormProps,
    { setSubmitting, resetForm, setStatus }: FormikActions<FormProps>,
  ) => {
    setStatus();
    setSubmitting(true);

    updatePassword(values.oldPassword, values.newPassword)
      .then(() => {
        setSubmitting(false);
        resetForm();
        Alert.alert('Password updated');
      })
      .catch((e) => {
        setStatus(e);
        setSubmitting(false);
      });
  };

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content
        padder
        scrollEnabled={false}
      >
        <Formik
          validationSchema={PasswordSchema}
          onSubmit={onSubmit}
          initialValues={{
            newPassword: '',
            oldPassword: '',
          }}
        >
          {props => (
            <>
              <TextInput
                name="oldPassword"
                placeholder="Current password"
                formikProps={props}
                secureTextEntry
                textContentType="password"
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (newPasswordRef.current) newPasswordRef.current._root.focus();
                }}
              />

              <TextInput
                name="newPassword"
                setRef={newPasswordRef}
                placeholder="New password"
                formikProps={props}
                secureTextEntry
                textContentType="password"
                returnKeyType="send"
                onSubmitEditing={props.isSubmitting ? () => undefined : props.handleSubmit}
              />

              {props.status && (<ErrorMessage>{props.status.message}</ErrorMessage>)}

              <Button
                style={{ marginTop: 24 }}
                block
                onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
                disabled={props.isSubmitting}
              >
                <Text>Update password</Text>
              </Button>
            </>
          )}
        </Formik>
      </Content>
    </SafeWithHeader>
  );
};

SettingsPassword.navigationOptions = {
  title: 'Change Password',
};

export default SettingsPassword;
