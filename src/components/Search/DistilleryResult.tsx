import React from 'react';
import { Body, Icon, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { getDistillery } from '../../store/entities/distilleries';
import { getCountry } from '../../store/entities/countries';
import { getRegion } from '../../store/entities/regions';

interface DistilleryResultProps extends NavigationInjectedProps {
  id: number;
}

const DistilleryResult = ({ id, navigation }: DistilleryResultProps) => {
  const distillery: StoreDistillery = getDistillery(id);
  const country: StoreCountry = getCountry(
    distillery && !(distillery instanceof Error) ? distillery.CountryId : undefined,
  );
  const region: StoreRegion = getRegion(
    distillery && !(distillery instanceof Error) ? distillery.RegionId : undefined,
  );

  if (!distillery) {
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

  if (distillery instanceof Error) {
    return null;
  }

  const distilleryName = distillery.name;
  const image = distillery.image;
  const location = [region && region.name, country && country.name]
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
        <Text note>from {location}</Text>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default withNavigation(DistilleryResult);
