import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [drams, getDrams, getDram] = createLoader<StoreDrams, StoreDram>({
  defaultValue: {},
  fetchTypes: ['FETCH_TIMELINE_SUCCESS'],
  reducer: (state, action) => {
    if (action.type === 'DRAM_SLAINTE') {
      const slaintes = state[action.DramId].slaintes;
      const slainteIndex = slaintes.findIndex((s: DramSlainteShape) => s.UserId === action.UserId);

      if (slainteIndex === -1) {
        return {
          ...state,
          [action.DramId]: {
            ...state[action.DramId],
            slaintes: [...slaintes, { UserId: action.UserId, createdAt: new Date() }],
          },
        };
      }

      return {
        ...state,
        [action.DramId]: {
          ...state[action.DramId],
          slaintes: slaintes.filter((s: DramSlainteAction) => s.UserId !== action.UserId),
        },
      };
    }

    return state;
  },
  resolver: id => get(`/dram/${id}`),
  table: 'drams',
});
