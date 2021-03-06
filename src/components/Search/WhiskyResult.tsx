import React from 'react';
import { Body, Icon, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';

import whiskyName from '../../core/whiskyName';
import { paramFromInstance } from '../../core/storeInstances';

interface WhiskyResultProps extends NavigationInjectedProps {
  id: number;
  hideDistillery?: boolean;
}

const WhiskyResult = ({ id, hideDistillery = false, navigation }: WhiskyResultProps) => {
  const whiskyInstance: StoreWhisky = getWhisky(id);
  const distilleryInstance: StoreDistillery = getDistillery(
    paramFromInstance(whiskyInstance, 'DistilleryId'),
  );
  const whisky = whiskyInstance.value;

  if (!whiskyInstance.isResolved || !distilleryInstance.isResolved) {
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

  if (whiskyInstance.error || distilleryInstance.error) {
    return null;
  }

  const name = whiskyName(whiskyInstance, distilleryInstance);
  const distilleryName = distilleryInstance.value.name;
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
        {hideDistillery
          ? <Text note>{whisky.abv}% Vol.</Text>
          : <Text note>by {distilleryName}, {whisky.abv}% Vol.</Text>}
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default withNavigation(WhiskyResult);
