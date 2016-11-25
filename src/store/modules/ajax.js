import { STARTAJAX, ENDAJAX, STOPAJAX } from 'store/types';

export default {
  state: {
    ajaxing: false
  },
  mutations: {
    [STARTAJAX](state, handle) {
      state.ajaxing = handle;
    },
    [ENDAJAX](state) {
      state.ajaxing = false;
    },
    [STOPAJAX](state) {
      state.ajaxing && state.ajaxing.abort();
    }
  }
};
