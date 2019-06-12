import React from 'react';
import { Item, Input, Form } from 'native-base';

import IconComment from './IconComment';

import colors from '../../config/colors';

interface CommentInput {
  autoFocus?: boolean;
}

const CommentInput = ({ autoFocus = false }: CommentInput) => (
  <Form style={{ borderTopWidth: 1, borderTopColor: colors.grey4 }}>
    <Item last>
      <IconComment height={18} />
      <Input placeholder="Add comment" autoFocus={autoFocus} />
    </Item>
  </Form>
);

export default CommentInput;
