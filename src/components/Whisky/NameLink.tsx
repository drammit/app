import React from 'react';
import { Text } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getDistillery } from '../../store/entities/distilleries';
import { dispatch } from '../../store/store';

interface NameLinkBaseProps {
  whisky: WhiskyShape;
  size?: number;
  style?: any;
}

interface NameLinkProps extends NameLinkBaseProps, NavigationInjectedProps {
  distillery: StoreDistillery;
}

const NameLink = ({ style = {}, size = 16, whisky, distillery, navigation }: NameLinkProps) => {
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

const mapStateToProps = (state: StoreShape, ownProps: NameLinkBaseProps) => {
  const { whisky } = ownProps;

  return {
    distillery: getDistillery(whisky.DistilleryId)(state, dispatch),
  };
};

export default connect(mapStateToProps)(withNavigation(NameLink));
