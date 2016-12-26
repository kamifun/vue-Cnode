<template>
  <div id="app">
    <drawer @change-show="changeDrawer" :show="drawerShow">
      <tool-bar @change-drawer="changeDrawer"></tool-bar>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <drawer-menu slot="drawer"></drawer-menu>
    </drawer>
    <loading v-if="ajaxing"></loading>
  </div>
</template>

<script>
import loading from 'components/Loading.vue';
import toolBar from 'components/Header.vue';
import drawer from 'components/Drawer.vue';
import drawerMenu from 'components/Menu.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      drawerShow: false
    };
  },
  components: {
    loading,
    toolBar,
    drawer,
    drawerMenu
  },
  computed: {
    ...mapState({
      ajaxing: state => state.ajax.ajaxing
    })
  },
  methods: {
    // show drawer
    changeDrawer(value) {
      this.drawerShow = !!value;
    }
  }
};
</script>

<style lang="less">
  @import "./assets/styles/reset";
  @import "./assets/iconfont/iconfont.css";
  #app {
    height: 100%;
  }
  .pt-header {
    padding-top: .8rem;
  }
</style>
