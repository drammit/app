import { slainteDram, commentDram } from '../../components/Dram/api';
import { replaceComment } from '../actions/dram';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: any) => {
      slainteDram((action as DramSlainteAction).DramId);
    },
    type: ['DRAM_SLAINTE'],
  },
  {
    listener: (dispatch, action: any) => {
      commentDram(action.DramId, action.comment)
        .then((comment) => {
          dispatch(replaceComment(action.DramId, action.id, comment));
        });
    },
    type: ['DRAM_COMMENT'],
  },
];

export default listeners;
