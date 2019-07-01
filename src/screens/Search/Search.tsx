import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Item, Icon, Input, Content, Tabs, Tab, Spinner, Text } from 'native-base';
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';

import SafeWithSlimHeader from '../../components/Pages/SafeWithSlimHeader';
import SearchResults from '../../components/Search/Results';

import colors from '../../config/colors';

import { receiveSearchResults } from '../../store/actions/search';
import { searchQuery } from '../../store/api/search';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

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

interface ClearSearch {
  type: 'CLEAR_RESULTS';
}

interface SetPage {
  type: 'SET_PAGE';
  page: number;
}

type SearchActions = SetSearch | SetFilter | SetResults | FetchSearch | ClearSearch | SetPage;

const Search = () => {
  const dispatch = useDispatch();

  const [localState, localDispatch] = useReducer(
    (state, action: SearchActions) => {
      switch (action.type) {
        case 'SET_FILTER':
          return {
            ...state,
            filter: action.filter,
            isEnd: false,
            page: 1,
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
            isEnd: action.results.length === 0,
            isLoading: false,
            results: [
              ...state.results,
              ...action.results,
            ],
          };
        case 'FETCH_SEARCH':
          return {
            ...state,
            isLoading: true,
          };
        case 'SET_PAGE':
          return {
            ...state,
            isLoading: true,
            page: action.page,
          };
        case 'CLEAR_RESULTS':
          return {
            ...state,
            isEnd: false,
            isLoading: false,
            page: 1,
            results: [],
          };
        default:
          return state;
      }
    },
    {
      filter: 'all',
      isEnd: false,
      isLoading: false,
      page: 1,
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
      if (debouncedSearch.length > 2) {
        localDispatch({ type: 'FETCH_SEARCH' });

        const result = searchQuery(debouncedSearch, localState.filter, localState.page);

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

      // if no search, clear results
      localDispatch({ type: 'CLEAR_RESULTS' });
    },
    [debouncedSearch, localState.filter, localState.page, dispatch],
  );

  const onChangeTab = useCallback(
    (tab: { i: number }) => goToTab(tabToFilter(tab.i)),
    [goToTab],
  );

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (localState.isLoading || localState.isEnd) return;

      const { layoutMeasurement, contentSize, contentOffset } = e.nativeEvent;

      const bottom = layoutMeasurement.height + contentOffset.y;

      if (bottom > (contentSize.height - layoutMeasurement.height)) {
        localDispatch({ type: 'SET_PAGE', page: localState.page + 1 });
      }
    },
    [localState.isLoading, localState.isEnd, localState.page],
  );

  useEffect(() => localDispatch({ type: 'SET_SEARCH', search: 'Ardbeg' }), []);

  const searchResults = localState.isLoading && localState.page === 1 ? (
    <Content padder scrollEnabled={false}>
      <Spinner color={colors.grey3} />
    </Content>
  ) : (
    // @ts-ignore
    <Content
      style={{ flex: 1 }}
      scrollEnabled={localState.results.length > 0}
      onScroll={onScroll}
    >
      {localState.results.length === 0 && debouncedSearch.length > 3
        ? (
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text note>No results for "{debouncedSearch}"</Text>
          </View>
        ) : (
          <>
            <SearchResults
              results={localState.results}
              filter={localState.filter}
              goToTab={goToTab}
            />
            {localState.isLoading && <Spinner color={colors.grey3} />}
          </>
        )}
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
