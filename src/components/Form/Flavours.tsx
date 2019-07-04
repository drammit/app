import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import { getFlavours } from '../../store/entities/flavours';
import { fetchFlavours } from '../../store/actions/flavour';

export const useFlavours = (): [FlavourShape[], boolean, boolean] => {
  const dispatch = useDispatch();
  const StoreFlavours = useSelector(getFlavours);
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

  const flavours = Object.keys(StoreFlavours).map(k => StoreFlavours[parseInt(k, 10)].value) || [];

  return [flavours, loadingState.isPending, loadingState.isResolved];
};

interface FlavoursProps extends NavigationInjectedProps {
  WhiskyId?: number;
}

const Flavours = ({ navigation }: FlavoursProps) => {
  useFlavours();

  return (
    <View>
      <Text>
        Flavours!
      </Text>
      <Button
        onPress={() => navigation.navigate(
          'FlavourPicker',
          {
            onAdd: (item: any) => console.log('add', item),
            onRemove: (item: any) => console.log('remove', item),
          },
        )}
      >
        <Text>Add Flavour</Text>
      </Button>
    </View>
  );
};

export default withNavigation(Flavours);
