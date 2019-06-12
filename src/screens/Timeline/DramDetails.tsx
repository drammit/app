import React, { useRef, useCallback } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Content } from 'native-base';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Dram from '../../components/Dram/Dram';
import CommentInput from '../../components/Dram/CommentInput';

type DramDetailsProps = NavigationInjectedProps;

const DramDetails = ({ navigation }: DramDetailsProps) => {
  const contentRef = useRef<any>();

  const DramId = navigation.getParam('id');
  const focusComments = navigation.getParam('comment', false);

  const scrollToEnd = useCallback(
    () => setTimeout(() => contentRef.current.wrappedInstance.scrollToEnd(), 0),
    [contentRef],
  );

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content ref={contentRef} padder>
        <Dram compact={false} id={DramId} />
      </Content>
      <CommentInput
        id={DramId}
        autoFocus={focusComments}
        onKeyboardOpen={scrollToEnd}
        onSubmit={scrollToEnd}
        onFocus={scrollToEnd}
      />
    </SafeWithHeader>
  );
};

DramDetails.navigationOptions = {
  title: 'Dram',
};

export default DramDetails;
