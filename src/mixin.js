import { SETUSER } from 'store/types';

export default {
  methods: {
    // get item tag
    // 获取当前主题的标签
    getTag(top, good, tab) {
      if (top) {
        return '置顶';
      }
      if (good) {
        return '精华';
      }
      let tags = {
        share: '分享',
        ask: '问答',
        job: '招聘'
      };
      return tags[tab];
    },
    // getUserInfo
    // 异步获取用户信息
    getUserInfo() {
      this.$http.get('user/' + this.user.loginname).then(({body}) => {
        if (body.success) {
          this.$store.commit(SETUSER, {
            avatar_url: body.data.avatar_url,
            create_at: body.data.create_at,
            score: body.data.score,
            recent_replies: body.data.recent_replies,
            recent_topics: body.data.recent_topics
          });
        }
      }, ({body}) => {
        console.log(body.error_msg);
      });
    }
  }
};
