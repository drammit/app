import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Content, H3, Spinner, Left, Right, Icon, ListItem, List } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import Message from '../../components/Message/Message';
import Avatar from '../../components/User/Avatar';
import FollowButton from '../../components/User/FollowButton';
import Timeline from '../../components/Dram/Timeline';

import { getCurrentUser } from '../../store/selectors/user';
import { getProfile } from '../../store/entities/profiles';
import { logout } from '../../store/actions/auth';
import { fetchTimeline, refreshTimeline } from '../../store/actions/timeline';
import { getUserTimeline } from '../../store/selectors/timeline';

import colors from '../../config/colors';

import { paramFromInstance } from '../../core/storeInstances';

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 12,
  },
  figureItem: {
    alignItems: 'center',
  },
  figureItemName: {
    color: colors.grey1,
    fontSize: 14,
  },
  figureItemNumber: {
    fontSize: 18,
  },
  figureItems: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  topbar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
});

type ProfileProps = NavigationInjectedProps;

const Profile = ({ navigation }: ProfileProps) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(getCurrentUser);

  const idParam: null | number = navigation.getParam('id', null);
  const UserId = idParam || loginUser.id;

  const profileInstance = getProfile(UserId);
  const profile = profileInstance.value;

  const timeline: TimelineShape = useSelector((state: StoreShape) => getUserTimeline(UserId)(state))
    || {
      end: false,
      items: [],
      loading: true,
      refreshing: false,
    };

  const onRefresh = (until: number) => {
    dispatch(refreshTimeline({ until, UserId }));
  };

  const onFetch = (from?: number) => {
    dispatch(fetchTimeline({ from, UserId }));
  };

  const isSelf = loginUser.id === paramFromInstance(profileInstance, 'id');

  useEffect(
    () => {
      // update the page header if doesn't match
      if (
        profileInstance.isResolved
        && !profileInstance.error
        && navigation.getParam('title', '') !== profile.username
      ) {
        navigation.setParams({
          headerBackTitle: isSelf ? 'Profile' : profile.username,
          title: profile.username,
        });
      }
    },
    [profile, profileInstance, isSelf],
  );

  const onLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: () => dispatch(logout()),
          text: 'Log out',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  if (profileInstance.isPending || !profileInstance.isResolved) {
    return <Spinner color={colors.grey3} />;
  }

  if (profileInstance.error) {
    const errorMessage = 'Couldn\'t load';
    if (navigation.getParam('title', '') !== errorMessage) {
      navigation.setParams({ title: errorMessage });
    }

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          <Message error>{`Something went wrong:\n${profileInstance.error.message}`}</Message>
        </Content>
      </SafeWithHeader>
    );
  }

  const actions = isSelf
    ? (
      <View style={styles.actions}>
        <Button small dark bordered onPress={() => navigation.navigate('ProfileSettings')}>
          <Text>Edit profile</Text>
        </Button>

        <Button small dark bordered onPress={onLogout}>
          <Text>Log out</Text>
        </Button>
      </View>
    )
    : (
      <View style={styles.actions}>
        <FollowButton profile={profile} />
      </View>
    );

  const name = profile.name || profile.username;
  const namePostFix = name[name.length - 1] === 's' ? "'" : "'s";

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Timeline
        timeline={timeline}
        header={(
          <>
            <Content padder>
              <View style={styles.topbar}>
                <Avatar uri={profile.avatar} style={{ marginRight: 16 }} />

                <View>
                  <H3>{name}</H3>
                  <Text>Joined {distanceInWordsToNow(profile.createdAt)} ago</Text>
                </View>
              </View>
              <View style={styles.figureItems}>
                <View style={styles.figureItem}>
                  <Text style={styles.figureItemNumber}>{profile.drams}</Text>
                  <Text style={styles.figureItemName}>Drams</Text>
                </View>

                <View style={styles.figureItem}>
                  <Text style={styles.figureItemNumber}>{profile.followers}</Text>
                  <Text style={styles.figureItemName}>Followers</Text>
                </View>

                <View style={styles.figureItem}>
                  <Text style={styles.figureItemNumber}>{profile.following}</Text>
                  <Text style={styles.figureItemName}>Following</Text>
                </View>
              </View>

              {actions}
            </Content>

            <List style={{ marginBottom: 12 }}>
              <ListItem onPress={() => navigation.navigate('WishList', { id: UserId })}>
                <Left>
                  <Text>Wish list</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem onPress={() => navigation.navigate('Collection', { id: UserId })}>
                <Left>
                  <Text>
                    {name}{namePostFix} Collection
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            </List>
          </>
        )}
        onFetch={onFetch}
        onRefresh={onRefresh}
        fallback={(
          <View style={{ padding: 40 }}>
            <Text note style={{ textAlign: 'center' }}>No drams reviewed yet.</Text>
          </View>
        )}
      />
    </SafeWithHeader>
  );
};

Profile.navigationOptions = ({ navigation }: NavigationInjectedProps) => {
  const title = navigation.getParam('title', '');
  const headerBackTitle = navigation.getParam('headerBackTitle', '');

  return {
    headerBackTitle,
    title,
  };
};

export default Profile;
