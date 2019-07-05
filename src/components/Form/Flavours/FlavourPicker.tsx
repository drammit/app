import React, { useCallback, useState } from 'react';
import {
  Spinner,
  Text,
  View,
  Content,
  ListItem,
  List,
  Right,
  Switch,
  Body,
  Left,
  Icon,
  Separator,
  ActionSheet,
} from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../Pages/SafeWithHeader';
import SearchBar from '../SearchBar';
import Tag from './Tag';

import { useFlavours } from './Flavours';

import colors from '../../../config/colors';

type FlavourPickerProps = NavigationInjectedProps;

const FlavourPicker = ({ navigation }: FlavourPickerProps) => {
  const onAdd = navigation.getParam('onAdd', () => { throw new Error('Provide onAdd'); });
  const onRemove = navigation.getParam('onRemove', () => { throw new Error('Provide onRemove'); });

  const [search, setSearch] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [flavours, isPending, isResolved] = useFlavours();

  const showFilterOptions = useCallback(
    () => {
      const categories = flavours.filter(f => f.ParentFlavourId === categoryId);

      ActionSheet.show(
        {
          cancelButtonIndex: categories.length,
          options: [...categories.map(c => c.name), 'Cancel'],
          title: categoryId ? 'Pick a sub-category' : 'Pick a category',
        },
        index => setCategoryId(categories[index].id),
      );
    },
    [flavours, categoryId],
  );

  if (!isResolved) {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder scrollEnabled={false}>
          <Spinner color={colors.grey3} />
        </Content>
      </SafeWithHeader>
    );
  }

  const pickedCategory = flavours.find(f => f.id === categoryId);
  const parentCategory = pickedCategory
    && pickedCategory.ParentFlavourId
    && flavours.find(f => f.id === pickedCategory.ParentFlavourId);
  const parentIds = (() => {
    if (parentCategory && pickedCategory) {
      return [parentCategory.id, pickedCategory.id];
    }

    if (pickedCategory) {
      return [
        pickedCategory.id,
        ...flavours.filter(f => f.ParentFlavourId === pickedCategory.id).map(f => f.id),
      ];
    }

    return [];
  })();

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
        <SearchBar value={search} debounce={10} onChange={setSearch} />
      </View>
      {!isResolved
        ? (
          <Content padder scrollEnabled={false}>
            <Spinner color={colors.grey3} />
          </Content>
        )
        : (
          <>
            {(!pickedCategory || pickedCategory.ParentFlavourId === null) && (
              <List>
                <ListItem noBorder icon noIndent onPress={showFilterOptions}>
                  <Left>
                    <Icon active name="menu" />
                  </Left>
                  <Body>
                    <Text>Filter by {categoryId ? 'sub-category' : 'category'}</Text>
                  </Body>
                </ListItem>
              </List>
            )}
            <Content scrollEnabled>
              {!pickedCategory && (
                <>
                  <Separator bordered>
                    <Text>Most Used</Text>
                  </Separator>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      padding: 4,
                    }}
                  >
                    <Text>Paar tags hier</Text>
                  </View>
                </>
              )}
              <Separator bordered>
                <Text>
                  {!pickedCategory ? 'All Characteristics' : 'Characteristics of '}
                  {parentCategory && `${parentCategory.name} > `}
                  {pickedCategory && pickedCategory.name}
                </Text>
              </Separator>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 4,
                }}
              >
                {flavours
                  .filter(f => f.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                  .filter((f) => {
                    // if all categories
                    if (!categoryId) return true;
                    // if in selected parent
                    if (parentIds.indexOf(f.ParentFlavourId) > -1) return true;
                    // if selection itself
                    if (pickedCategory && f.id === pickedCategory.id) return true;
                    if (parentCategory && f.id === parentCategory.id) return true;
                    return false;
                  })
                  .map(f => <Tag key={f.id} flavour={f} />)}
              </View>
            </Content>
          </>
        )}
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
