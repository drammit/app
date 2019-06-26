import React from 'react';
import { Body, Icon, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { getDistillery } from '../../store/entities/distilleries';

interface DistilleryResultProps extends NavigationInjectedProps {
  id: number;
}

const DistilleryResult = ({ id, navigation }: DistilleryResultProps) => {
  const distillery: StoreDistillery = getDistillery(id);

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
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default withNavigation(DistilleryResult);
