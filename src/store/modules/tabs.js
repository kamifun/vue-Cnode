import {
  SETPAGE,
  INCREMENT,
  REDUCTION,
  STARTDRAG,
  ENDDRAG
} from 'store/types';

export default {
  state: {
    page: 1,
    dragging: false
  },
  mutations: {
    [SETPAGE](state, page) {
      state.page = page;
    },
    [INCREMENT](state) {
      state.page++;
    },
    [REDUCTION](state) {
      state.page--;
    },
    [STARTDRAG](state) {
      state.dragging = true;
    },
    [ENDDRAG](state) {
      state.dragging = false;
    }
  }
};
