import { isLoading } from './selector';
import { dispatch } from '../store';
import { fetch } from './actions';
import { registerResolver } from './listeners';

function createLoader<T>(
  table: string,
  defaultValue: T,
  resolver: (id: string | number) => Promise<any>,
  otherReducer?: (state: T, action: DrammitAction) => T,
): [
  (state: T, action: DrammitAction) => T,
  (state: StoreShape) => T,
  (key: number | string) => (state: StoreShape) => any,
] {
  // add resolver to listeners
  registerResolver(table, resolver);

  // create reducer
  const reducer = (state: T = defaultValue, action: DrammitAction) => {
    switch (action.type) {
      case 'LOADER_FETCH_FAILED':
        return action.table === table ? {
          ...state,
          [action.key]: action.error,
        } : state;
      case 'LOADER_FETCH_SUCCESS':
        return action.table === table ? {
          ...state,
          [action.key]: action.payload,
        } : state;
      default:
        return otherReducer ? otherReducer(state, action) : state;
    }
  };

  // create selector
  // @ts-ignore
  const getAll = (state: StoreShape): T => state[table];

  const getEntry = (key: number | string) => (state: StoreShape) => {
    // @ts-ignore
    const entry = getAll(state)[key];

    if (typeof entry === 'undefined' && !isLoading(table, key)(state)) {
      return dispatch(fetch(table, key));
    }

    return entry;
  };

  return [reducer, getAll, getEntry];
}

export default createLoader;
