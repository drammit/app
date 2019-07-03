import React from 'react';
import { Body, Card, CardItem, Content, H2, Left, Text, Thumbnail } from 'native-base';

import DistilleryName from '../Distillery/NameLink';
import SafeWithHeader from '../Pages/SafeWithHeader';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';
import { getCountry } from '../../store/entities/countries';
import { getRegion } from '../../store/entities/regions';
import { getCategory } from '../../store/entities/categories';
import { getBottler } from '../../store/entities/bottlers';

import { errorComponent, paramFromInstance } from '../../core/storeInstances';
import whiskyName from '../../core/whiskyName';
import distilleryLocation from '../../core/distilleryLocation';

interface WhiskyCardProps {
  id: number;
  disableLink?: boolean;
}

const WhiskyCard = ({ id, disableLink = false }: WhiskyCardProps) => {
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

  if (!whiskyInstance.isResolved || !distilleryInstance.isResolved) {
    return null;
  }

  const error = errorComponent([whiskyInstance, distilleryInstance]);

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
    <Card>
      <CardItem header bordered>
        <Left>
          {whisky.image ? <Thumbnail small source={{ uri: whisky.image }} /> : null}
          <Body>
            <H2>{name}</H2>
            <DistilleryName
              disableLink={disableLink}
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
  );
};

export default WhiskyCard;
