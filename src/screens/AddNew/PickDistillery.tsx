import React, { useState } from 'react';
import { View } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import colors from '../../config/colors';
import SearchBar from '../../components/Form/SearchBar';

const PickDistillery = ({}: NavigationInjectedProps) => {
  const [search, setSearch] = useState<string>('');

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.green,
          paddingBottom: 12,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <SearchBar
          placeholder="Search for a distillery..."
          value={search}
          debounce={300}
          onChange={text => setSearch(text)}
        />
      </View>
    </SafeWithHeader>
  );
};

PickDistillery.navigationOptions = {
  title: 'Choose Distillery',
};

export default PickDistillery;
