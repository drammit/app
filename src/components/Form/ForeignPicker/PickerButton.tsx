import React from 'react';
import { Button, Icon, Text } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

export interface ForeignValue {
  id: number;
  name: string;
}

interface PickerButtonProps extends NavigationInjectedProps {
  page: string;
  placeholder: string;
  value?: ForeignValue;
  onChange: (value: ForeignValue) => void;
}

const PickerButton = ({ navigation, page, placeholder, value, onChange }: PickerButtonProps) => {
  return (
    <Button
      transparent
      onPress={() => {
        navigation.navigate(page, { onChange, value });
      }}
    >
      <Text style={{ color: '#050505' }}>
        {value ? value.name : placeholder}
      </Text>
      <Icon name="arrow-forward" />
    </Button>
  );
};

export default withNavigation(PickerButton);
