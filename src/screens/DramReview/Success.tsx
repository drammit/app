import React from 'react';
import { Button, Content, H1, H3, Text, View } from 'native-base';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import SlainteAnimation from '../../components/Slainte/Animation';

import { navigate } from '../../core/navigation';
import whiskyName from '../../core/whiskyName';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';
import { paramFromInstance } from '../../core/storeInstances';

interface SuccessReviewProps {
  id: number;
}

const SuccessReview = ({ id }: SuccessReviewProps) => {
  const whiskyInstance = getWhisky(id);
  const distilleryInstance = getDistillery(paramFromInstance(whiskyInstance, 'DistilleryId'));

  const name = whiskyName(whiskyInstance, distilleryInstance);

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content
        padder
        contentContainerStyle={{
          alignItems: 'center',
          flex: 1,
          flexGrow: 1,
          justifyContent: 'space-around',
        }}
      >
        <View>
          <H1 style={{ textAlign: 'center', marginTop: 24, marginBottom: 24 }}>Slàinte Mhath!</H1>
          <H3 style={{ textAlign: 'center', marginBottom: 24 }}>Enjoy your {name}</H3>
        </View>

        <View style={{ marginTop: 24, marginBottom: 24, width: '80%' }}>
          <SlainteAnimation />
        </View>

        <Button block onPress={() => navigate('Drams')}>
          <Text>View on Timeline</Text>
        </Button>
      </Content>
    </SafeWithHeader>
  );
};

export default SuccessReview;
