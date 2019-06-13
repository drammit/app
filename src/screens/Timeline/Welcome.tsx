import React from 'react';
import { View, Body, Text, H1, Content, Icon } from 'native-base';

import ProfileCard from '../../components/User/ProfileCard';
import colors from '../../config/colors';
import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Logo from '../../components/Logo/Logo';

const Welcome = () => (
  <SafeWithHeader style={{ flex: 1 }}>
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
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.grey5,
        padding: 24,
        paddingBottom: 0,
      }}
    >
      <Text style={{ textAlign: 'center' }}>
        <Text style={{ fontWeight: '700' }}>Tap on search</Text> to look for a whisky you'd like to
        review or add to your collection.
      </Text>
      <Icon name="arrow-down" style={{ transform: [{ translateY: 0 }] }} />
    </View>
  </SafeWithHeader>
);

Welcome.navigationOptions = {
  headerTitle: (
    <Logo width={120} color={colors.light} />
  ),
  title: 'Welcome to Drammit',
};

export default Welcome;
