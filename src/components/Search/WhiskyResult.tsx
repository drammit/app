import React from 'react';
import { Body, Icon, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';

import whiskyName from '../../core/whiskyName';
import { paramFromInstance } from '../../core/storeInstances';

interface WhiskyResultProps extends NavigationInjectedProps {
  id: number;
}

const WhiskyResult = ({ id, navigation }: WhiskyResultProps) => {
  const whisky: StoreWhisky = getWhisky(id);
  const distillery: StoreDistillery = getDistillery(paramFromInstance(whisky, 'WhiskyId'));

  if (!whisky || !distillery) {
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

  if (whisky instanceof Error || distillery instanceof Error) {
    return null;
  }

  const name = whiskyName(whisky, distillery);
  const distilleryName = distillery.name;
  const image = whisky.image;

  return (
    <ListItem
      avatar={!!image}
      onPress={() => navigation.navigate('Whisky', { id })}
    >
      {image && (
        <Left>
          <Thumbnail small source={{ uri: image }} />
        </Left>
      )}
      <Body>
        <Text>{name}</Text>
        <Text note>by {distilleryName}, {whisky.abv}% Vol.</Text>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default withNavigation(WhiskyResult);
