import React from 'react';
import { Body, Icon, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { getDistillery } from '../../store/entities/distilleries';
import { getCountry } from '../../store/entities/countries';
import { getRegion } from '../../store/entities/regions';

import { paramFromInstance } from '../../core/storeInstances';

interface DistilleryResultProps extends NavigationInjectedProps {
  id: number;
}

const DistilleryResult = ({ id, navigation }: DistilleryResultProps) => {
  const distilleryInstance: StoreDistillery = getDistillery(id);
  const country: StoreCountry = getCountry(paramFromInstance(distilleryInstance, 'CountryId'));
  const region: StoreRegion = getRegion(paramFromInstance(distilleryInstance, 'RegionId'));

  if (distilleryInstance.isPending) {
    return (
      <ListItem avatar>
        <Body>
          <Text />
          <Text note />
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  if (distilleryInstance.error) return null;

  const distillery = distilleryInstance.value;

  const distilleryName = distillery.name;
  const image = distillery.image;
  const location = [
    region.isResolved && region.value.name,
    country.isResolved && country.value.name,
  ]
    .filter(i => !!i)
    .join(', ');

  return (
    <ListItem
      avatar={!!image}
      onPress={() => navigation.navigate('Distillery', { id })}
    >
      {image && (
        <Left>
          <Thumbnail small source={{ uri: image }} />
        </Left>
      )}
      <Body>
        <Text>{distilleryName}</Text>
        {location ? <Text note>from {location}</Text> : <Text note>...</Text>}
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default withNavigation(DistilleryResult);
