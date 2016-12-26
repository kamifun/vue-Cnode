<template>
  <tabs :tabTitles="tabs" class="pt-header">
    <infinite @get-more="getTopics" v-for="i in tabs.length" :list="getList(i)"></infinite>
  </tabs>
</template>

<script>
import tabs from 'components/Tabs';
import list from 'components/List';
import infinite from 'components/Infinite';
import { mapState, mapMutations } from 'vuex';
import { STARTAJAX, ENDAJAX } from 'store/types';

export default {
  name: 'app',
  components: {
    tabs,
    list,
    infinite
  },
  data() {
    return {
      tabs: ['全部', '精华', '分享', '问答', '招聘'],
      all: {
        list: [],
        loaded: false,
        nextPage: 1,
        end: false
      },
      good: {
        list: [],
        loaded: false,
        nextPage: 1,
        end: false
      },
      share: {
        list: [],
        loaded: false,
        nextPage: 1,
        end: false
      },
      ask: {
        list: [],
        loaded: false,
        nextPage: 1,
        end: false
      },
      job: {
        list: [],
        loaded: false,
        nextPage: 1,
        end: false
      }
    };
  },
  computed: {
    // currentType of string
    // 当前类型
    currentType() {
      return this.getType(this.page);
    },
    ...mapState({
      page: state => state.tabs.page,
      ajaxing: state => state.ajax.ajaxing
    })
  },
  watch: {
    // getTopics when toggle tabs
    // 当切换tabs时，获取topics数据
    currentType(type) {
      if (!this[type].loaded) {
        this.getTopics();
      }
    }
  },
  mounted() {
    this.getTopics();
  },
  methods: {
    // pass a number(1-5),return the corresponding type of string
    // 传递一个数字(1到5),返回对应的类型字符串值
    getType(i) {
      let type = {
        1: 'all',
        2: 'good',
        3: 'share',
        4: 'ask',
        5: 'job'
      };
      return type[i];
    },
    // get topics list from vue.data
    // 从vue实例的data里拿到主题列表
    getList(i) {
      return this[this.getType(i)].list;
    },
    // get currentType's topics data from http request
    // 通过http请求获取当前类型的主题数据
    getTopics() {
      // return when ajaxing is true
      // 当前正在进行ajax请求，退出
      if (this.ajaxing) {
        return;
      }

      // save type,use for end of ajax
      // 保存type值，以防异步进行时，this.currentType改变
      let type = this.currentType;

      // currentType is not have data
      // 当前类型数据已经完全加载
      if (this[type].end) {
        return;
      }

      this.$http.get('topics', {
        params: {
          tab: type,
          page: this[type].nextPage,
          limit: 20
        },
        timeout: 5000,
        before(request) {
          this.startAjax(request);
        }
      }).then((response) => {
        this.endAjax();

        // filter the data that not author info
        // 过滤没有作者信息的数据
        let data = response.body.data.filter((item) => {
          return Object.keys(item.author).length;
        });

        // it means this type loaded！
        // 进入这里意味着，此类型的数据已加载过
        this[type].loaded = true;

        // if don't have any data,set the end = true
        // 如果没有更多数据，设置end为true
        if (!data.length || data.length < 20) {
          this[type].end = true;
        }

        // push data and increment nextPage
        // 追加数据，并自增nextPage
        this[type].list.push(...data);
        this[type].nextPage++;
      }, (response) => {
        this.endAjax();
        window.alert('数据获取失败');
      });
    },
    ...mapMutations({
      startAjax: STARTAJAX,
      endAjax: ENDAJAX
    })
  }
};
</script>

<style lang="less">
</style>
