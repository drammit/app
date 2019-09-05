import React, { useState } from 'react';
import {
  Content,
  Form,
  Item,
  Picker,
  Icon,
  Label,
  Right,
  Input,
  Left,
} from 'native-base';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import PickerButton, { ForeignValue } from '../../components/Form/ForeignPicker/PickerButton';
import colors from '../../config/colors';

const AddWhisky = () => {
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
              <PickerButton
                value={distillery}
                page="PickDistillery"
                onChange={onChangeDistillery}
                placeholder="Pick distillery"
              />
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
              <PickerButton
                value={bottler}
                page="AddBottler"
                onChange={onChangeBottler}
                placeholder="Pick bottler"
              />
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

AddWhisky.navigationOptions = {
  title: 'Add whisky bottle',
};

export default AddWhisky;
