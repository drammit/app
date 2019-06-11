import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardItem, Body, Text, Left, Button } from 'native-base';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';

import { getCurrentUser } from '../../store/selectors/user';
import { getDram } from '../../store/entities/drams';
import { getWhisky } from '../../store/entities/whiskies';
import { getUser, getUsers } from '../../store/entities/users';
import { getDistillery } from '../../store/entities/distilleries';
import { slainteDram } from '../../store/actions/dram';

import Rating from './Rating';
import Image from './Image';
import IconSlainte from './IconSlainte';
import IconComment from './IconComment';
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

interface DramProps extends NavigationInjectedProps {
  id: number;
}

type CommentWithUser = DramCommentShape & { user: StoreUser };
type SlainteWithUser = DramSlainteShape & { user: StoreUser };

const Dram = ({
  id,
  navigation,
}: DramProps) => {
  const dispatch = useDispatch();
  const currentUser: StoreCurrentUser = useSelector(getCurrentUser);
  const dram: StoreDram = useSelector((state: StoreShape) => getDram(id)(state, dispatch));
  const onSlainte = useCallback(() => dispatch(slainteDram(id, currentUser.id)), [id, currentUser]);
  const users = useSelector((state: StoreShape) => getUsers(state));
  const selectUser = useCallback((UserId: number) => users[UserId], [users]);

  const whisky: StoreWhisky = useSelector(
    (state: StoreShape) => dram && !(dram instanceof Error)
      ? getWhisky(dram.WhiskyId)(state, dispatch)
      : undefined,
  );
  const user: StoreUser = useSelector(
    (state: StoreShape) => dram && !(dram instanceof Error)
      ? getUser(dram.UserId)(state, dispatch)
      : undefined,
  );
  const distillery: StoreDistillery = useSelector(
    (state: StoreShape) => whisky && !(whisky instanceof Error)
      ? getDistillery(whisky.DistilleryId)(state, dispatch)
      : undefined,
  );
  const slaintes: SlainteWithUser[] = dram && !(dram instanceof Error)
    ? dram.slaintes.map((s: DramSlainteShape) => ({
      ...s,
      user: selectUser(s.UserId),
    }))
    : [];
  const comments: CommentWithUser[] = dram && !(dram instanceof Error)
    ? dram.comments.map((c: DramCommentShape) => ({
      ...c,
      user: selectUser(c.UserId),
    }))
    : [];

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
    let message = '';

    if (dram instanceof Error) message = dram.message;
    if (user instanceof Error) message = user.message;
    if (whisky instanceof Error) message = whisky.message;
    if (distillery instanceof Error) message = distillery.message;

    return (
      <Card>
        <CardItem>
          <Body>
            <Message error>{`Something went wrong:\n${message}`}</Message>
          </Body>
        </CardItem>
      </Card>
    );
  }

  const dramSlaintes = slaintes.filter(s => s.user && !(s.user instanceof Error));
  const slainte = dramSlaintes.some(s => s.UserId === currentUser.id);

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
          <Image aspectRatio={16 / 9} uri={dram.image} />
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
      <CardItem bordered={dramSlaintes.length === 0}>
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
      {dramSlaintes.length > 0 && (
        <CardItem bordered>
          <Body>
            <View style={styles.slainteList}>
              <IconSlainte style={{ marginRight: 6 }} height={16} />
              {dramSlaintes.map(s => <UsernameLink key={s.UserId} user={(s.user as UserShape)} />)}
            </View>
          </Body>
        </CardItem>
      )}
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
          onPress={onSlainte}
        >
          <IconSlainte active={slainte} />
          <Text style={{ color: slainte ? colors.deepOrange : colors.grey1 }}>Slàinte</Text>
        </Button>
        <Button
          style={styles.button}
          full
          transparent
          onPress={() => navigation.navigate('DramDetails', { id: dram.id, comment: true })}
        >
          <IconComment height={18} />
          <Text style={{ color: colors.grey2 }}>Comment</Text>
        </Button>
      </CardItem>
    </Card>
  );
};

export default withNavigation(Dram);
