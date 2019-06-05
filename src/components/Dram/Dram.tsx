import React from 'react';
import { Card, CardItem, Body, Text, Button } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getDram } from '../../store/entities/drams';
import { dispatch } from '../../store/store';

import Rating from './Rating';
import Message from '../Message/Message';

interface DramBaseProps {
  id: number;
}

interface DramProps extends DramBaseProps, NavigationInjectedProps {
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
          <Rating rating={dram.rating} />
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

const mapStateToProps = (state: StoreShape, ownProps: DramBaseProps) => ({
  dram: getDram(ownProps.id)(state, dispatch),
  // @todo get whisky and user
});

export default connect(mapStateToProps)(withNavigation(Dram));
