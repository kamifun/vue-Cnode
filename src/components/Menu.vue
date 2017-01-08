<template lang="html">
  <section class="side-bar" v-if="user.isLogin">
    <div class="user-info">
      <router-link :to="{}" class="portrait">
        <img :src="user.avatar_url || require('../assets/kamifun.jpg')" alt="" />
        <div v-text="user.loginname"></div>
      </router-link>
      <grade :score="user.score"></grade>
      <p class="created">
        创建于:{{ user.create_at | getLastTimeStr }}
      </p>
    </div>
    <nav>
      <router-link class="iconfont icon-dog item" :to="{name: 'user', params: {loginname: 'kamifun'}}">个人资料</router-link>
      <router-link class="iconfont icon-community item" :to="{name: 'message'}">消息列表</router-link>
      <router-link class="iconfont icon-information item" :to="{name: 'about'}">关于vue-cn</router-link>
    </nav>
  </section>

  <section class="side-bar" v-else>
    <div class="login">
      <router-link class="login-btn" :to="{name: 'login'}">登录</router-link>
    </div>
    <nav>
      <router-link class="iconfont icon-information item" :to="{name: 'about'}">关于vue-cn</router-link>
    </nav>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { RESETUSER } from 'store/types';
import grade from 'components/Grade';

export default {
  name: 'side',
  components: {
    grade
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapMutations({
      resetUser: RESETUSER
    })
  }
};
</script>

<style lang="less" scoped>
  .img {
    width: .8rem;
    height: .8rem;
    margin-right: .2rem;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  .side-bar {
    width: 6rem;
    overflow: hidden;
    >.user-info {
      padding: 1rem 0 0 .4rem;
      background: #dce775;
      >.portrait {
        display: flex;
        >img {
          .img();
        }
        >div {
          flex: 1;
          font-size: .8rem;
          line-height: 1;
          color: #fff;
        }
      }
      >.created {
        padding-bottom: .2rem;
        font-size: .3rem;
        color: #fff;
      }
    }
    >.login {
      position: relative;
      height: 5rem;
      background: #dce775;
      >.login-btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 2rem;
        text-align: center;
        line-height: 1rem;
        font-size: .6rem;
        color: white;
        border-radius: .1rem;
        background: rgb(0, 188, 212);
      }
    }
    >nav {
      padding-top: .38rem;
      >.item {
        padding: 0 .45rem;
        display: block;
        font-size: .38rem;
        font-weight: 700;
        color: #313131;
        line-height: 2.5;
        font-weight: normal;
        &:hover {
          background: #e6e6e6;
        }
        &:before {
          font-size: .5rem;
          margin-right: .5rem;
          color: #1c171b;
          font-weight: bold;
        }
      }
    }
  }
</style>
