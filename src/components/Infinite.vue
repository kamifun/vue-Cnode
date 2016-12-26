<template lang="html">
  <div class="infinite-list" @scroll="handleScroll">
    <ul ref="topic">
      <li class="above" :style="{height: aboveHeight + 'px'}"></li>
      <topic-list v-for="(item, index) in previewList" :item="item" :key="item.id"></topic-list>
      <li class="below" :style="{height: belowHeight + 'px'}"></li>
    </ul>
  </div>
</template>

<script>
import topicList from 'components/List';
import { mapState } from 'vuex';

export default {
  name: 'infinite',
  props: {
    list: {
      type: Array,
      default: [],
      required: true
    }
  },
  data() {
    return {
      aboveHeight: 0,
      belowHeight: 0,
      previewList: [],
      lastScrollTop: null,
      distance: 44,
      from: 0,
      to: 20
    };
  },
  computed: {
    ...mapState({
      height: state => state.list.height
    })
  },
  watch: {
    height(value) {
      this.rowsInWindow = Math.ceil(this.$el.offsetHeight / value);
      this.above = this.rowsInWindow * 1;
      this.below = this.rowsInWindow * 2;
      this.max = this.rowsInWindow * this.height;
    },
    list() {
      this.resetBelow();
    }
  },
  components: {
    topicList
  },
  methods: {
    handleScroll() {
      let scrollTop = this.$el.scrollTop;
      let height = this.$el.querySelectorAll('ul')[0].offsetHeight;
      let contentHeight = this.$el.offsetHeight;

      // if the maximum height is exceeded, reset the previewList
      // 如果滚动超过一屏的高度，重置previewList
      if (this.lastScrollTop === null || Math.abs(scrollTop - this.lastScrollTop) > this.max) {
        this.lastScrollTop = scrollTop;
      } else {
        // if the scrollTop will go to bottom, get more
        // 如果滚动到底部，发送ajax请求获取更多列表
        if (this.to === this.list.length && height - scrollTop - contentHeight < this.distance) {
          this.$emit('get-more');
        }
        return;
      }

      let from = parseInt(scrollTop / this.height) - this.above;
      if (from < 0) {
        from = 0;
      }
      let to = from + this.above + this.below + this.rowsInWindow;
      if (to > this.list.length) {
        to = this.list.length;
      }
      this.from = from;
      this.to = to;

      this.aboveHeight = from * this.height;
      this.belowHeight = (this.list.length - to) * this.height;

      this.resetPreviewList(from, to);
    },
    resetPreviewList(from, to) {
      let result = [];
      for (; from < to; from++) {
        result.push(this.list[from]);
      }
      this.previewList = result;
    },
    resetBelow() {
      let from = this.from || 0;
      let to = (this.to || 20) + (this.below || 0);
      let len = this.list.length;
      this.from = from;
      this.to = to;
      this.resetPreviewList(from, to <= len ? to : len);
      this.belowHeight = (len - to) * this.height;
    }
  }
};
</script>

<style lang="less">
</style>
