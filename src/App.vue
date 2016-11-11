<template>
<div id="app">
  <tabs :tabTitles="['全部', '精华', '分享', '问答', '招聘']">
    <div class="tab-content-container">
      <ul class="ul-reset fun-reset">
        <list :item="list"></list>
      </ul>
    </div>
    <div class="tab-content-container">
      <ul class="ul-reset fun-reset">
        <list :item="list"></list>
      </ul>
    </div>
    <div class="tab-content-container">
      <ul class="ul-reset fun-reset">
        <list :item="list"></list>
      </ul>
    </div>
    <div class="tab-content-container">
      <ul class="ul-reset fun-reset">
        <list :item="list"></list>
      </ul>
    </div>
    <div class="tab-content-container">
      <ul class="ul-reset fun-reset">
        <list :item="list"></list>
      </ul>
    </div>
  </tabs>
</div>
</template>

<script>
import tabs from './components/Tabs';
import list from './components/List';

export default {
  name: 'app',
  components: {
    tabs,
    list
  },
  data() {
    return {
      list: {
        'id': '5812bf7545f2633904fdc898',
        'author_id': '5812b3a845f2633904fdc893',
        'tab': 'share',
        'title': 'Vue 2 中英文对照文档发布',
        'last_reply_at': '2016-11-02T13:42:40.072Z',
        'good': true,
        'top': true,
        'reply_count': 3,
        'visit_count': 1838,
        'create_at': '2016-10-28T03:01:09.069Z',
        'author': {
          'loginname': 'ceoimon',
          'avatar_url': 'https://avatars.githubusercontent.com/u/9743157?v=3&s=120'
        }
      }
    };
  },
  mounted() {
    // GET /someUrl
    this.$http.get('/api/v1/topics').then((response) => {
      console.log(response);
    }, (response) => {
      console.log(response);
    });
  }
};
</script>

<style lang="less">
@import "./styles/reset";
</style>
