import React from 'react';
import { View, Text } from 'native-base';

import UsernameLink from '../User/UsernameLink';

interface CommentProps {
  comment: string;
  createdAt: Date;
  user: StoreUser;
  disableLink?: boolean;
}

const Comment = ({ comment, user, disableLink }: CommentProps) => {
  if (!user || user instanceof Error) return null;

  return (
    <View style={{ marginBottom: 5 }}>
      <Text>
        <UsernameLink disableLink={disableLink} user={user} />
        <Text>{' '}</Text>
        <Text>{comment}</Text>
      </Text>
    </View>
  );
};

export default Comment;