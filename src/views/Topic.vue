<template lang="html">
  <section class="topic-content">

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
        <li v-for="item in topic.replies">
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
              <i class="iconfont" :class="isUps(item.ups) ? 'icon-appreciatefill' : 'icon-appreciate'" @click="upReply(item)"></i>
              {{ item.ups.length }}
              <i class="iconfont icon-community" @click="addReply(item.id)"></i>
            </span>
          </section>
          <p class="reply-content" v-html="item.content"></p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
require('github-markdown-css');

export default {
  name: 'topic',
  data() {
    return {
      topic: {}
    };
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
      this.$http.get('/api/v1/topic/' + this.$route.params.id).then((response) => {
        this.topic = response.data.data;
      }, (response) => {
        console.log(response);
      });
    },
    // resolve this reply is upsed
    // 判断该回复是否被点赞
    isUps(ups) {},
    // up/down for this reply
    // 为此回复点赞/取消赞
    upReply(reply) {},
    // reply this one
    // 回复此人
    addReply(id) {}
  },
  mounted() {
    this.getTopic();
  }
};
</script>

<style lang="less">
  .topic-content {
    padding-top: .8rem;
  }
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
      >.reply-content {
        padding-top: .2rem;
        font-size: .4rem;
      }
  }
</style>
