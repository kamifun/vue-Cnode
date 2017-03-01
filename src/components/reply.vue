<template>
  <section class="reply-wrap">
    <textarea class="content" :class="{ err: showErr }" v-model="content" :placeholder="replyName && replyId ? '@' + replyName : ''"></textarea>
    <a class="button" v-text="btnText" @click="submitReply"></a>
  </section>
</template>

<script>
import { markdown } from 'markdown';
import { mapState, mapMutations } from 'vuex';
import { STARTAJAX, ENDAJAX } from 'store/types';

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
      showErr: false,
      // 小尾巴
      from: `
      **[from kamifun/vue-Cnode](https://github.com/kamifun/vue-Cnode)**`
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      ajaxing: state => state.ajax.ajaxing
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
        this.goToLogin();
        return;
      }

      // return when ajaxing is true
      // 当前正在进行ajax请求，退出
      if (this.ajaxing) {
        return;
      }

      let content = (this.replyName && this.replyId ? '@' + this.replyName + ' ' : '') + this.content + this.from;

      // 提交的数据
      let postData = {
        accesstoken: this.getToken(),
        content: content
      };
      // 回复别人
      if (this.replyId) {
        postData.reply_id = this.replyId;
      }
      // ajax提交
      this.$http.post('topic/' + this.topicId + '/replies', postData, {
        timeout: 5000,
        before(request) {
          this.startAjax(request);
        }
      }).then(({body}) => {
        this.endAjax();

        if (body.success) {
          this.content = '';
          this.$emit('replied', {
            author: {
              avatar_url: this.user.avatar_url,
              loginname: this.user.loginname
            },
            content: markdown.toHTML(this.linkUsers(content)),
            create_at: new Date(),
            id: body.reply_id,
            replyId: this.replyId || null,
            ups: []
          }, !!this.replyId);
          return;
        }
        window.alert(body.error_msg);
      }, ({body}) => {
        this.endAjax();
        window.alert(body.error_msg);
      });
    },
    ...mapMutations({
      startAjax: STARTAJAX,
      endAjax: ENDAJAX
    })
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
