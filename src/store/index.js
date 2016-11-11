import Vue from 'vue';
import Vuex from 'vuex';
import tabs from 'store/modules/tabs.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tabs
  },
  strict: process.env.NODE_ENV !== 'production'
});
