import React, { useCallback } from 'react';
import { Icon, Text } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../../../config/colors';

const styles = StyleSheet.create({
  baseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 1,
    marginBottom: 6,
    marginRight: 12,
    marginTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 6,
  },
  icon: {
    color: '#ffffff',
    fontSize: 16,
    marginRight: 3,
  },
});

interface FlavourTagProps {
  active?: boolean;
  flavour: FlavourShape;
  onPress: (id: number) => void;
}

const FlavourTag = ({ active = false, flavour, onPress }: FlavourTagProps) => {
  const onPick = useCallback(() => onPress(flavour.id), [flavour.id, onPress]);

  return (
    <TouchableOpacity
      onPress={onPick}
      style={{
        ...styles.baseContainer,
        backgroundColor: active ? flavour.color : colors.grey5,
        borderLeftColor: flavour.color,
        borderLeftWidth: active ? 0 : 6,
      }}
    >
      {active && (
        <Icon style={styles.icon} name="close-circle" />
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
