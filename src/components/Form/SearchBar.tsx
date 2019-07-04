import React, { useEffect, useState } from 'react';
import { Icon, Input, Item } from 'native-base';
import { useDebounce } from 'use-debounce';

import colors from '../../config/colors';

interface SearchBarProps {
  value: string;
  debounce?: number;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, debounce = 0, onChange }: SearchBarProps) => {
  const [localValue, setLocalValue] = useState<string>(value);
  const [debouncedValue] = useDebounce(localValue, debounce);

  useEffect(
    () => {
      if (value !== debouncedValue) onChange(debouncedValue);
    },
    [debouncedValue, value],
  );

  return (
    <Item
      style={{
        backgroundColor: colors.white,
        borderRadius: 4,
        flexGrow: 1,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
      }}
    >
      <Icon active name="search" />
      <Input
        style={{ height: 22 }}
        placeholder="Search..."
        clearButtonMode="always"
        value={localValue}
        autoCorrect={false}
        onChangeText={text => setLocalValue(text)}
      />
    </Item>
  );
};

export default SearchBar;
