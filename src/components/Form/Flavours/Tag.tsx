import React from 'react';
import { Icon, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

import colors from '../../../config/colors';

interface FlavourTagProps {
  active?: boolean;
  flavour: FlavourShape;
  onPress: (id: number) => void;
}

const FlavourTag = ({ active = false, flavour, onPress }: FlavourTagProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(flavour.id)}
      style={{
        alignItems: 'center',
        backgroundColor: active ? flavour.color : colors.grey5,
        borderLeftColor: flavour.color,
        borderLeftWidth: active ? 0 : 6,
        flexDirection: 'row',
        flexGrow: 0,
        flexShrink: 1,
        margin: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 6,
      }}
    >
      {active && (
        <Icon
          style={{
            color: '#ffffff',
            fontSize: 16,
            marginRight: 3,
          }}
          name="close-circle"
        />
      )}
      <Text
        style={{ color: active ? '#ffffff' : '#000000' }}
      >
        {flavour.name}
      </Text>
    </TouchableOpacity>
  );
};

export default FlavourTag;
