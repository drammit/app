import React from 'react';
import { Text } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { getDistillery } from '../../store/entities/distilleries';

import whiskyName from '../../core/whiskyName';
import { paramFromInstance } from '../../core/storeInstances';

interface NameLinkProps extends NavigationInjectedProps {
  whisky: StoreWhisky;
  size?: number;
  style?: any;
  disableLink?: boolean;
}

const NameLink = ({
  style = {},
  size = 16,
  whisky,
  navigation,
  disableLink = false,
}: NameLinkProps) => {
  const distillery: StoreDistillery = getDistillery(paramFromInstance(whisky, 'DistilleryId'));
  const name = whiskyName(whisky, distillery);

  return (
    <Text
      style={{
        fontSize: size,
        ...style,
      }}
      onPress={disableLink
        ? undefined
        : () => navigation.navigate('Whisky', { id: whisky.value.id })}
    >
      {name}
    </Text>
  );
};

export default withNavigation(NameLink);
