import { getAllFlavours } from '../api/flavours';
import { fetchFlavoursFailed, fetchFlavoursSuccess } from '../actions/flavour';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch) => {
      getAllFlavours()
        .then(response => dispatch(fetchFlavoursSuccess(response)))
        .catch(() => dispatch(fetchFlavoursFailed()));
    },
    type: ['FETCH_FLAVOURS'],
  },
];

export default listeners;
