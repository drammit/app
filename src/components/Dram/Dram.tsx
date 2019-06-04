import React from 'react';
import { Card, CardItem, Body, Text, Button } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getDram } from '../../store/entities/drams';
import { dispatch } from '../../store/store';

import Message from '../Message/Message';

interface DramProps extends NavigationInjectedProps {
  id: DramShape['id'];
  dram: StoreDram;
}

const Dram = ({ id, dram, navigation }: DramProps) => {
  if (!dram) {
    // @todo: Placeholders
    return null;
  }

  if (dram instanceof Error) {
    return (
      <Card>
        <CardItem>
          <Body>
            <Message error>{`Something went wrong:\n${dram.message}`}</Message>
          </Body>
        </CardItem>
      </Card>
    );
  }

  return (
    <Card>
      <CardItem>
        <Body>
          <Text>
            {dram.rating}
          </Text>
          <Text>
            {dram.name}
          </Text>
          <Text>
            {dram.message}
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
}

const mapStateToProps = (state: StoreShape, ownProps: DramProps) => ({
  dram: getDram(ownProps.id)(state, dispatch),
});

export default connect(mapStateToProps)(withNavigation(Dram));
