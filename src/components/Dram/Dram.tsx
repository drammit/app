import React from 'react';
import { Card, CardItem, Body, Text, Button } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

type DramProps = NavigationInjectedProps;

const Dram = ({ navigation }: DramProps) => (
  <Card>
    <CardItem>
      <Body>
        <Text>
          Some content for this Dram
        </Text>
        <Text>
          Some content for this Dram
        </Text>
        <Text>
          Some content for this Dram
        </Text>
      </Body>
    </CardItem>
    <CardItem>
      <Button onPress={() => navigation.navigate('DramDetails')}>
        <Text>Go to details</Text>
      </Button>
    </CardItem>
  </Card>
);

export default withNavigation(Dram);
