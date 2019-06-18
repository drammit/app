import React from 'react';
import { Text, Icon, List, ListItem, Content, Left, Right } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import { Linking } from 'react-native';

type SettingsProps = NavigationInjectedProps;

const Settings = ({ navigation }: SettingsProps) => (
  <SafeWithHeader style={{ flex: 1 }}>
    <Content scrollEnabled={false}>
      <List>
        <ListItem itemDivider>
          <Text>Profile</Text>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('SettingsAvatar')}>
          <Left>
            <Text>Change avatar</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('SettingsDisplayName')}>
          <Left>
            <Text>Change display name</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem itemDivider>
          <Text>Account</Text>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Change password</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem itemDivider>
          <Text>Help</Text>
        </ListItem>
        <ListItem onPress={() => { Linking.openURL('mailto:support@dramm.it'); }}>
          <Left>
            <Text>I have a question</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </Content>
  </SafeWithHeader>
);

Settings.navigationOptions = {
  title: 'Settings',
};

export default Settings;
