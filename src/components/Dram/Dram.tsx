import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Body, Text, Left } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';

import { getDram } from '../../store/entities/drams';
import { getWhisky } from '../../store/entities/whiskies';
import { getUser } from '../../store/entities/users';
import { getDistillery } from '../../store/entities/distilleries';
import { dispatch } from '../../store/store';

import Rating from './Rating';
import Message from '../Message/Message';
import Avatar from '../User/Avatar';
import UsernameLink from '../User/UsernameLink';
import DistilleryNameLink from '../Distillery/NameLink';
import WhiskyNameLink from '../Whisky/NameLink';

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
  distillery: StoreDistillery;
}

const Dram = ({ id, dram, user, whisky, distillery, navigation }: DramProps) => {
  if (!dram || !user || !whisky || !distillery) {
    // @todo: Placeholders
    return null;
  }

  if (
    dram instanceof Error
    || user instanceof Error
    || whisky instanceof Error
    || distillery instanceof Error
  ) {
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
          <WhiskyNameLink
            size={18}
            style={{
              fontWeight: '500',
              marginBottom: 6,
              marginTop: 6,
            }}
            whisky={whisky}
          />
          <DistilleryNameLink distillery={distillery} />
        </Body>
      </CardItem>
      {/*<CardItem bordered>*/}
      {/*  <Button onPress={() => navigation.navigate('DramDetails')}>*/}
      {/*    <Text>Go to details</Text>*/}
      {/*  </Button>*/}
      {/*</CardItem>*/}
    </Card>
  );
};

const mapStateToProps = (state: StoreShape, ownProps: DramBaseProps) => {
  const dram = getDram(ownProps.id)(state, dispatch);
  const whisky = dram && !(dram instanceof Error)
    ? getWhisky(dram.WhiskyId)(state, dispatch) : undefined;
  const user = dram && !(dram instanceof Error)
    ? getUser(dram.UserId)(state, dispatch) : undefined;
  const distillery = whisky && !(whisky instanceof Error)
    ? getDistillery(whisky.DistilleryId)(state, dispatch) : undefined;

  return {
    distillery,
    dram,
    user,
    whisky,
  };
};

export default connect(mapStateToProps)(withNavigation(Dram));
