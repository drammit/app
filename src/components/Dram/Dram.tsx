import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardItem, Body, Text, Left, Button, Right } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';

import { getDram } from '../../store/entities/drams';
import { getWhisky } from '../../store/entities/whiskies';
import { getUser } from '../../store/entities/users';
import { getDistillery } from '../../store/entities/distilleries';
import { dispatch } from '../../store/store';

import Rating from './Rating';
import Image from './Image';
import Slainte from './Slainte';
import Comment from './Comment';
import Message from '../Message/Message';
import Avatar from '../User/Avatar';
import UsernameLink from '../User/UsernameLink';
import DistilleryNameLink from '../Distillery/NameLink';
import WhiskyNameLink from '../Whisky/NameLink';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  date: {
    color: colors.grey,
    fontSize: 14,
  },
  slainteList: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
    marginTop: 8,
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

  const slainte = false;

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
      {dram.image ? (
        <CardItem cardBody>
          <Image uri={dram.image} />
        </CardItem>
      ) : null}
      {dram.message ? (
        <CardItem>
          <Body>
            <Text style={{ marginTop: dram.image ? 8 : 0 }}>
              {dram.message}
            </Text>
          </Body>
        </CardItem>
      ) : null}
      <CardItem bordered>
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

          <View style={styles.slainteList}>
            <Slainte style={{ marginRight: 6 }} height={16} />
            <UsernameLink user={user} />
            <UsernameLink user={user} />
          </View>
        </Body>
      </CardItem>
      <CardItem cardBody style={styles.buttonContainer}>
        <Button
          first
          style={{
            ...styles.button,
            borderColor: colors.grey5,
            borderRightWidth: 1,
          }}
          full
          transparent
          onPress={() => navigation.navigate('DramDetails')}
        >
          <Slainte active={slainte} />
          <Text style={{ color: slainte ? colors.deepOrange : colors.grey1 }}>Slàinte</Text>
        </Button>
        <Button
          style={styles.button}
          full
          transparent
          onPress={() => navigation.navigate('DramDetails', { id: dram.id, comment: true })}
        >
          <Comment />
          <Text style={{ color: colors.grey2 }}>Comment</Text>
        </Button>
      </CardItem>
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
