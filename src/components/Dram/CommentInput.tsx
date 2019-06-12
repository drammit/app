import React, { useEffect, useState } from 'react';
import { Item, Input, Form, View } from 'native-base';
import { Keyboard, Dimensions } from 'react-native';

import IconComment from './IconComment';

import colors from '../../config/colors';

interface CommentInput {
  autoFocus?: boolean;
}

const CommentInput = ({ autoFocus = false }: CommentInput) => {
  const [keyboardOffset, setKeyboardOffset] = useState<number>(0);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardOffset(e.endCoordinates.height - 34);
      },
    );

    const hideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => { setKeyboardOffset(0); },
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  });

  return (
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
      <Item last style={{ borderBottomWidth: 0 }}>
        <View style={{ marginRight: 5 }}>
          <IconComment height={18} />
        </View>
        <Input placeholder="Add comment" autoFocus={autoFocus} />
      </Item>
    </Form>
  );
};

export default CommentInput;
