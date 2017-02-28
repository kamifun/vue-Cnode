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
    path: '/user/:username',
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

// before all router,check the login
// 路由进入前，校验登录状态
router.beforeEach((to, from, next) => {
  let auth;
  to.matched.some(record => {
    auth = record.meta.auth;
  });

  // save in vuex
  let isLogin = store.state.user.isLogin;
  let token, loginname, userId;
  // save token、loginname and userId in storage
  // 保存token、loginname和userId到storage
  let storage = ((token = window.localStorage.getItem('token')) && (loginname = window.localStorage.getItem('user')) && (userId = window.localStorage.getItem('userId'))) || ((token = window.sessionStorage.getItem('token')) && (loginname = window.sessionStorage.getItem('user')) && (userId = window.sessionStorage.getItem('userId')));
  // 如果未在vuex中保存登录状态，则从storage中读取
  if (!isLogin && !!storage) {
    isLogin = true;
    store.commit(SETUSER, {
      isLogin: true,
      loginname: loginname,
      userId: userId,
      token: token
    });
  }

  // need login but not login
  // 需要登录但是未登录
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
