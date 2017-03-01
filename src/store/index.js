import Vue from 'vue';
import Vuex from 'vuex';
import tabs from 'store/modules/tabs';
import list from 'store/modules/list';
import ajax from 'store/modules/ajax';
import user from 'store/modules/user';
import head from 'store/modules/head';
import message from 'store/modules/message';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tabs,
    list,
    ajax,
    user,
    head,
    message
  },
  strict: process.env.NODE_ENV !== 'production'
});
