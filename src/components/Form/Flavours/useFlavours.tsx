import React, { useEffect, useState, createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFlavours } from '../../../store/entities/flavours';
import {
  fetchFlavours,
  fetchFlavoursFailed,
  fetchFlavoursSuccess,
} from '../../../store/actions/flavour';
import { getAllFlavours } from '../../../store/api/flavours';

const FlavoursContext = createContext({ isPending: false, isResolved: false });

export const FlavourProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState<{ isPending: boolean; isResolved: boolean}>({
    isPending: false,
    isResolved: false,
  });

  useEffect(
    () => {
      if (!loadingState.isResolved && !loadingState.isPending) {
        setLoadingState({ isPending: true, isResolved: false });

        dispatch(fetchFlavours());
        getAllFlavours()
          .then(response => dispatch(fetchFlavoursSuccess(response)))
          .catch(() => dispatch(fetchFlavoursFailed()))
          .then(() => setLoadingState({ isPending: false, isResolved: true }));
      }
    },
    [loadingState],
  );

  return (
    <FlavoursContext.Provider value={loadingState}>
      {children}
    </FlavoursContext.Provider>
  );
};

const useFlavours = (search?: string): [FlavourShape[], boolean, boolean] => {
  const StoreFlavours: StoreFlavours = useSelector(getFlavours);
  const loadingState = useContext(FlavoursContext);

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

export default useFlavours;
