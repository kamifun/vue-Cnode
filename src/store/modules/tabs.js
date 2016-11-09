const increment = 'increment';
const reduction = 'reduction';
const startDrag = 'startDrag';
const endDrag = 'endDrag';

export default {
  state: {
    page: 1,
    dragging: false
  },
  mutations: {
    [increment](state) {
      state.page++;
    },
    [reduction](state) {
      state.page--;
    },
    [startDrag](state) {
      state.dragging = true;
    },
    [endDrag](state) {
      state.dragging = false;
    }
  },
  actions: {
    [increment]({commit}) {
      commit(increment);
    },
    [reduction]({commit}) {
      commit(reduction);
    },
    [startDrag]({commit}) {
      commit(startDrag);
    },
    [endDrag]({commit}) {
      commit(endDrag);
    }
  }
};
