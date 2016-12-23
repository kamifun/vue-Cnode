import Vue from 'vue';
import VueRouter from 'vue-router';

import home from 'src/views/Home';
import topic from 'src/views/Topic';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: home
  },
  {
    name: 'topic',
    path: '/topic/:id',
    component: topic
  },
  {
    path: '*',
    component: home
  }
];

export default new VueRouter({
  routes
});
