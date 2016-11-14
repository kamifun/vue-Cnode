<template>
  <tabs :tabTitles="tabs">
    <div class="tab-content-container" v-for="i in tabs.length">
      <ul class="ul-reset fun-reset">
        <list v-for="(item, index) in getList(i)" :item="item"></list>
      </ul>
    </div>
  </tabs>
</template>

<script>
import tabs from 'components/Tabs';
import list from 'components/List';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    tabs,
    list
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
      page: state => state.tabs.page
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
      // save type,use for end of ajax
      // 保存type值，以防异步进行时，this.currentType改变
      let type = this.currentType;

      // currentType is not have data
      // 当前类型数据已经完全加载
      if (this[type].end) {
        return;
      }

      this.$http.get('/api/v1/topics', {
        params: {
          tab: type,
          page: this[type].nextPage,
          limit: 20
        },
        timeout: 10000
      }).then((response) => {
        let data = response.body.data;
        this[type].loaded = true;
        if (data.length) {
          this[type].list.push(...data);
          this[type].nextPage++;
          return;
        }
        this[type].end = true;
      }, (response) => {
        console.log('数据获取失败');
      });
    }
  }
};
</script>

<style lang="less">
  .tab-content-container {
    position: relative;
  }
</style>
