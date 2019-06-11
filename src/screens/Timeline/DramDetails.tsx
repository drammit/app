import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Content } from 'native-base';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Dram from '../../components/Dram/Dram';

type DramDetailsProps = NavigationInjectedProps;

const DramDetails = ({ navigation }: DramDetailsProps) => {
  const DramId = navigation.getParam('id');
  const focusComments = Boolean(navigation.getParam('comment'));

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content padder>
        <Dram compact={false} id={DramId} />
      </Content>
    </SafeWithHeader>
  );
};

export default DramDetails;
