import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Body, Text, Button, Thumbnail, Left } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';

import { getDram } from '../../store/entities/drams';
import { getWhisky } from '../../store/entities/whiskies';
import { getUser } from '../../store/entities/users';
import { dispatch } from '../../store/store';

import Rating from './Rating';
import Message from '../Message/Message';
import Avatar from '../User/Avatar';
import UsernameLink from '../User/UsernameLink';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  date: {
    color: colors.grey,
    fontSize: 14,
  },
});

interface DramBaseProps {
  id: number;
}

interface DramProps extends DramBaseProps, NavigationInjectedProps {
  dram: StoreDram;
  user: StoreUser;
  whisky: StoreWhisky;
}

const Dram = ({ id, dram, user, whisky, navigation }: DramProps) => {
  if (!dram || !user || !whisky) {
    // @todo: Placeholders
    return null;
  }

  if (dram instanceof Error || user instanceof Error || whisky instanceof Error) {
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

  const headerContent = (
    <Body>
      <UsernameLink user={user} />
      <Text style={styles.date}>{distanceInWordsToNow(dram.createdAt)} ago</Text>
    </Body>
  );

  return (
    <Card>
      <CardItem>
        {user.avatar ? (
          <Left>
            {user.avatar ? <Avatar size={40} uri={user.avatar} /> : null}
            {headerContent}
          </Left>
        ) : headerContent}
      </CardItem>
      {dram.message ? (
        <CardItem>
          <Body>
            <Text>
              {dram.message}
            </Text>
          </Body>
        </CardItem>
      ) : null}
      <CardItem>
        <Body>
          <Rating rating={dram.rating} />
          <Text>
            {dram.name}
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
};

const mapStateToProps = (state: StoreShape, ownProps: DramBaseProps) => {
  const dram = getDram(ownProps.id)(state, dispatch);

  return {
    dram,
    user: dram && !(dram instanceof Error)
      ? getUser(dram.UserId)(state, dispatch) : undefined,
    whisky: dram && !(dram instanceof Error)
      ? getWhisky(dram.WhiskyId)(state, dispatch) : undefined,
  };
};

export default connect(mapStateToProps)(withNavigation(Dram));
