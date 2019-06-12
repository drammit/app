import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [drams, getDrams, getDram] = createLoader<StoreDrams, StoreDram>({
  defaultValue: {},
  fetchTypes: ['FETCH_TIMELINE_SUCCESS'],
  reducer: (state = {}, action) => {
    switch (action.type) {
      case 'DRAM_SLAINTE': {
        const slaintes = state[action.DramId] ? state[action.DramId].slaintes : [];
        const slainteIndex = slaintes
          .findIndex((s: DramSlainteShape) => s.UserId === action.UserId);

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
      case 'DRAM_COMMENT': {
        return {
          ...state,
          [action.DramId]: {
            ...state[action.DramId],
            comments: [
              ...state[action.DramId].comments,
              {
                UserId: action.UserId,
                comment: action.comment,
                createdAt: new Date(),
              },
            ],
          },
        };
      }
      default:
        return state;
    }
  },
  resolver: id => get(`/dram/${id}`),
  table: 'drams',
});
