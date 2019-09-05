import React, { useState } from 'react';
import { Content, Form, Item, Left, Label, Right, Picker, Icon, Input } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import PickerButton, { ForeignValue } from '../../components/Form/ForeignPicker/PickerButton';

const AddDistillery = ({}: NavigationInjectedProps) => {
  const [country, setCountry] = useState<ForeignValue>({ id: 2, name: 'Scotland' });
  const [region, setRegion] = useState<number>(4);

  const onChangeCountry = (value: ForeignValue) => setCountry(value);

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content>
        <Form>
          <Item picker>
            <Left style={{ paddingLeft: 15 }}>
              <Label>Country</Label>
            </Left>
            <Right>
              <PickerButton
                value={country}
                page="AddCountry"
                onChange={onChangeCountry}
                placeholder="Pick country"
              />
            </Right>
          </Item>
          {country.id === 2 && (
            <Item picker>
              <Left style={{ paddingLeft: 15 }}>
                <Label>Region</Label>
              </Left>
              <Right>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-forward" />}
                  style={{ width: undefined }}
                  placeholder="Select region"
                  selectedValue={region}
                  onValueChange={value => setRegion(value)}
                >
                  <Picker.Item label="Speyside" value={4} />
                  <Picker.Item label="Highlands" value={3} />
                  <Picker.Item label="Islay" value={1} />
                  <Picker.Item label="Islands" value={2} />
                  <Picker.Item label="Campbeltown" value={5} />
                  <Picker.Item label="Lowlands" value={6} />
                </Picker>
              </Right>
            </Item>
          )}
          <Item stackedLabel>
            <Label>Distillery name</Label>
            <Input
              placeholder="name of the distillery"
            />
          </Item>
        </Form>
      </Content>
    </SafeWithHeader>
  );
};

AddDistillery.navigationOptions = {
  title: 'Add distillery',
};

export default AddDistillery;
