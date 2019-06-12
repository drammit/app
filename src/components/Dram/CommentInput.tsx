import React, { useEffect, useState, useCallback } from 'react';
import { Item, Input, Form, View } from 'native-base';
import { Keyboard } from 'react-native';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';

import IconComment from './IconComment';

import colors from '../../config/colors';
import ErrorMessage from '../Form/ErrorMessage';

interface CommentInput {
  autoFocus?: boolean;
}

const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .required('Comment cannot be empty'),
});

const CommentInput = ({ autoFocus = false }: CommentInput) => {
  const [keyboardOffset, setKeyboardOffset] = useState<number>(0);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardOffset(e.endCoordinates.height - 34);
      },
    );

    const willHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => { setKeyboardOffset(0); },
    );

    const hideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => { setKeyboardOffset(0); },
    );

    return () => {
      showListener.remove();
      willHideListener.remove();
      hideListener.remove();
    };
  });

  const onSubmit = useCallback(
    (values: { comment: string }, { resetForm }: FormikActions<any>) => {
      resetForm();
    },
    [],
  );

  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={onSubmit}
      validationSchema={CommentSchema}
    >
      {props => (
        <Form
          style={{
            backgroundColor: colors.white,
            borderTopColor: colors.grey4,
            borderTopWidth: 1,
            transform: [{
              translateY: keyboardOffset * -1,
            }],
          }}
        >
          {props.touched.comment && props.errors.comment ? (
            <View style={{ paddingLeft: 12, paddingRight: 12 }}>
              <ErrorMessage>{props.errors.comment}</ErrorMessage>
            </View>
          ) : null}
          <Item last style={{ borderBottomWidth: 0 }}>
            <View style={{ marginRight: 5 }}>
              <IconComment height={18} />
            </View>
            <Input
              placeholder="Add comment"
              value={props.values.comment}
              autoFocus={autoFocus}
              returnKeyType="send"
              onSubmitEditing={props.handleSubmit}
              onChangeText={props.handleChange('comment')}
              blurOnSubmit={false}
            />
          </Item>
        </Form>
      )}
    </Formik>
  );
};

export default CommentInput;
