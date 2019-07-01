import React, { useEffect } from 'react';
import { Body, Card, CardItem, Content, H2, Left, Text, Thumbnail } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import DistilleryName from '../../components/Distillery/NameLink';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';
import { getCountry } from '../../store/entities/countries';
import { getRegion } from '../../store/entities/regions';
import { getCategory } from '../../store/entities/categories';
import { getBottler } from '../../store/entities/bottlers';

import { errorComponent, paramFromInstance } from '../../core/storeInstances';
import whiskyName from '../../core/whiskyName';
import distilleryLocation from '../../core/distilleryLocation';

type WhiskyDetailsProps = NavigationInjectedProps;

const WhiskyDetails = ({ navigation }: WhiskyDetailsProps) => {
  const id: null | number = navigation.getParam('id', null);

  if (!id) return null;

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
