import React, { useState } from 'react';
import { Content, View, Button, Text } from 'native-base';
import { Formik, FormikActions } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

import { changeAvatar } from '../../store/api/profile';
import { getCurrentUser } from '../../store/selectors/user';

import { fileFromURI } from '../../core/files';
import createAvatarUrl from '../../core/avatarUrl';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import ImagePicker from '../../components/Form/ImagePicker';
import { updateAvatar } from '../../store/actions/profile';

interface FormProps {
  avatar: string;
}

const SettingsAvatar = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const avatarUri = createAvatarUrl(user.avatar, 90);
  const [width, setWidth] = useState<number>(200);

  const onSubmit = (values: FormProps, { setSubmitting }: FormikActions<FormProps>) => {
    setSubmitting(true);

    changeAvatar(values.avatar !== '' ? fileFromURI(values.avatar) : undefined)
      .then((avatar) => {
        setSubmitting(false);
        dispatch(updateAvatar(avatar));
        Alert.alert('Avatar updated successfully');
      });
  };

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content
        padder
        scrollEnabled={false}
        contentContainerStyle={{
          padding: 24,
        }}
      >
        <View
          style={{ width: '100%', alignItems: 'center' }}
          onLayout={e => setWidth(e.nativeEvent.layout.width)}
        >
          <Formik
            onSubmit={onSubmit}
            initialValues={{ avatar: avatarUri }}
          >
            {props => (
              <>
                <ImagePicker
                  name="avatar"
                  size={width}
                  formikProps={props}
                  placeholder="Choose Profile Picture"
                />
                <Button
                  style={{ marginTop: 24 }}
                  block
                  onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
                  disabled={avatarUri === props.values.avatar || props.isSubmitting}
                >
                  <Text>Save Changes</Text>
                </Button>
              </>
            )}
          </Formik>
        </View>
      </Content>
    </SafeWithHeader>
  );
};

SettingsAvatar.navigationOptions = {
  title: 'Change Avatar',
};

export default SettingsAvatar;
