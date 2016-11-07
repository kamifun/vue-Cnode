<template>
  <div id="app">
    <tabs :tabTitles="['全部', '精华', '分享', '问答', '招聘']">
      <div class="tab-content-container">
        <button onclick="alert(2)">click</button>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <img src="http://i2.hdslb.com/bfs/archive/33a164cec9e4664675e928c5f0a2844788c077ad.jpg@320w_200h.webp">
        <div>hahaha1</div>
        <div>hahaha1</div>
        <img src="http://i2.hdslb.com/bfs/archive/33a164cec9e4664675e928c5f0a2844788c077ad.jpg@320w_200h.webp">
      </div>
      <div class="tab-content-container">123</div>
      <div class="tab-content-container">
        <button onclick="alert(2)">click</button>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <img src="http://i2.hdslb.com/bfs/archive/33a164cec9e4664675e928c5f0a2844788c077ad.jpg@320w_200h.webp">
        <div>hahaha1</div>
        <div>hahaha1</div>
        <img src="http://i2.hdslb.com/bfs/archive/33a164cec9e4664675e928c5f0a2844788c077ad.jpg@320w_200h.webp">
      </div>
      <div class="tab-content-container">123</div>
      <div class="tab-content-container">123</div>
    </tabs>
  </div>
</template>

<script>
import tabs from './components/Tabs';

export default {
  name: 'app',
  components: {
    tabs
  }
};
</script>

<style lang="less">
  @import "./styles/base";
  .tab-content-container {
    font-size: 1.3333333333333333rem;
  }
</style>
