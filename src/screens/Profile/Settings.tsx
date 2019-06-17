import React from 'react';
import { Text, Icon, List, ListItem, Content, Left, Right } from 'native-base';

const Settings = () => (
  <Content scrollEnabled={false}>
    <List>
      <ListItem itemDivider>
        <Text>Profile</Text>
      </ListItem>
      <ListItem>
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
);

export default Settings;
