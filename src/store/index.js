import Vue from 'vue';
import Vuex from 'vuex';
import tabs from 'store/modules/tabs.js';
import list from 'store/modules/list.js';
import ajax from 'store/modules/ajax.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tabs,
    list,
    ajax
  },
  strict: process.env.NODE_ENV !== 'production'
});
