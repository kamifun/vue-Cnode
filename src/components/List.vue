<template>
  <li ref="itemList">
    <router-link :to="'/topic/' + item.id">
      <h3 v-text="item.title" :data-title="getTag(item.top, item.good, item.tab)" :class="titleType"></h3>
      <div class="content">
        <img :src="item.author && item.author.avatar_url" :alt="item.author && item.author.loginname" />
        <div class="info">
          <p>
            <span class="name" v-text="item.author && item.author.loginname"></span>
            <span class="status">
              <b v-text="item.reply_count"></b> /{{ item.visit_count }}
            </span>
          </p>
          <p>
            <time>{{ item.create_at | getLastTimeStr }}</time>
            <time>{{ item.last_reply_at | getLastTimeStr }}</time>
          </p>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SETHEIGHT } from 'store/types';

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    // get topic's type for title class
    // 获取topic的类型，作为标题的class
    titleType() {
      if (this.item.top) {
        return 'top';
      }
      if (this.item.good) {
        return 'good';
      }
      return this.item.tab;
    },
    ...mapState({
      height: state => state.list.height
    })
  },
  mounted() {
    this.$nextTick(() => {
      // when the height is 0, call setHeight
      // 当height为0时，调用setHeight
      !this.height && this.setHeight(this.$refs.itemList.offsetHeight);
    });
  },
  methods: {
    ...mapMutations({
      setHeight: SETHEIGHT
    })
  }
};
</script>

<style lang="less" scoped>
  li {
    border-bottom: 1px solid #d5dbdb;
    a {
      padding: .15rem .20rem;
      display: block;
      &:active {
        background-color: rgba(131, 180, 232, .4);;
      }
    }
    h3 {
      color: #2c3e50;
      font-size: .35rem;
      line-height: 1.5;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:before {
        content: attr(data-title);
        margin-right: .28rem;
        margin-top: -.2rem;
        color: #ffffff;
        padding: .10rem .15rem;
        font-size: .24rem;
        font-weight: 400;
        border-radius: .1rem;
        background-color: #e7e7e7;
      }
      &.top:before {
        background-color: #E74C3C;
      }
      &.good:before {
        background-color: #E67E22;
      }
      &.ask:before {
        background-color: #3498DB;
      }
      &.share:before {
        background-color: #1ABC9C;
      }
      &.job:before {
        background-color: #9B59B6;
      }
    }
    .content {
      padding-top: .2rem;
      display: flex;
      >img {
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: .2rem;
        border: 1px solid #F3F3F3;
      }
      >.info {
        flex: 1;
      }
      p {
        &:first-child {
          font-size: .3rem;
        }
        color: #34495e;
        font-size: .28rem;
        display: flex;
      }
      .name, time:first-child {
        flex: 1;
      }
      b {
        color: #42b983;
      }
    }
  }
</style>
