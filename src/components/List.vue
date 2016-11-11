<template>
  <li>
    <router-link :to="'/topics/' + item.id">
      <h3 v-text="item.title" data-title="置顶" :class="titleType"></h3>
      <div class="content">
        <img :src="item.author.avatar_url" alt="item.author.loginname" />
        <div class="info">
          <p>
            <span class="name" v-text="item.author.loginname"></span>
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
    titleType() {
      if (this.item.top) {
        return 'top';
      }
      if (this.item.good) {
        return 'good';
      }
      return this.item.tab;
    }
  },
  filters: {
    getLastTimeStr(time) {
      let agoDate = new Date(time);
      let nowDate = new Date();
      let array = [
        {
          time: nowDate.getFullYear() - agoDate.getFullYear(),
          s: '年前'
        },
        {
          time: (nowDate.getMonth() + 1) - (agoDate.getMonth() + 1),
          s: '月前'
        },
        {
          time: nowDate.getDate() - agoDate.getDate(),
          s: '天前'
        },
        {
          time: nowDate.getHours() - agoDate.getHours(),
          s: '小时前'
        },
        {
          time: nowDate.getMinutes() - agoDate.getMinutes(),
          s: '分钟前'
        },
        {
          time: nowDate.getSeconds() - agoDate.getSeconds(),
          s: '秒前'
        }
      ];
      for (var i = 0, len = array.length; i < len; i++) {
        console.log(array[i]['time']);
        if (array[i]['time'] >= 1) {
          return array[i]['time'] + array[i]['s'];
        }
      }
      return '0秒前';
    }
  }
};
</script>

<style lang="less" scoped>
  li {
    border-bottom: 1px solid #d5dbdb;
    a {
      padding: 10px 15px;
      display: block;
    }
    h3 {
      color: #2c3e50;
      font-size: 16px;
      line-height: 1.5;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:before {
        content: attr(data-title);
        margin-right: 10px;
        margin-top: -3px;
        color: #ffffff;
        padding: 5px 6px;
        font-size: 10px;
        font-weight: 400;
        border-radius: 4px;
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
      padding-top: 10px;
      display: flex;
      >img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        border: 1px solid #F3F3F3;
      }
      >.info {
        flex: 1;
      }
      p {
        color: #34495e;
        font-size: 12px;
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
