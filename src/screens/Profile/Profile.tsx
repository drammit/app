import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Content, H3, Spinner } from 'native-base';
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

import colors from '../../config/colors';
import { fetchTimeline, refreshTimeline } from '../../store/actions/timeline';
import { getUserTimeline } from '../../store/selectors/timeline';

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
    marginLeft: 16,
  },
  topbar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
});

type ProfileProps = NavigationInjectedProps;

const Profile = ({ navigation }: ProfileProps) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(getCurrentUser);

  const idParam: null | number = navigation.getParam('id', null);
  const UserId = idParam || loginUser.id;

  const profile = useSelector((state: StoreShape) => getProfile(UserId)(state, dispatch));

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

  if (!profile) {
    return <Spinner color={colors.grey3} />;
  }

  if (profile instanceof Error) {
    const errorMessage = 'Couldn\'t load';
    if (navigation.getParam('title', '') !== errorMessage) {
      navigation.setParams({ title: errorMessage });
    }

    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          <Message error>{`Something went wrong:\n${profile.message}`}</Message>
        </Content>
      </SafeWithHeader>
    );
  }

  const isSelf = loginUser.id === profile.id;

  // update the page header if doesn't match
  if (navigation.getParam('title', '') !== profile.username) {
    navigation.setParams({
      headerBackTitle: isSelf ? 'Profile' : profile.username,
      title: profile.username,
    });
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

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Timeline
        timeline={timeline}
        header={(
          <>
            <View style={styles.topbar}>
              <Avatar uri={profile.avatar} />

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
            </View>
            <View>
              <H3>{profile.name || profile.username}</H3>
              <Text>Joined {distanceInWordsToNow(profile.createdAt)} ago</Text>
            </View>

            {actions}
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
