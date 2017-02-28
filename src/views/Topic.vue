<template lang="html">
  <section class="topic-content pt-header" v-if="topic.title">

    <h2 class="topic-title" v-text="topic.title"></h2>

    <section class="topic-info">
      <img :src="topic.author && topic.author.avatar_url" :alt="topic.author && topic.author.loginname" />
      <div class="author-info">
        <span v-text="topic.author && topic.author.loginname"></span>
        <time>发布于:{{ topic.create_at | getLastTimeStr }}</time>
      </div>
      <div class="topic-reviews">
        <span class="tag" v-text="getTag(topic.top, topic.good, topic.tab)"></span>
        <span class="visit" v-text="topic.visit_count + '次浏览'"></span>
      </div>
    </section>

    <section class="markdown-body" v-html="topic.content"></section>

    <h3 class="topic-reply">
      共(<em v-text="topic.reply_count"></em>)条回复
    </h3>

    <section class="reply-list">
      <ul>
        <li v-for="(item, index) in topic.replies">
          <section class="reply-head">
            <router-link :to="{}">
              <img :src="item.author.avatar_url" :alt="item.author.loginname">
            </router-link>
            <div class="reply-info">
              <span class="name" v-text="item.author.loginname"></span>
              <span class="date">
                发布于：{{ item.create_at | getLastTimeStr }}
              </span>
            </div>
            <span class="like">
              <i class="iconfont" :class="isUps(item.ups) ? 'icon-appreciatefill' : 'icon-appreciate'" @click="upReply(item.id, index)"></i>
              {{ item.ups.length }}
              <i class="iconfont icon-mark" @click="addReply(index)"></i>
            </span>
          </section>
          <section class="markdown-body reply-content" v-html="item.content"></section>
          <reply @replied="replied" :topic-id="topic.id" :reply-id="item.id" :reply-name="item.author.loginname" v-show="showReply && currentReply === index" ref="replyBox"></reply>
        </li>
      </ul>
    </section>
    <reply :topic-id="topic.id"></reply>
  </section>
  <section v-else></section>
</template>

<script>
import reply from 'components/reply';
import { mapState } from 'vuex';
require('github-markdown-css');

export default {
  name: 'topic',
  data() {
    return {
      topic: {},
      currentReply: -1,
      showReply: false
    };
  },
  // 列表返回顶部监听器
  created() {
    this.$root.$on('scroll-to-top', this.scrollToTop);
  },
  components: {
    reply
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  watch: {
    '$route': 'changeRoute'
  },
  methods: {
    changeRoute() {
      this.$route.name === 'topic' && this.getTopic();
    },
    // get detail info for topic
    // 获取topic详细信息
    getTopic() {
      this.$http.get('topic/' + this.$route.params.id).then((response) => {
        this.topic = response.data.data;
        // Solve the path problem
        // 解决路径问题(vue社区)
        // this.topic.content = this.topic.content.replace(/<img\s?([^(src)|=]?="[^"]")*\s?src="(\/public\/upload[^"]*)"/g, '<img src="//www.vue-js.com/$2" $1');
      }, (response) => {
        console.log(response);
      });
    },
    // resolve this reply is upsed
    // 判断该回复是否被点赞
    isUps(ups) {
      return ups.includes(this.user.userId);
    },
    // up/down for this reply
    // 为此回复点赞/取消赞
    upReply(id, i) {
      this.$http.post('reply/' + id + '/ups', {
        accesstoken: this.user.token
      }).then(({body}) => {
        if (body.success) {
          let ups = this.topic.replies[i].ups;
          if (body.action === 'down') {
            ups.splice(ups.indexOf(this.user.userId), 1);
          } else {
            ups.push(this.user.userId);
          }
        }
      }, ({body}) => {
        console.log(body.error_msg);
      });
    },
    // reply this one
    // 回复此人
    addReply(index) {
      if (!this.showReply || this.currentReply !== index) {
        this.showReply = true;
        this.currentReply = index;
        // 滚动到输入框
        let replyBox = this.$refs.replyBox[index].$el;
        this.$nextTick(() => {
          document.body.scrollTop = replyBox.offsetTop - (document.documentElement.clientHeight - replyBox.offsetHeight);
        });
        return;
      }
      this.showReply = false;
      this.currentReply = -1;
    },
    replied(obj) {
      this.showReply = false;
      this.currentReply = -1;
    }
  },
  mounted() {
    this.getTopic();
  }
};
</script>

<style lang="less">
  .topic-title {
    margin: .35rem;
    padding: .12rem;
    font-size: 18px;
    color: #2c3e50;
    line-height: 1.5;
    background-color: #f0f0f0;
    border-radius: .12rem;
  }
  .topic-info {
    padding: 0 .35rem;
    display: flex;
    align-items: center;
    color: #34495e;
    font-size: 12px;
    >img {
      margin-right: .35rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    >.author-info, >.topic-reviews {
      >* {
        display: block;
        padding: .05rem 0;
      }
    }
    >.author-info {
      flex: 1;
    }
    >.topic-reviews {
      >.tag {
        padding: .1rem .12rem;
        font-size: 10px;
        font-weight: 400;
        border-radius: .08rem;
        background-color: #e7e7e7;
        text-align: center;
        vertical-align: middle;
      }
      >.top {
        background-color: #E74C3C;
      }
      >.good {
        background-color: #E67E22;
      }
      >.ask {
        background-color: #3498DB;
      }
      >.share {
        background-color: #1ABC9C;
      }
      >.job {
        background-color: #9B59B6;
      }
    }
  }
  .markdown-body {
    padding: 0 .3rem;
    li {
      list-style: initial;
    }
  }
  .topic-reply {
    padding: .18rem;
    font-size: .3rem;
    font-weight: normal;
    border-left: .1rem solid #00a24a;
    >em {
      font-style: normal;
      color: #00a24a;
    }
  }
  .reply-list li{
      padding: .3rem .2rem;
      >.reply-head {
        display: flex;
        line-height: 1;
        img {
          width: .8rem;
          height: .8rem;
          margin-right: .2rem;
          display: block;
          vertical-align: baseline;
          border-radius: 50%;
        }
        >.reply-info {
          flex: 1;
          padding-top: .2rem;
          font-size: 0;
          text-align: left;
          color: #626262;
          >.name {
            padding-right: .1rem;
            font-size: .3rem;
          }
          >.date {
            font-size: .33rem;
          }
        }
        >.like {
          display: inline-block;
          padding-top: .1rem;
          width: 1.9rem;
          font-size: .3rem;
          text-align: right;
          .iconfont {
            font-size: .5rem;
          }
        }
      }
      .reply-content {
        padding-top: .2rem;
      }
  }
</style>
