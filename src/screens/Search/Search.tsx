import React, { useCallback, useEffect, useState } from 'react';
import { View, Item, Icon, Input, Content, Text, Tabs, Tab } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { useDebounce } from 'use-debounce';

import SafeWithSlimHeader from '../../components/Pages/SafeWithSlimHeader';

import colors from '../../config/colors';

type TimelineProps = NavigationInjectedProps;

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(
    () => {
      if (debouncedSearch.length > 3) {
        const result = new Promise((resolve) => {
          setTimeout(() => resolve(debouncedSearch), 2000);
        });

        let cancelCall: any = () => undefined;
        const cancel = new Promise(resolve => cancelCall = resolve);

        Promise.race([result, cancel])
          .then((results) => {
            // if canceled
            if (!results) return;

            console.log('Result', results);
          });

        return cancelCall;
      }
    },
    [debouncedSearch],
  );

  const onChangeTab = useCallback(
    (tab) => {
      setPage(tab.i);
    },
    [],
  );

  return (
    <SafeWithSlimHeader style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.green,
          paddingBottom: 12,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <Item
          style={{
            backgroundColor: colors.white,
            paddingBottom: 6,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 6,
          }}
        >
          <Icon active name="search" />
          <Input
            style={{ height: 22 }}
            placeholder="Search..."
            clearButtonMode="always"
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </Item>
      </View>
      <Tabs page={page} onChangeTab={onChangeTab}>
        <Tab heading="All" />
        <Tab heading="Whisky" />
        <Tab heading="User" />
        <Tab heading="Distillery" />
      </Tabs>
      <Content>
        <Text>{search}</Text>
      </Content>
    </SafeWithSlimHeader>
  );
};

Search.navigationOptions = {
  header: null,
};

export default Search;
