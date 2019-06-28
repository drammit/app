import React from 'react';
import { View, Text } from 'native-base';

import UsernameLink from '../User/UsernameLink';

interface CommentProps {
  comment: string;
  createdAt: Date;
  user: UserShape;
  disableLink?: boolean;
}

const Comment = ({ comment, user, disableLink }: CommentProps) => {
  if (!user) return null;

  return (
    <View style={{ marginBottom: 5, marginTop: 5 }}>
      <Text>
        <UsernameLink disableLink={disableLink} user={user} />
        <Text>{' '}</Text>
        <Text>{comment}</Text>
      </Text>
    </View>
  );
};

export default Comment;
