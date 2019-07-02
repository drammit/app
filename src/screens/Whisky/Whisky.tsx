import React, { useCallback, useEffect, useReducer } from 'react';
import {
  Body,
  Card,
  CardItem,
  Content,
  H2,
  Left,
  Text,
  Thumbnail,
  Button,
  View,
  Icon,
} from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import DistilleryName from '../../components/Distillery/NameLink';
import Rating from '../../components/Dram/Rating';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';
import { getCountry } from '../../store/entities/countries';
import { getRegion } from '../../store/entities/regions';
import { getCategory } from '../../store/entities/categories';
import { getBottler } from '../../store/entities/bottlers';

import { errorComponent, paramFromInstance } from '../../core/storeInstances';
import whiskyName from '../../core/whiskyName';
import distilleryLocation from '../../core/distilleryLocation';
import { getWhiskyScore } from '../../store/api/whisky';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/selectors/user';
import { getWishList } from '../../store/entities/wishList';
import { getCollection } from '../../store/entities/collections';
import { addToList, removeFromList } from '../../store/actions/userLists';

interface WhiskyState {
  isLoading: boolean;
  isResolved: boolean;
  avg: number | undefined;
  user: number | undefined;
}

interface FetchStart {
  type: 'FETCH_START';
}

interface FetchSuccess {
  type: 'FETCH_SUCCESS';
  avg: number;
  user: number;
}

interface FetchFailed {
  type: 'FETCH_FAILED';
}

type WhiskyAction = FetchStart | FetchSuccess | FetchFailed;

const reducer = (state: WhiskyState, action: WhiskyAction): WhiskyState => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        avg: action.avg,
        isLoading: false,
        isResolved: true,
        user: action.user,
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

type WhiskyDetailsProps = NavigationInjectedProps;

