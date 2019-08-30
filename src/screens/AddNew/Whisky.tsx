import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  Content,
  Form,
  Item,
  Picker,
  Icon,
  Label,
  Right,
  Input,
  Left,
  Button,
} from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';

interface ForeignValue {
  id: number;
  name: string;
}

const Whisky = ({ navigation }: NavigationInjectedProps) => {
  const [category, setCategory] = useState<number>(3);
  const [distillery, setDistillery] = useState<ForeignValue | undefined>(undefined);
  const [bottler, setBottler] = useState<ForeignValue>({ name: 'Distillery bottling', id: 2 });

  const onChangeDistillery = (value: ForeignValue) => setDistillery(value);
  const onChangeBottler = (value: ForeignValue) => setBottler(value);

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content>
        <Form>
          <Item picker>
            <Left style={{ paddingLeft: 15 }}>
              <Label>Distillery</Label>
            </Left>
            <Right>
              <Button
                transparent
                onPress={() => {
                  navigation.navigate(
                    'AddDistillery',
                    {
                      onChange: onChangeDistillery,
                      value: distillery,
                    },
                  );
                }}
              >
                <Text style={{ color: '#050505' }}>
                  {distillery ? distillery.name : 'Pick distillery'}
                </Text>
                <Icon name="arrow-forward" />
              </Button>
            </Right>
          </Item>
          <Item picker>
            <Left style={{ paddingLeft: 15 }}>
              <Label>Category</Label>
            </Left>
            <Right>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-forward" />}
                style={{ width: undefined }}
                placeholder="Select category"
                selectedValue={category}
                onValueChange={value => setCategory(value)}
              >
                <Picker.Item label="Single Malt" value={3} />
                <Picker.Item label="Bourbon" value={5} />
                <Picker.Item label="Blend" value={4} />
                <Picker.Item label="Spirit" value={7} />
                <Picker.Item label="Rye" value={1} />
                <Picker.Item label="Single Pot Still" value={10} />
                <Picker.Item label="Wheat" value={6} />
                <Picker.Item label="Blended Malt" value={2} />
                <Picker.Item label="Blended Grain" value={8} />
                <Picker.Item label="Single Grain" value={9} />
                <Picker.Item label="Corn" value={11} />
              </Picker>
            </Right>
          </Item>
          <Item picker>
            <Left style={{ paddingLeft: 15 }}>
              <Label>Bottler</Label>
            </Left>
            <Right>
              <Button
                transparent
                onPress={() => {
                  navigation.navigate(
                    'AddBottler',
                    {
                      onChange: onChangeBottler,
                      value: bottler,
                    },
                  );
                }}
              >
                <Text style={{ color: '#050505' }}>{bottler.name}</Text>
                <Icon name="arrow-forward" />
              </Button>
            </Right>
          </Item>
          <Item stackedLabel>
            <Label>Whisky name</Label>
            <Input
              placeholder="without brand / distillery. eg: 10-year-old"
            />
          </Item>
          <Item stackedLabel>
            <Label>Age</Label>
            <Input
              placeholder="in years. leave empty if not stated"
            />
          </Item>
          <Item stackedLabel>
            <Label>Alcohol / Volume</Label>
            <Input
              placeholder="eg: 40%"
            />
          </Item>
          <Item stackedLabel>
            <Label>Bottle size</Label>
            <Input
              placeholder="eg: 700ml"
            />
          </Item>
          <Item stackedLabel>
            <Label>Release year or date / Vintage</Label>
            <Input
              placeholder="eg: 24-12-2018. leave empty if not stated"
            />
          </Item>
          <Item stackedLabel>
            <Label>Bottling serie</Label>
            <Input
              placeholder="only enter when part of a serie / special edition"
            />
          </Item>
          <Item stackedLabel>
            <Label>Barcode</Label>
            <Input
              placeholder="eg: 5010019640260"
            />
          </Item>
        </Form>
      </Content>
    </SafeWithHeader>
  );
};

Whisky.navigationOptions = {
  title: 'Add whisky bottle',
};

export default Whisky;
