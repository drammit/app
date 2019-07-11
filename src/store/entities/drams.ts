import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [drams, getDrams, getDram] = createLoader<StoreDrams, DramShape>({
  defaultValue: {},
  fallbackValue: {
    UserId: 0,
    WhiskyId: 0,
    comments: [],
    createdAt: new Date(),
    flavours: [],
    id: 0,
    name: '',
    rating: 0,
    slaintes: [],
  },
  fetchTypes: ['FETCH_TIMELINE_SUCCESS'],
  reducer: (state = {}, action) => {
    switch (action.type) {
      case 'DRAM_UPDATE':
        return {
          ...state,
          [action.dram.id]: {
            isPending: false,
            isResolved: true,
            value: {
              ...state[action.dram.id].value,
              ...action.dram,
            },
          },
        };
      case 'DRAM_ADD':
        return {
          ...state,
          [action.dram.id]: {
            isPending: false,
            isResolved: true,
            value: {
              ...action.dram,
            },
          },
        };
      case 'DRAM_REMOVE': {
        const clone = { ...state };
        delete clone[action.id];
        return clone;
      }
      case 'DRAM_SLAINTE': {
        const slaintes = state[action.DramId] ? state[action.DramId].value.slaintes : [];
        const slainteIndex = slaintes
          .findIndex((s: DramSlainteShape) => s.UserId === action.UserId);

        if (slainteIndex === -1) {
          return {
            ...state,
            [action.DramId]: {
              ...state[action.DramId],
              value: {
                ...state[action.DramId].value,
                slaintes: [...slaintes, { UserId: action.UserId, createdAt: new Date() }],
              },
            },
          };
        }

        return {
          ...state,
          [action.DramId]: {
            ...state[action.DramId],
            value: {
              ...state[action.DramId].value,
              slaintes: slaintes.filter((s: DramSlainteShape) => s.UserId !== action.UserId),
            },
          },
        };
      }
      case 'DRAM_COMMENT':
        return {
          ...state,
          [action.DramId]: {
            ...state[action.DramId],
            value: {
              ...state[action.DramId].value,
              comments: [
                ...state[action.DramId].value.comments,
                {
                  UserId: action.UserId,
                  comment: action.comment,
                  createdAt: new Date(),
                  id: action.id,
                },
              ],
            },
          },
        };
      case 'DRAM_COMMENT_REPLACE':
        return {
          ...state,
          [action.DramId]: {
            ...state[action.DramId],
            value: {
              ...state[action.DramId].value,
              comments: [
                ...state[action.DramId]
                  .value
                  .comments
                  .map((c: DramCommentShape) => c.id === action.id ? action.comment : c),
              ],
            },
          },
        };
      default:
        return state;
    }
  },
  resolver: id => get(`/dram/${id}`),
  table: 'drams',
});
