import React from 'react';
import { View, Body, Text, H1, Content } from 'native-base';

import ProfileCard from '../User/ProfileCard';

const Welcome = () => (
  <Content padder scrollEnabled={false} style={{ padding: 12 }}>
    <View style={{ marginTop: 24, marginBottom: 34 }}>
      <H1 style={{ marginBottom: 6 }}>
        Hey there!
      </H1>
      <H1>
        Welcome to Drammit
      </H1>
    </View>
    <Body>
      <Text>
        With Drammit you can keep track of and rate the whiskies you drink.{'\n'}
        {'\n'}
        And follow what other's are tasting, for instance the creator of Drammit:
      </Text>
    </Body>
    <ProfileCard
      style={{ marginTop: 34 }}
      id={19}
    />
  </Content>
);

export default Welcome;
