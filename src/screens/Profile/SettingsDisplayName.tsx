import React from 'react';
import { Content, Button, Text } from 'native-base';
import { Formik, FormikActions } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

import { changeName } from '../../store/api/profile';
import { getCurrentUser } from '../../store/selectors/user';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import TextInput from '../../components/Form/TextInput';

import { updateName } from '../../store/actions/profile';

interface FormProps {
  name: string;
}

const SettingsDisplayName = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  const onSubmit = (
    values: FormProps,
    { setSubmitting, setFieldValue }: FormikActions<FormProps>,
  ) => {
    setSubmitting(true);

    changeName(values.name)
      .then(() => {
        setSubmitting(false);
        setFieldValue('name', values.name);
        dispatch(updateName(values.name));
        Alert.alert('Display name updated successfully');
      });
  };

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content
        padder
        scrollEnabled={false}
      >
        <Formik
          onSubmit={onSubmit}
          initialValues={{ name: user.name }}
        >
          {props => (
            <>
              <TextInput
                name="name"
                formikProps={props}
                placeholder="Full name (optional)"
                returnKeyType="send"
                textContentType="name"
                autoCorrect={false}
                onSubmitEditing={props.isSubmitting ? () => undefined : props.handleSubmit}
              />
              <Button
                style={{ marginTop: 24 }}
                block
                onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
                disabled={user.name === props.values.name || props.isSubmitting}
              >
                <Text>Save Changes</Text>
              </Button>
            </>
          )}
        </Formik>
      </Content>
    </SafeWithHeader>
  );
};

SettingsDisplayName.navigationOptions = {
  title: 'Change Display Name',
};

export default SettingsDisplayName;
