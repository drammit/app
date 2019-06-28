import React, { useEffect, useReducer } from 'react';
import {
  Card,
  CardItem,
  Content,
  Left,
  Text,
  Body,
  Thumbnail,
  Spinner,
  List,
  H2,
} from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch } from 'react-redux';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import WhiskyResult from '../../components/Search/WhiskyResult';

import { getDistillery } from '../../store/entities/distilleries';
import { getCountry } from '../../store/entities/countries';
import { getRegion } from '../../store/entities/regions';
import { getPopularWhiskies } from '../../store/api/distillery';
import { extraInformation } from '../../store/actions/app';

import { errorComponent, paramFromInstance } from '../../core/storeInstances';
import distilleryLocation from '../../core/distilleryLocation';

import colors from '../../config/colors';

type DistilleryProps = NavigationInjectedProps;

interface DistilleryState {
  isLoading: boolean;
  isResolved: boolean;
  whiskies: number[];
}

interface FetchStart {
  type: 'FETCH_START';
}

interface FetchSuccess {
  type: 'FETCH_SUCCESS';
  whiskies: number[];
}

interface FetchFailed {
  type: 'FETCH_FAILED';
}

type DistilleryAction = FetchStart | FetchSuccess | FetchFailed;

const reducer = (state: DistilleryState, action: DistilleryAction): DistilleryState => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isResolved: true,
        whiskies: action.whiskies,
      };
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_FAILED':
      return {
        ...state,
        isLoading: false,
        isResolved: true,
      };
    default:
      return state;
  }
};

const Distillery = ({ navigation }: DistilleryProps) => {
  const id: null | number = navigation.getParam('id', null);

  if (!id) return null;

  const storeDispatch = useDispatch();

  const distilleryInstance: StoreDistillery = getDistillery(id);
  const countryInstance: StoreCountry = getCountry(
    paramFromInstance(distilleryInstance, 'CountryId'),
  );
  const regionInstance: StoreRegion = getRegion(paramFromInstance(distilleryInstance, 'RegionId'));
  const [state, dispatch] = useReducer(
    reducer,
    {
      isLoading: false,
      isResolved: false,
      whiskies: [],
    },
  );

  const distillery = distilleryInstance.value;

  useEffect(
    () => {
      if (distilleryInstance.isResolved && !state.isLoading && !state.isResolved) {
        dispatch({ type: 'FETCH_START' });

        getPopularWhiskies(id)
          .then((response) => {
            storeDispatch(extraInformation(response));
            dispatch({ type: 'FETCH_SUCCESS', whiskies: response.whiskies.map((w: any) => w.id) });
          })
          .catch(() => dispatch({ type: 'FETCH_FAILED' }));
      }
    },
    [distilleryInstance, state.isLoading, state.isResolved, id],
  );

  if (!distilleryInstance.isResolved) {
    return null;
  }

  const error = errorComponent([distilleryInstance, countryInstance, regionInstance]);

  if (error) {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          {error}
        </Content>
      </SafeWithHeader>
    );
  }

  const location = distilleryLocation(regionInstance, countryInstance);

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content padder>
        <Card>
          <CardItem header>
            <Left>
              {distillery.image ? <Thumbnail small source={{ uri: distillery.image }} /> : null}
              <Body>
                <H2>{distillery.name}</H2>
                {location ? <Text>Located in {location}</Text> : null}
              </Body>
            </Left>
          </CardItem>
        </Card>
        {state.isLoading && <Spinner color={colors.grey3} />}
        {state.isResolved && state.whiskies.length > 0
          ? (
            <React.Fragment>
              <Text note style={{ padding: 26, paddingBottom: 12 }}>
                Popular whiskies by {distillery.name}:
              </Text>
              <List>
                {state.whiskies.map(whiskyId => (
                  <WhiskyResult
                    key={whiskyId}
                    id={whiskyId}
                    hideDistillery
                  />
                ))}
              </List>
            </React.Fragment>
          )
          : null}
      </Content>
    </SafeWithHeader>
  );
};

Distillery.navigationOptions = ({ navigation }: NavigationInjectedProps) => {
  const title = navigation.getParam('title', '');

  return {
    title,
  };
};

export default Distillery;
