import Vue from 'vue';
import Vuex from 'vuex';
import tabs from 'store/modules/tabs';
import list from 'store/modules/list';
import ajax from 'store/modules/ajax';
import user from 'store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tabs,
    list,
    ajax,
    user
  },
  strict: process.env.NODE_ENV !== 'production'
});
