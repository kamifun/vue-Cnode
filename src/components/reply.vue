<template>
  <section class="reply-wrap">
    <textarea class="content" :class="{ err: showErr }" v-model="content" :placeholder="replyName && replyId ? '@' + replyName : ''"></textarea>
    <a class="button" v-text="btnText" @click="submitReply"></a>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'reply',
  props: {
    topicId: {
      type: String,
      require: true
    },
    replyId: {
      type: String
    },
    replyName: {
      type: String
    }
  },
  data() {
    return {
      // textarea内容
      content: '',
      // 按钮文字
      btnText: '回复',
      // 是否提示错误
      showErr: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    // 提交回复
    submitReply() {
      // textarea内容为空，则显示错误
      if (!this.content) {
        this.showErr = true;
        return;
      }

      // 关闭错误
      this.showErr = false;
      let token = this.user.token;
      // 未登录处理
      if (!token) {
        return;
      }

      // 提交的数据
      let postData = {
        accesstoken: this.getToken(),
        content: (this.replyName && this.replyId ? '@' + this.replyName + ' ' : '') + this.content
      };
      // 回复别人
      if (this.replyId) {
        postData.reply_id = this.replyId;
      }
      // ajax提交
      this.$http.post('topic/' + this.topicId + '/replies', postData).then(({body}) => {
        if (body.success) {
          this.content = '';
          this.$emit('replied');
          return;
        }
        window.alert(body.error_msg);
      }, ({body}) => {
        window.alert(body.error_msg);
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .reply-wrap {
    padding: .2rem;
  }
  .content {
    padding: .2rem;
    display: block;
    width: 100%;
    height: 3rem;
    border-radius: .1rem;
    resize: none;
    &.err {
      border: 1px solid red;
    }
  }
  .button {
    margin-top: .5rem;
    display: block;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: .5rem;
    text-align: center;
    color: #000;
    border-radius: .1rem;
    background: #dce775;
  }
</style>
