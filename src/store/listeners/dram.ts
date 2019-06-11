import { slainteDram } from '../../components/Dram/api';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: any) => {
      slainteDram((action as DramSlainteAction).DramId);
    },
    type: ['DRAM_SLAINTE'],
  },
];

export default listeners;
