<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <loading v-if="ajaxing"></loading>
  </div>
</template>

<script>
import loading from 'components/loading';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    loading
  },
  computed: {
    ...mapState({
      ajaxing: state => state.ajax.ajaxing
    })
  }
};
</script>

<style lang="less">
  @import "./styles/reset";
  #app {
    height: 100%;
  }
</style>
