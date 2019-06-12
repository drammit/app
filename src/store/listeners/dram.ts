import { slainteDram, commentDram } from '../../components/Dram/api';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: any) => {
      slainteDram((action as DramSlainteAction).DramId);
    },
    type: ['DRAM_SLAINTE'],
  },
  {
    listener: (dispatch, action: any) => {
      commentDram(action.DramId, action.comment);
    },
    type: ['DRAM_COMMENT'],
  },
];

export default listeners;
