import React from 'react';
import { Text, View } from 'native-base';

import colors from '../../../config/colors';

interface FlavourTagProps {
  flavour: FlavourShape;
}

const FlavourTag = ({ flavour }: FlavourTagProps) => {
  return (
    <View
      style={{
        backgroundColor: colors.grey5,
        borderLeftColor: flavour.color,
        borderLeftWidth: 6,
        flexGrow: 0,
        flexShrink: 1,
        margin: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 6,
      }}
    >
      <Text>{flavour.name}</Text>
    </View>
  );
};

export default FlavourTag;
