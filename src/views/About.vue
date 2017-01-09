<template>
  <section class="pt-header">
    <dl>
      <dt>关于项目</dt>
      <dd>
        使用Cnode.js社区API,基于vue、vue-router、vuex、vue-resource重写node社区的web app
      </dd>
    </dl>
    <dl>
      <dt>项目源码</dt>
      <dd>
        <a href="https://github.com/kamifun/vue-Cnode">https://github.com/kamifun/vue-Cnode</a>
      </dd>
    </dl>
    <dl>
      <dt>issues反馈</dt>
      <dd>
        <a href="https://github.com/kamifun/vue-Cnode/issues">https://github.com/kamifun/vue-Cnode/issues</a>
      </dd>
    </dl>
    <dl>
      <dt>版本</dt>
      <dd>
        v0.0.1
      </dd>
    </dl>
  </section>
</template>

<script>
export default {
  name: 'about'
};
</script>

<style lang="less" scoped>
  dl {
    padding: .5rem .5rem 0;
    font-size: .4rem;
    line-height: 1.5;
    dt {
      font-weight: bold;
    }
    dd {
      font-size: .3rem;
    }
  }
</style>
