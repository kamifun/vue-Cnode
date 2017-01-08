import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'store';

import { SETUSER } from 'store/types';

import home from 'src/views/Home';
import topic from 'src/views/Topic';
import about from 'src/views/About';
import user from 'src/views/User';
import message from 'src/views/Message';
import login from 'src/views/Login';

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
    name: 'about',
    path: '/about',
    component: about
  },
  {
    name: 'user',
    path: '/user/:loginname',
    component: user
  },
  {
    name: 'message',
    path: '/message',
    component: message,
    meta: {
      auth: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: login,
    meta: {
      auth: false
    }
  },
  {
    path: '*',
    redirect: '/'
  }
];

let router = new VueRouter({
  // mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  let auth;
  to.matched.some(record => {
    auth = record.meta.auth;
  });

  let isLogin = store.state.user.isLogin;
  let token, loginname;
  let storage = ((token = window.localStorage.getItem('token')) && (loginname = window.localStorage.getItem('user'))) || ((token = window.sessionStorage.getItem('token')) && (loginname = window.sessionStorage.getItem('user')));
  if (!isLogin && !!storage) {
    console.log(token, loginname, storage);
    isLogin = true;
    store.commit(SETUSER, {
      isLogin: true,
      loginname: loginname
    });
  }

  if (auth && !isLogin) {
    next({
      name: 'login',
      query: {
        redirect: to.name
      }
    });
    return;
  } else if (auth === false && isLogin) {
    next('/');
    return;
  }
  next();
});

export default router;
