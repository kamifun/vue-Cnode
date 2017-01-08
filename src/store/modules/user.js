import { SETUSER, RESETUSER } from 'store/types';

export default {
  state: {
    loginname: '',
    avatar_url: '',
    create_at: '',
    score: 0,
    recent_replies: [],
    recent_topics: [],
    isLogin: false
  },
  mutations: {
    [SETUSER](state, obj) {
      Object.assign(state, obj);
    },
    [RESETUSER](state) {
      Object.assign(state, {
        loginname: '',
        avatar_url: '',
        create_at: '',
        score: 0,
        isLogin: false
      });
    }
  }
};
