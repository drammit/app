import React from 'react';
import { Spinner, Text, View, Content } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../Pages/SafeWithHeader';
import SearchBar from './SearchBar';

import { useFlavours } from './Flavours';

import colors from '../../config/colors';

type FlavourPickerProps = NavigationInjectedProps;

const FlavourPicker = ({ navigation }: FlavourPickerProps) => {
  const onAdd = navigation.getParam('onAdd', () => { throw new Error('Provide onAdd'); });
  const onRemove = navigation.getParam('onRemove', () => { throw new Error('Provide onRemove'); });

  const [flavours, isPending, isResolved] = useFlavours();

  if (!isResolved) {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder scrollEnabled={false}>
          <Spinner color={colors.grey3} />
        </Content>
      </SafeWithHeader>
    );
  }

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.green,
          paddingBottom: 8,
          paddingLeft: 6,
          paddingRight: 6,
        }}
      >
        <SearchBar value="" debounce={500} onChange={console.log} />
      </View>
      <Content padder scrollEnabled={isResolved}>
      {!isResolved
        ? (
            <Spinner color={colors.grey3} />
        )
        : (
          <>
            {flavours.map(f => <Text key={f.id}>{f.name}</Text>)}
          </>
        )}
      </Content>
    </SafeWithHeader>
  );
};

FlavourPicker.navigationOptions = {
  headerStyle: {
    backgroundColor: colors.green,
    borderBottomColor: colors.green,
  },
  title: 'Flavour Profile',
};

export default FlavourPicker;
