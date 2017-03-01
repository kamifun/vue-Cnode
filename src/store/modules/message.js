import { SETMESSAGE } from 'store/types';

export default {
  state: {
    hasMsg: false
  },
  mutations: {
    [SETMESSAGE](state, boolean) {
      state.hasMsg = boolean;
    }
  }
};
