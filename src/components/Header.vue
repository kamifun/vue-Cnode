<template lang="html">
  <header class="fix-header">
    <div class="toolbar-left" @click="changeDrawer" v-if="isHome">
      <i class="iconfont icon-004caozuo_liebiao"></i>
    </div>
    <div class="toolbar-left" @click="goBack" v-else>
      <i class="iconfont icon-back"></i>
    </div>
    <div class="toolbar-title">全部</div>
    <div class="toolbar-right">
      <i class="iconfont icon-022caozuo_jiahao"></i>
    </div>
  </header>
</template>

<script>
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
  methods: {
    // show drawer
    // 显示侧边栏
    changeDrawer() {
      this.$emit('change-drawer', true);
    },
    // change route
    changeRoute() {
      if (this.$route.name === 'home') {
        this.isHome = true;
        return;
      }
      this.isHome = false;
    },
    // go back history
    goBack() {
      this.$router.go(-1);
    }
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
    .toolbar-title {
      font-size: .4rem;
    }
    .iconfont {
      font-size: .5rem;
      vertical-align: super;
    }
  }
</style>
