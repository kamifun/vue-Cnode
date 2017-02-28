<template lang="html">
  <header class="fix-header">
    <div class="toolbar-left" @click="changeDrawer" v-if="isHome">
      <i class="iconfont icon-004caozuo_liebiao"></i>
    </div>
    <div class="toolbar-left" @click="goBack" v-else>
      <i class="iconfont icon-back"></i>
    </div>
    <div class="toolbar-title" v-text="head.title" @click="scrollToTop"></div>
    <div class="toolbar-right">
      <!-- <i class="iconfont icon-022caozuo_jiahao"></i> -->
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SETTITLE } from 'store/types';

export default {
  name: 'header',
  data() {
    return {
      isHome: true
    };
  },
  watch: {
    '$route': 'changeRoute'
  },
  computed: {
    ...mapState({
      head: state => state.head
    })
  },
  methods: {
    // show drawer
    // 显示侧边栏
    changeDrawer() {
      this.$emit('change-drawer', true);
    },
    // change route
    changeRoute() {
      let titleRoute = {
        topic: '主题详情',
        about: '关于我们',
        user: '个人资料',
        message: '通知消息',
        login: '登录',
        home: '首页'
      };
      this.setTitle(titleRoute[this.$route.name]);
      if (this.$route.name === 'home') {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    },
    // go back history
    goBack() {
      this.$router.go(-1);
    },
    // scroll to top
    scrollToTop() {
      this.$root.$emit('scroll-to-top');
    },
    ...mapMutations({
      setTitle: SETTITLE
    })
  },
  mounted() {
    this.changeRoute();
  }
};
</script>

<style lang="less" scoped>
  .fix-header {
    width: 100%;
    height: .8rem;
    line-height:.8rem;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    z-index: 1;
    padding: 0 .3rem;
    justify-content: space-between;
    box-shadow: 0 0 4px rgba(0, 0, 0, .25);
    background-color: #fff;
    .toolbar-right, .toolbar-left {
      width: .5rem;
    }
    .toolbar-title {
      font-size: .4rem;
    }
    .toolbar-title {
      flex: 1;
      font-size: .4rem;
      text-align: center;
    }
    .iconfont {
      font-size: .5rem;
      vertical-align: super;
    }
  }
</style>
