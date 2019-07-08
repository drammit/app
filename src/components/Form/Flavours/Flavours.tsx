import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import { getFlavours } from '../../../store/entities/flavours';
import { fetchFlavours } from '../../../store/actions/flavour';

import Tag from './Tag';

export const useFlavours = (search?: string): [FlavourShape[], boolean, boolean] => {
  const dispatch = useDispatch();
  const StoreFlavours: StoreFlavours = useSelector(getFlavours);
  const [loadingState, setLoadingState] = useState<{ isPending: boolean; isResolved: boolean}>({
    isPending: false,
    isResolved: false,
  });

  useEffect(
    () => {
      if (
        Object.keys(StoreFlavours).length === 0
        && !loadingState.isResolved
        && !loadingState.isPending
      ) {
        dispatch(fetchFlavours());
        setLoadingState({ isPending: true, isResolved: false });
      }

      if (Object.keys(StoreFlavours).length > 0 && !loadingState.isResolved) {
        setLoadingState({ isPending: false, isResolved: true });
      }
    },
    [StoreFlavours, loadingState],
  );

  const flavours = (
    Object.keys(StoreFlavours).map(k => StoreFlavours[parseInt(k, 10)].value) || []
  )
    .filter((i) => {
      if (!search || search === '') return true;
      return i.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    })
    .sort((a, b) => a.name > b.name ? 1 : -1);

  return [
    flavours,
    loadingState.isPending,
    loadingState.isResolved,
  ];
};

interface FlavoursProps extends NavigationInjectedProps {
  WhiskyId?: number;
  onChange: (flavours: number[]) => void;
}

const Flavours = ({ navigation, onChange }: FlavoursProps) => {
  const [flavours, isPending, isResolved] = useFlavours();

  const [picked, setPicked] = useState<number[]>([]);

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
