import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Item, Icon, Input, Content, Text, Tabs, Tab } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';

import SafeWithSlimHeader from '../../components/Pages/SafeWithSlimHeader';
import SearchResults from '../../components/Search/Results';

import colors from '../../config/colors';

import { receiveSearchResults } from '../../store/actions/search';
import { searchQuery } from '../../store/api/search';

function tabToFilter(tab: number): SearchFilter {
  switch (tab) {
    case 3:
      return 'distillery';
    case 2:
      return 'user';
    case 1:
      return 'whisky';
    case 0:
    default:
      return 'all';
  }
}

function filterToPage(filter: SearchFilter): number {
  return ['all', 'whisky', 'user', 'distillery'].indexOf(filter);
}

interface SetSearch {
  type: 'SET_SEARCH';
  search: string;
}

interface SetFilter {
  type: 'SET_FILTER';
  filter: SearchFilter;
}

interface SetResults {
  type: 'SET_RESULTS';
  results: SearchResult[];
}

interface FetchSearch {
  type: 'FETCH_SEARCH';
}

type SearchActions = SetSearch | SetFilter | SetResults | FetchSearch;

type TimelineProps = NavigationInjectedProps;

const Search = () => {
  const dispatch = useDispatch();

  const [localState, localDispatch] = useReducer(
    (state, action: SearchActions) => {
      switch (action.type) {
        case 'SET_FILTER':
          return {
            ...state,
            filter: action.filter,
            results: [],
          };
        case 'SET_SEARCH':
          return {
            ...state,
            search: action.search,
          };
        case 'SET_RESULTS':
          return {
            ...state,
            isLoading: false,
            results: action.results,
          };
        case 'FETCH_SEARCH':
          return {
            ...state,
            isLoading: true,
          };
        default:
          return state;
      }
    },
    {
      filter: 'all',
      isLoading: false,
      results: [],
      search: '',
    },
  );

  const goToTab = useCallback(
    (filter: SearchFilter) => {
      localDispatch({
        filter,
        type: 'SET_FILTER',
      });
    },
    [localDispatch],
  );

  const [debouncedSearch] = useDebounce(localState.search, 300);

  useEffect(
    () => {
      if (debouncedSearch.length > 3) {
        localDispatch({ type: 'FETCH_SEARCH' });

        const result = searchQuery(debouncedSearch, localState.filter);

        let cancelCall: any = () => undefined;
        const cancel = new Promise(resolve => cancelCall = resolve);

        Promise.race([result, cancel])
          .then((response: any) => {
            // if canceled
            if (!response) return;

            dispatch(receiveSearchResults(response));

            localDispatch({
              results: response.results,
              type: 'SET_RESULTS',
            });
          });

        return cancelCall;
      }
    },
    [debouncedSearch, localState.filter, dispatch],
  );

  useEffect(
    () => {
      localDispatch({ type: 'SET_SEARCH', search: 'ardbeg' });
    },
    [],
  );

  const onChangeTab = useCallback(
    (tab: { i: number }) => goToTab(tabToFilter(tab.i)),
    [goToTab],
  );

  const searchResults = (
    <Content style={{ flex: 1 }}>
      <SearchResults
        results={localState.results}
        filter={localState.filter}
        goToTab={goToTab}
      />
    </Content>
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
            value={localState.search}
            autoCorrect={false}
            onChangeText={text => localDispatch({ type: 'SET_SEARCH', search: text })}
          />
        </Item>
      </View>
      <Tabs
        page={filterToPage(localState.filter)}
        onChangeTab={onChangeTab}
      >
        <Tab heading="All">{searchResults}</Tab>
        <Tab heading="Whisky">{searchResults}</Tab>
        <Tab heading="User">{searchResults}</Tab>
        <Tab heading="Distillery">{searchResults}</Tab>
      </Tabs>
    </SafeWithSlimHeader>
  );
};

Search.navigationOptions = {
  header: null,
};

export default Search;
