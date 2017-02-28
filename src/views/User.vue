<template>
  <section class="pt-header" v-if="currentUser.loginname">
    <div class="user-bg"></div>
    <div class="user-portrait">
      <img :src="currentUser.avatar_url" alt="">
    </div>
    <p class="user-name" v-text="currentUser.loginname"></p>
    <p class="user-score" v-text="'积分：' + currentUser.score"></p>
    <p class="user-create">
      {{ currentUser.create_at | dateFormat }}
    </p>
    <ul class="user-tab">
      <li @click="changeTab('recent_replies')" :class="currentTab == 'recent_replies' ? 'hover' : ''">评论主题</li>
      <li @click="changeTab('recent_topics')" :class="currentTab == 'recent_topics' ? 'hover' : ''">发布主题</li>
    </ul>
    <div class="topic-list">
      <router-link :to="{name: 'topic', params: { id: item.id}}" class="topic" v-for="item in currentUser[currentTab]">
        <img :src="item.author.avatar_url" alt="">
        <div class="main">
          <h3>
            <strong v-text="item.author.loginname"></strong>
            <time>
              {{ item.last_reply_at | getLastTimeStr }}
            </time>
          </h3>
          <p v-text="item.title"></p>
        </div>
      </router-link>
    </div>
  </section>
  <section v-else>
  </section>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'user',
    data() {
      return {
        // 当前用户
        currentUser: {},
        // 当前选项卡
        currentTab: 'recent_replies'
      };
    },
    watch: {
      '$route': 'changeRoute'
    },
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    methods: {
      // when change route,action this method
      changeRoute() {
        // 访问user页面，并且当前用户和路由参数username不同时
        if (this.$route.name === 'user' && this.currentUser.loginame !== this.$route.params.username) {
          // 如果访问已登录的用户信息，则从vuex中读取数据
          if (this.$route.params.username === this.user.loginname && this.user.avatar_url) {
            this.currentUser = Object.assign({}, this.user);
            // 否则ajax请求用户信息
          } else {
            this.getUserInfo(this.$route.params.username);
          }
        }
      },
      // 获取用户信息
      getUserInfo(username) {
        if (!username) {
          return {};
        }
        this.$http.get('user/' + username).then(({body}) => {
          if (body.success) {
            this.currentUser = Object.assign({}, {
              loginname: username,
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
      changeTab(tab) {
        this.currentTab = tab;
      }
    },
    mounted() {
      this.changeRoute();
    }
  };
</script>

<style lang="less" scoped>
  .user-bg {
    height: 3rem;
    background: #dce775;
  }
  .user-portrait {
    position: relative;
    height: .75rem;
    img {
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      left: 50%;
      top: -.75rem;
      transform: translateX(-50%);
    }
  }
  .user-name, .user-score, .user-create {
    font-size: .4rem;
    text-align: center;
  }
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
        strong {
          flex: 1;
        }
        time {
          width: 1.5rem;
          text-align: right;
        }
      }
      p {
        font-size: .4rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
</style>
