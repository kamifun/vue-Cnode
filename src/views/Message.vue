<template>
  <section class="pt-header" v-if="loadedToken">
    <ul class="user-tab">
      <li @click="changeTab('hasnot_read_messages')" :class="currentTab == 'hasnot_read_messages' ? 'hover' : ''">未读消息</li>
      <li @click="changeTab('has_read_messages')" :class="currentTab == 'has_read_messages' ? 'hover' : ''">已读消息</li>
    </ul>
    <div class="topic-list">
      <router-link :to="{name: 'topic', params: { id: item.topic.id}}" class="topic" v-for="item in messages[currentTab]">
        <img :src="item.author.avatar_url" alt="">
        <div class="main">
          <h3>
            <strong v-text="item.author.loginname"></strong>
            <time>
              {{ item.create_at | getLastTimeStr }}
            </time>
          </h3>
          <p v-html="item.reply.content"></p>
          <p class="from" v-text="'来自:' + item.topic.title"></p>
        </div>
      </router-link>
      <span class="clear-messages" v-if="messages.hasnot_read_messages.length && currentTab == 'hasnot_read_messages'" @click="clearMessages">清空未读消息</span>
      <p class="no-message" v-if="messages[currentTab].length === 0">暂时没有消息</p>
    </div>
  </section>
  <section v-else>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STARTAJAX, ENDAJAX } from 'store/types';

export default {
  name: 'message',
  data() {
    return {
      loadedToken: '',
      messages: {},
      currentTab: 'hasnot_read_messages'
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      ajaxing: state => state.ajax.ajaxing
    })
  },
  watch: {
    '$route': 'changeRoute'
  },
  methods: {
    // 切换路由
    changeRoute() {
      if (!this.loadedToken || this.user.token !== this.loadedToken) {
        this.messages = {};
        this.loadedToken = '';
        this.currentTab = 'hasnot_read_messages';
        this.getMessage();
      }
    },
    // 获取消息列表
    getMessage() {
      this.$http.get('messages', {
        params: {
          'accesstoken': this.user.token
        },
        timeout: 5000,
        before(request) {
          this.startAjax(request);
        }
      }).then(({body}) => {
        this.endAjax();

        if (!body.success) {
          return;
        }

        this.loadedToken = this.user.token;
        this.messages = {
          has_read_messages: body.data.has_read_messages,
          hasnot_read_messages: body.data.hasnot_read_messages
        };
      }, ({body}) => {
        this.endAjax();
        console.log(body);
      });
    },
    // 切换选项卡
    changeTab(tab) {
      this.currentTab = tab;
    },
    // 清空未读消息
    clearMessages() {
      this.$http.post('message/mark_all', {
        accesstoken: this.user.token
      }, {
        timeout: 5000,
        before(request) {
          this.startAjax(request);
        }
      }).then(function({body}) {
        this.endAjax();

        if (!body.success) {
          return;
        }

        this.messages.has_read_messages = this.messages.hasnot_read_messages.concat(this.messages.has_read_messages);
        this.messages.hasnot_read_messages = [];
      }, function({body}) {
        this.endAjax();
        console.log(body);
      });
    },
    ...mapMutations({
      startAjax: STARTAJAX,
      endAjax: ENDAJAX
    })
  },
  mounted() {
    this.changeRoute();
  }
};
</script>

<style lang="less">
  .user-tab {
    display: flex;
    li {
      flex: 1;
      line-height: .8rem;
      text-align: center;
      font-size: .4rem;
      border: 1px solid #ccc;
      border-left: none;
      &:last-child {
        border-right: none;
      }
      &.hover {
        color: red;
        border-bottom-color: red;
      }
    }
  }
  .topic-list {
    .topic {
      display: flex;
      padding: .2rem;
      color: black;
      img {
        margin-right: .2rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
      .main {
        flex: 1;
        overflow: hidden;
      }
      h3 {
        display: flex;
        font-size: .4rem;
        font-weight: normal;
        strong {
          flex: 1;
        }
        time {
          width: 2rem;
          text-align: right;
        }
      }
      p {
        font-size: .4rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &.from {
          color: #999;
        }
      }
    }
    .clear-messages {
      margin: .5rem auto;
      display: block;
      width: 4rem;
      text-align: center;
      line-height: 1rem;
      font-size: .5rem;
      color: #fff;
      border-radius: .1rem;
      background: #00bcd4;
    }
    .no-message {
      padding: .4rem 0;
      text-align: center;
      font-size: .4rem;
    }
  }
</style>
