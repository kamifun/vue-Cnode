import Vue from 'vue';
import VueRouter from 'vue-router';

import home from 'src/views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '*',
    component: home
  }
];

export default new VueRouter({
  routes
});
