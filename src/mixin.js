import { SETUSER, SETMESSAGE } from 'store/types';

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
    },
    // 获取未读消息数量
    getMessageCount() {
      this.$http.get('message/count', {
        params: {
          'accesstoken': this.user.token
        }
      }).then(({body}) => {
        if (body.success) {
          this.$store.commit(SETMESSAGE, body.data > 0);
        }
      }, ({body}) => {
        console.log(body.error_msg);
      });
    },
    // go to login
    // 跳转到登录
    goToLogin() {
      window.alert('请登录后再进行此操作');
      this.$router.push('/login');
    },
    // get token
    // 获取token值
    getToken() {
      return window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
    },
    // 返回顶部
    scrollToTop() {
      document.body.scrollTop = 0;
    },
    // 给@用户，加上markdown链接
    linkUsers(text) {
      let users = this.fetchUsers(text);
      for (let i = 0, l = users.length; i < l; i++) {
        let name = users[i];
        text = text.replace(new RegExp('@' + name + '\\b(?!\\])', 'g'), '[@' + name + '](#/user/' + name + ')');
      }
      return text;
    },
    // 获取用户数组(@xxx)
    fetchUsers(text) {
      if (!text) {
        return [];
      }

      let ignoreRegexs = [
        /```.+?```/g, // 去除单行的 ```
        /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
        /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
        // /^.*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
        /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
        /[@.+?]\(\/.+?\)/g // 已经被 link 的 username
      ];

      ignoreRegexs.forEach((ignoreRegex) => {
        text = text.replace(ignoreRegex, '');
      });

      let results = text.match(/@[a-z0-9\-_]+\b/igm);
      let names = [];
      if (results) {
        for (let i = 0, l = results.length; i < l; i++) {
          let s = results[i];
          // remove leading char @
          s = s.slice(1);
          names.push(s);
        }
      }
      names = this.uniqueArr(names);
      return names;
    },
    // 数组去重
    uniqueArr(arr) {
      if (!this.isType(arr, 'Array')) {
        return [];
      }
      let set = new Set(arr);
      return Array.from(set);
    },
    // 判断类型
    isType(obj, type) {
      // types : ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
  }
};
