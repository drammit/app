import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Content, View, Text } from 'native-base';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Dram from '../../components/Dram/Dram';
import CommentInput from '../../components/Dram/CommentInput';

type DramDetailsProps = NavigationInjectedProps;

const DramDetails = ({ navigation }: DramDetailsProps) => {
  const DramId = navigation.getParam('id');
  const focusComments = navigation.getParam('comment', false);

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content padder>
        <Dram compact={false} id={DramId} />
      </Content>
      <CommentInput autoFocus={focusComments} />
    </SafeWithHeader>
  );
};

DramDetails.navigationOptions = {
  title: 'Dram',
};

export default DramDetails;
