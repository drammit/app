import React from 'react';
import { Body, Card, CardItem, Content, Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Message from '../../components/Message/Message';

import { getDistillery } from '../../store/entities/distilleries';
import { getCountry } from '../../store/entities/countries';
import { getRegion } from '../../store/entities/regions';

import { paramFromInstance } from '../../core/storeInstances';

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

  if (
    distillery instanceof Error
    || country instanceof Error
    || region instanceof Error
  ) {
    let message = '';

    if (distillery instanceof Error) message = distillery.message;
    if (country instanceof Error) message = country.message;
    if (region instanceof Error) message = region.message;

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          <Message error>{`Something went wrong:\n${message}`}</Message>
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
