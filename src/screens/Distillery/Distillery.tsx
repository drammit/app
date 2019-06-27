import React from 'react';
import { Card, CardItem, Content, Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

import { getDistillery } from '../../store/entities/distilleries';
import { getCountry } from '../../store/entities/countries';
import { getRegion } from '../../store/entities/regions';

import { errorComponent, paramFromInstance } from '../../core/storeInstances';

type DistilleryProps = NavigationInjectedProps;

const Distillery = ({ navigation }: DistilleryProps) => {
  const id: null | number = navigation.getParam('id', null);

  if (!id) return null;

  const distillery: StoreDistillery = getDistillery(id);
  const country: StoreCountry = getCountry(paramFromInstance(distillery, 'CountryId'));
  const region: StoreRegion = getRegion(paramFromInstance(distillery, 'RegionId'));

  if (!distillery) {
    return null;
  }

  const error = errorComponent([distillery, country, region]);

  if (
    distillery instanceof Error
    || country instanceof Error
    || region instanceof Error
  ) {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          {error}
        </Content>
      </SafeWithHeader>
    );
  }

  return (
    <SafeWithHeader>
      <Content padder>
        <Card>
          <CardItem header>
            <Text>{distillery.name}</Text>
          </CardItem>
        </Card>
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
