<template lang="html">
  <section class="login pt-header">
    <input type="text" class="token" name="token" placeholder="Access Token" v-model="token">
    <button type="button" class="button" name="button" @click="login">登录</button>
  </section>
</template>

<script>
import {mapMutations} from 'vuex';
import {STARTAJAX, ENDAJAX} from 'store/types';

export default {
  name: 'login',
  data() {
    return {
      token: ''
    };
  },
  methods: {
    login() {
      if (!this.token) {
        return;
      }

      let token = this.token;
      this.$http.post('accesstoken', {
        accesstoken: this.token
      }, {
        timeout: 5000,
        before(request) {
          this.startAjax(request);
        }
      }).then(({body}) => {
        this.endAjax();
        if (body.success) {
          window.sessionStorage.setItem('token', token);
          window.sessionStorage.setItem('user', body.loginname);

          this.$router.push({
            name: this.$route.query.redirect || 'user',
            params: {
              loginname: body.loginname
            }
          });
        }
      }, (error) => {
        this.endAjax();
        console.log(error);
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
  .login {
    padding: 2rem .5rem 0 .5rem;
    text-align: center;
    >.token {
      display: block;
      margin: .5rem 0;
      padding: .2rem .1rem;
      width: 100%;
      font-size: .35rem;
      border-radius: .1rem;
      border: 1px solid #ddd;
    }
    >.button {
      display: block;
      width: 100%;
      height: .8rem;
      color: #fff;
      font-size: .5rem;
      border-radius: .1rem;
      background: #80bd01;
      border: 1px solid #76ae01;
    }
  }
</style>
