// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// use plugins
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
