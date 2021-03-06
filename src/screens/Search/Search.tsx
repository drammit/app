import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Content, Tabs, Tab, Spinner, Text, Button } from 'native-base';
import { useDispatch } from 'react-redux';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import SafeWithSlimHeader from '../../components/Pages/SafeWithSlimHeader';
import SearchBar from '../../components/Form/SearchBar';
import SearchResults from '../../components/Search/Results';

import colors from '../../config/colors';

import { receiveSearchResults } from '../../store/actions/search';
import { searchQuery } from '../../store/api/search';
import { NavigationInjectedProps } from 'react-navigation';

function tabToFilter(tab: number): SearchFilter {
  switch (tab) {
    case 2:
      return 'user';
    case 1:
      return 'distillery';
    case 0:
    default:
      return 'whisky';
  }
}

function filterToPage(filter: SearchFilter): number {
  return ['whisky', 'distillery', 'user'].indexOf(filter);
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

const Search = ({ navigation }: NavigationInjectedProps) => {
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
            page: 1,
            search: action.search,
          };
        case 'SET_RESULTS':
          return {
            ...state,
            isEnd: action.results.length < 20,
            isLoading: false,
            results: state.page === 1
              ? action.results
              : [
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
      filter: 'whisky',
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

  useEffect(
    () => {
      if (localState.search.length > 2) {
        localDispatch({ type: 'FETCH_SEARCH' });

        const result = searchQuery(localState.search, localState.filter, localState.page);

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
    [localState.search, localState.filter, localState.page, dispatch],
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
      {localState.results.length === 0 && localState.search.length > 3
        ? (
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text note>No results for "{localState.search}"</Text>
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
      {localState.isEnd && localState.filter === 'whisky' && (
        <Button
          full
          light
          onPress={() => navigation.navigate('AddWhisky')}
        >
          <Text>Cannot find the whisky? Tap to add.</Text>
        </Button>
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
        <SearchBar
          value={localState.search}
          debounce={300}
          onChange={text => localDispatch({ type: 'SET_SEARCH', search: text })}
        />
      </View>
      <Tabs
        page={filterToPage(localState.filter)}
        onChangeTab={onChangeTab}
        tabBarActiveTextColor={colors.green}
      >
        <Tab heading="Whisky">{searchResults}</Tab>
        <Tab heading="Distillery">{searchResults}</Tab>
        <Tab heading="User">{searchResults}</Tab>
      </Tabs>
    </SafeWithSlimHeader>
  );
};

Search.navigationOptions = {
  header: null,
};

export default Search;
