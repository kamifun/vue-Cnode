import { SETUSER, RESETUSER } from 'store/types';

export default {
  state: {
    loginname: 'victor',
    avatar_url: 'https://avatars.githubusercontent.com/u/15662801?v=3&s=120',
    create_at: '2016-05-14T08:36:33.120Z',
    score: 40
  },
  mutations: {
    [SETUSER]() {},
    [RESETUSER]() {}
  }
};
