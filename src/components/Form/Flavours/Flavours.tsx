import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, Icon } from 'native-base';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import Tag from './Tag';
import useFlavours from './useFlavours';

interface FlavoursProps extends NavigationInjectedProps {
  WhiskyId?: number;
  flavours?: number[];
  onChange: (flavours: number[]) => void;
}

const Flavours = ({ navigation, flavours: pickedFlavours = [], onChange }: FlavoursProps) => {
  const [flavours, isPending, isResolved] = useFlavours();

  const [picked, setPicked] = useState<number[]>(pickedFlavours);

  useEffect(
    () => {
      onChange(picked);
    },
    [picked],
  );

  const onRemove = useCallback(
    (id: number) => {
      setPicked(picked.filter(p => p !== id));
    },
    [picked],
  );

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {isResolved && picked.length > 0 && (
        picked.map((p) => {
          const flavour = flavours.find(f => f.id === p);

          if (!flavour) return null;

          return (
            <Tag
              active
              key={flavour.id}
              flavour={flavour}
              onPress={onRemove}
            />
          );
        })
    )}
      <Button
        iconLeft
        transparent
        onPress={() => navigation.navigate(
          'FlavourPicker',
          {
            mostUsed: [],
            onChange: (items: number[]) => setPicked(items),
            picked,
          },
        )}
      >
        <Icon name="add" />
        <Text>Pick Flavours</Text>
      </Button>
    </View>
  );
};

export default withNavigation(Flavours);
