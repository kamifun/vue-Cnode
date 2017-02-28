import { SETTITLE } from 'store/types';

export default {
  state: {
    title: ''
  },
  mutations: {
    [SETTITLE](state, title) {
      state.title = title;
    }
  }
};
