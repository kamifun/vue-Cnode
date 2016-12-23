<template lang="html">
  <section class="side-bar">
    <div class="user-info">
      <router-link :to="{}" class="portrait">
        <img :src="user.avatar_url" alt="" />
        <div v-text="user.loginname"></div>
      </router-link>
      <grade :score="user.score"></grade>
      <p class="created">
        创建于:{{ user.create_at | getLastTimeStr }}
      </p>
    </div>
    <nav>
      <router-link class="iconfont icon-information item" :to="{name: 'home'}">个人资料</router-link>
      <router-link class="iconfont icon-information item" :to="{name: 'home'}">消息列表</router-link>
      <router-link class="iconfont icon-information item" :to="{name: 'home'}">关于vue-cn</router-link>
    </nav>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SETUSER, RESETUSER } from 'store/types';
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
      setUser: SETUSER,
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
          font-size: .4rem;
          margin-right: .5rem;
          color: #1c171b;
        }
      }
    }
  }
</style>
