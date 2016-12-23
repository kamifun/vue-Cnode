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
    }
  }
};
