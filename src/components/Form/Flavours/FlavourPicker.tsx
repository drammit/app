import React, { useCallback, useEffect, useState } from 'react';
import {
  Spinner,
  Text,
  View,
  Content,
  ListItem,
  List,
  Body,
  Left,
  Icon,
  Separator,
  ActionSheet, Button,
} from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../Pages/SafeWithHeader';
import SearchBar from '../SearchBar';
import Tag from './Tag';

import useFlavours from './useFlavours';

import colors from '../../../config/colors';

type FlavourPickerProps = NavigationInjectedProps;

const FlavourPicker = ({ navigation }: FlavourPickerProps) => {
  const mostUsed = navigation.getParam('mostUsed', []);
  const initialPicked = navigation.getParam('picked', []);
  const onChange = navigation.getParam('onChange', false);

  const [search, setSearch] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [picked, setPicked] = useState<number[]>(initialPicked);

  const mostUsedWithoutPicked = mostUsed.filter((m: number) => picked.indexOf(m) === -1);

  const onAddFlavour = useCallback(
    (id: number) => {
      setPicked([...picked, id]);
    },
    [picked],
  );

  const onRemoveFlavour = useCallback(
    (id: number) => {
      setPicked(picked.filter(p => p !== id));
    },
    [picked],
  );

  useEffect(
    () => {
      if (!onChange) return;
      onChange(picked);
    },
    [picked],
  );

  const [flavours, isPending, isResolved] = useFlavours();

  const showFilterOptions = useCallback(
    () => {
      const categories = flavours.filter(f => f.ParentFlavourId === categoryId);

      ActionSheet.show(
        {
          cancelButtonIndex: categories.length,
          options: [
            ...categories.map(c => c.name),
            'Cancel',
          ],
          title: categoryId ? 'Pick a sub-category' : 'Pick a category',
        },
        (index) => {
          if (!categories[index]) return;
          setCategoryId(categories[index].id);
        },
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
            {(parentCategory || pickedCategory) && (
              <View style={{ padding: 8, flexDirection: 'row' }}>
                {parentCategory && (
                  <Button
                    iconRight
                    small
                    style={{
                      backgroundColor: parentCategory.color,
                      marginRight: 4,
                    }}
                    onPress={() => setCategoryId(null)}
                  >
                    <Text>{parentCategory.name}</Text>
                    <Icon name="close-circle" />
                  </Button>
                )}
                {pickedCategory && (
                  <Button
                    iconRight
                    small
                    style={{
                      backgroundColor: pickedCategory.color,
                    }}
                    onPress={() => pickedCategory
                      && setCategoryId(parentCategory ? parentCategory.id : null)}
                  >
                    <Text>{pickedCategory.name}</Text>
                    <Icon name="close-circle" />
                  </Button>
                )}
              </View>
            )}
            <Content scrollEnabled>
              {picked.length > 0 && (
                <>
                  <Separator bordered>
                    <Text>Picked Flavours</Text>
                  </Separator>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      padding: 4,
                      paddingLeft: 10,
                    }}
                  >
                    {picked
                      .map((p) => {
                        const flavour = flavours.find(f => f.id === p);

                        if (!flavour) return null;

                        return (
                          <Tag
                            active
                            key={flavour.id}
                            flavour={flavour}
                            onPress={onRemoveFlavour}
                          />
                        );
                      })}
                  </View>
                </>
              )}
              {!pickedCategory && mostUsedWithoutPicked.length > 0 && (
                <>
                  <Separator bordered>
                    <Text>Most Used</Text>
                  </Separator>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      padding: 4,
                      paddingLeft: 10,
                    }}
                  >
                    {mostUsedWithoutPicked
                      .map((m: number) => {
                        const flavour = flavours.find(f => f.id === m);

                        if (!flavour) return null;

                        return (
                          <Tag
                            key={flavour.id}
                            flavour={flavour}
                            onPress={onAddFlavour}
                          />
                        );
                      })}
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
                  paddingLeft: 10,
                }}
              >
                {flavours
                  .filter(f => picked.indexOf(f.id) === -1)
                  .filter(f => search === ''
                    || f.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
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
                  .map(f => (
                    <Tag
                      key={f.id}
                      flavour={f}
                      onPress={onAddFlavour}
                    />
                  ))}
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
