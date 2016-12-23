<template>
  <div class="grade">
    <span v-for="i in crown" class="crown"></span>
    <span v-for="i in sun" class="sun"></span>
    <span v-for="i in moon" class="moon"></span>
    <span v-for="i in star" class="star"></span>
    <span v-if="!level" class="star"></span>
  </div>
</template>

<script>
export default {
  name: 'grade',
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      crown: 0,
      sun: 0,
      moon: 0,
      star: 0
    };
  },
  computed: {
    // get level
    level() {
      let level = parseInt(Math.pow(this.score + 4, 1 / 2) - 2);
      this.crown = parseInt(level / 64) < 4 ? parseInt(level / 64) : 4;
      if (this.crown !== 4) {
        this.sun = parseInt((level % 64) / 16);
        this.moon = parseInt((level % 16) / 4);
        this.star = parseInt(level % 4);
      }
      return level;
    }
  }
};
</script>

<style lang="less" scoped>
  .grade {
    padding: .2rem 0;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    >span {
      float: left;
      width: .4rem;
      height: .4rem;
      background: url("../assets/grade.png") no-repeat left top;
      background-size: 2rem;
      &.sun {
        background-position: -.42rem top;
      }
      &.moon {
        background-position: -.82rem top;
      }
      &.star {
        background-position: -1.22rem top;
      }
    }
  }
</style>
