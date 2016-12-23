// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';

import router from 'src/router';
import store from 'store';
import filters from 'src/filters';
import mixin from 'src/mixin';

// use plugins
Vue.use(VueResource);

// register filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// mixin
Vue.mixin(mixin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