const WhiskyDetails = ({ navigation }: WhiskyDetailsProps) => {
  const id: null | number = navigation.getParam('id', null);

  if (!id) return null;

  const loginUser = useSelector(getCurrentUser);
  const storeDispatch = useDispatch();

  const wishlistInstance = getWishList(loginUser.id);
  const wishList = wishlistInstance.value;

  const collectionInstance = getCollection(loginUser.id);
  const collection = collectionInstance.value;

  const whiskyInstance: StoreWhisky = getWhisky(id);
  const whisky = whiskyInstance.value;

  const distilleryInstance: StoreDistillery = getDistillery(
    paramFromInstance(whiskyInstance, 'DistilleryId'),
  );
  const distillery = distilleryInstance.value;

  const countryInstance: StoreCountry = getCountry(
    paramFromInstance(distilleryInstance, 'CountryId'),
  );
  const regionInstance: StoreRegion = getRegion(
    paramFromInstance(distilleryInstance, 'RegionId'),
  );

  const categoryInstance: StoreCategory = getCategory(
    paramFromInstance(whiskyInstance, 'CategoryId'),
  );
  const category = categoryInstance.value;

  const bottlerInstance: StoreBottler = getBottler(
    paramFromInstance(whiskyInstance, 'BottlerId'),
  );
  const bottler = bottlerInstance.value;

  const name = whiskyName(whiskyInstance, distilleryInstance);
  const location = distilleryLocation(regionInstance, countryInstance);

  const [state, dispatch] = useReducer(
    reducer,
    {
      avg: undefined,
      isLoading: false,
      isResolved: false,
      user: undefined,
    },
  );

  useEffect(
    () => {
      if (!state.isResolved && !state.isLoading) {
        dispatch({ type: 'FETCH_START' });

        getWhiskyScore(id)
          .then(({ avg, user }) => dispatch({ type: 'FETCH_SUCCESS', avg, user }))
          .catch(() => dispatch({ type: 'FETCH_FAILED' }));
      }
    },
    [],
  );

  useEffect(
    () => {
      // update the page header if doesn't match
      if (
        whiskyInstance.isResolved
        && !whiskyInstance.error
        && navigation.getParam('title', '') !== name
      ) {
        navigation.setParams({
          title: name,
        });
      }
    },
    [whisky, whiskyInstance],
  );

  const inWishList = wishList.items.indexOf(id) > -1;
  const inCollection = collection.items.indexOf(id) > -1;

  const wishListAction = useCallback(
    () => {
      if (inWishList) {
        storeDispatch(removeFromList('wish-list', loginUser.id, id));
      } else {
        storeDispatch(addToList('wish-list', loginUser.id, id));
      }
    },
    [inWishList, loginUser.id, id],
  );

  const collectionAction = useCallback(
    () => {
      if (inCollection) {
        storeDispatch(removeFromList('collection', loginUser.id, id));
      } else {
        storeDispatch(addToList('collection', loginUser.id, id));
      }
    },
    [inCollection, loginUser.id, id],
  );

  if (!whiskyInstance.isResolved) {
    return null;
  }

  const error = errorComponent([whiskyInstance]);

  if (error) {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          {error}
        </Content>
      </SafeWithHeader>
    );
  }

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Left>
              {whisky.image ? <Thumbnail small source={{ uri: whisky.image }} /> : null}
              <Body>
                <H2>{name}</H2>
                <DistilleryName
                  style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}
                  distillery={distillery}
                />
                <Text note style={{ marginBottom: 5 }}>
                  {category.name} from {location}
                </Text>
                <Text note>bottled at: {whisky.abv}% Vol.</Text>
              </Body>
            </Left>
          </CardItem>
          {whisky.year !== '' && (
            <CardItem bordered>
              <Left>
                <Body>
                  <Text note>release: {whisky.year}</Text>
                </Body>
              </Left>
            </CardItem>
          )}
          {whisky.bottlingSerie !== '' && (
            <CardItem bordered>
              <Left>
                <Body>
                  <Text note>series: {whisky.bottlingSerie}</Text>
                </Body>
              </Left>
            </CardItem>
          )}
          {bottler.id !== 2 && (
            <CardItem bordered>
              <Left>
                <Body>
                  <Text note>bottled by: {bottler.name}</Text>
                </Body>
              </Left>
            </CardItem>
          )}
        </Card>

        <Button block style={{ marginTop: 24 }}>
          <Text>Add Your Own Review</Text>
        </Button>

        {(wishlistInstance.isResolved || collectionInstance.isResolved) && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,
              marginTop: 24,
            }}
          >
            {wishlistInstance.isResolved && (
              <Button small bordered iconLeft={inWishList} onPress={wishListAction}>
                {inWishList && <Icon name="checkmark" />}
                <Text>{inWishList ? 'On Wish List' : 'Add to Wish List'}</Text>
              </Button>
            )}
            {collectionInstance.isResolved && (
              <Button small bordered iconLeft={inCollection} onPress={collectionAction}>
                {inCollection && <Icon name="checkmark" />}
                <Text>{inCollection ? 'In Your Collection' : 'Add to Your Collection'}</Text>
              </Button>
            )}
          </View>
        )}

        {state.isResolved && (state.avg || state.user) ? (
          <Card>
            <CardItem>
              {state.avg ? (
                <Left>
                  <Body>
                    <Text style={{ marginBottom: 6 }}>Average rating</Text>
                    <Rating rating={state.avg || 0} showNumber />
                  </Body>
                </Left>
              ) : null}
              {state.user ? (
                <Left>
                  <Body>
                    <Text style={{ marginBottom: 6 }}>Your rating</Text>
                    <Rating rating={state.user || 0} showNumber />
                  </Body>
                </Left>
              ) : null}
            </CardItem>
          </Card>
        ) : null}
      </Content>
    </SafeWithHeader>
  );
};

WhiskyDetails.navigationOptions = ({ navigation }: NavigationInjectedProps) => {
  const title = navigation.getParam('title', '');

  return {
    title,
  };
};

export default WhiskyDetails;
