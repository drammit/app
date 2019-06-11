import React from 'react';
import { Text } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector, useDispatch} from 'react-redux';

import { getDistillery } from '../../store/entities/distilleries';

interface NameLinkProps extends NavigationInjectedProps {
  whisky: WhiskyShape;
  size?: number;
  style?: any;
}

const NameLink = ({ style = {}, size = 16, whisky, navigation }: NameLinkProps) => {
  const dispatch = useDispatch();
  const distillery: StoreDistillery = useSelector(
    (state: StoreShape) => getDistillery(whisky.DistilleryId)(state, dispatch),
  );
  const name = !distillery
    ? ''
    : [distillery.name, whisky.name, whisky.bottlingSerie].join(' ');

  return (
    <Text
      style={{
        fontSize: size,
        ...style,
      }}
      onPress={() => navigation.navigate('Whisky', { id: whisky.id })}
    >
      {name}
    </Text>
  );
};

export default withNavigation(NameLink);
