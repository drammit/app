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

import Comment from './Comment';
import Rating from './Rating';
import Image from './Image';
import IconSlainte from './IconSlainte';
import IconComment from './IconComment';
import Avatar from '../User/Avatar';
import UsernameLink from '../User/UsernameLink';
import DistilleryNameLink from '../Distillery/NameLink';
import WhiskyNameLink from '../Whisky/NameLink';

import colors from '../../config/colors';

import { paramFromInstance, errorComponent } from '../../core/storeInstances';

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
  compact?: boolean;
}

type CommentWithUser = DramCommentShape & { user: StoreUser };
type SlainteWithUser = DramSlainteShape & { user: StoreUser };

const Dram = ({
  id,
  compact,
  navigation,
}: DramProps) => {
  const dispatch = useDispatch();
  const currentUser: StoreCurrentUser = useSelector(getCurrentUser);
  const dramInstance = getDram(id);
  const onSlainte = useCallback(() => dispatch(slainteDram(id, currentUser.id)), [id, currentUser]);
  const users = useSelector((state: StoreShape) => getUsers(state));
  const selectUser = useCallback((UserId: number) => users[UserId], [users]);
  const isCompact = Boolean(compact);

  const whiskyInstance = getWhisky(paramFromInstance(dramInstance, 'WhiskyId'));
  const userInstance = getUser(paramFromInstance(dramInstance, 'UserId'));
  const distilleryInstance = getDistillery(paramFromInstance(whiskyInstance, 'DistilleryId'));

  if (
    dramInstance.isPending
    || userInstance.isPending
    || whiskyInstance.isPending
    || distilleryInstance.isPending
  ) {
    // @todo: Placeholders
    return null;
  }

  const error = errorComponent([dramInstance, userInstance, whiskyInstance, distilleryInstance]);
  if (error) return <Card><CardItem><Body>{error}</Body></CardItem></Card>;

  const dram = dramInstance.value;
  const user = userInstance.value;
  const whisky = whiskyInstance.value;
  const distillery = distilleryInstance.value;

  const slaintes: SlainteWithUser[] = dram.slaintes.map((s: DramSlainteShape) => ({
    ...s,
    user: selectUser(s.UserId),
  }));
  const comments: CommentWithUser[] = dram.comments.map((c: DramCommentShape) => ({
    ...c,
    user: selectUser(c.UserId),
  }));

  const goToDetails = () => navigation.navigate('DramDetails', { id: dram.id });
  const goToDetailsComment = () => navigation.navigate(
    'DramDetails',
    { id: dram.id, comment: true },
  );
  const dramSlaintes = slaintes
    .filter(c => c.user && c.user.isResolved && !c.user.error);
  const dramComments = comments
    .filter(c => c.user && c.user.isResolved && !c.user.error);
  const slainte = dramSlaintes.some(s => s.UserId === currentUser.id);

  const goToDetailsProps = {
    activeOpacity: 1,
    button: isCompact,
    onPress: isCompact ? goToDetails : undefined,
  };

  const headerContent = (
    <Body>
      <UsernameLink user={user} />
      <Text style={styles.date}>{distanceInWordsToNow(dram.createdAt)} ago</Text>
    </Body>
  );

  return (
    <Card>
      <CardItem {...goToDetailsProps}>
        {user.avatar ? (
          <Left>
            {user.avatar ? <Avatar size={40} uri={user.avatar} /> : null}
            {headerContent}
          </Left>
        ) : headerContent}
      </CardItem>
      {dram.image ? (
        <CardItem cardBody {...goToDetailsProps}>
          <Image aspectRatio={16 / 9} uri={dram.image} />
        </CardItem>
      ) : null}
      {dram.message ? (
        <CardItem {...goToDetailsProps}>
          <Body>
            <Text style={{ marginTop: dram.image ? 8 : 0 }}>
              {dram.message}
            </Text>
          </Body>
        </CardItem>
      ) : null}
      <CardItem bordered={dramSlaintes.length === 0} {...goToDetailsProps}>
        <Body>
          <Rating rating={dram.rating} />
          <WhiskyNameLink
            disableLink={isCompact}
            size={18}
            style={{
              fontWeight: '500',
              marginBottom: 6,
              marginTop: 6,
            }}
            whisky={whiskyInstance}
          />
          <DistilleryNameLink disableLink={isCompact} distillery={distillery} />
        </Body>
      </CardItem>
      {dramSlaintes.length > 0 && (
        <CardItem bordered {...goToDetailsProps}>
          <Body>
            <View style={styles.slainteList}>
              <IconSlainte style={{ marginRight: 6 }} height={16} />
              {dramSlaintes.map((s, index) => (
                <React.Fragment key={s.UserId}>
                  <UsernameLink user={s.user.value} />
                  {index + 1 < dramSlaintes.length ? <Text>, </Text> : null}
                </React.Fragment>
              ))}
            </View>
          </Body>
        </CardItem>
      )}
      <CardItem cardBody bordered={dramComments.length > 0} style={styles.buttonContainer}>
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
      {dramComments.length > 0 ? (
        <CardItem {...goToDetailsProps} bordered={!isCompact} onPress={goToDetailsComment}>
          <Body>
            {dramComments
              .filter((c, index) => (isCompact && index < 2) || !isCompact)
              .map(c => (
                <Comment
                  disableLink={isCompact}
                  key={c.id}
                  comment={c.comment}
                  user={c.user.value}
                  createdAt={c.createdAt}
                />
              ))}
            {isCompact && dramComments.length > 2 ? (
              <Text style={{ color: colors.grey2, marginTop: 5 }}>Read more comments...</Text>
            ) : null}
          </Body>
        </CardItem>
      ) : null}
    </Card>
  );
};

export default withNavigation(Dram);
