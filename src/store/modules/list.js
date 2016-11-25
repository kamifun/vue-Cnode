import { SETHEIGHT } from 'store/types';

export default {
  state: {
    height: 0
  },
  mutations: {
    [SETHEIGHT](state, height) {
      state.height = height;
    }
  }
};
