import React from 'react';
import { Text, Icon, List, ListItem, Content, Left, Right } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

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
        <ListItem>
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
      </List>
    </Content>
  </SafeWithHeader>
);

Settings.navigationOptions = {
  title: 'Settings',
};

export default Settings;
