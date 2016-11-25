<template>
  <div class="tab-container">
    <div class="tab-swiper" @touchstart="onTouchSart">
      <div class="tab-swiper-wrap" :class="{'dragging': dragging}" ref="tab-swiper-wrap" :style="{'transform': 'translate3d(' + translateX + 'px,0,0)'}">
        <slot></slot>
      </div>
    </div>
    <ul class="tab-title-container">
      <li class="tab-title" :class="{'active': index + 1 === page}" v-for="(title, index) in tabTitles" :key="index" @click="setPage(index + 1)" v-text="title"></li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SETPAGE, INCREMENT, REDUCTION, STARTDRAG, ENDDRAG } from 'store/types';

export default {
  props: {
    tabTitles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      translateX: 0,
      startTranslateX: 0,
      deltaX: 0,
      deltaY: 0,
      startPosX: null,
      startPosY: null,
      isScroll: false,
      slideEls: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.slideEls = this.$refs['tab-swiper-wrap'].children;
    });
  },
  computed: {
    // get vuex state
    ...mapState({
      page: state => state.tabs.page,
      dragging: state => state.tabs.dragging
    })
  },
  watch: {
    // watch page to changeTranslateX on the change
    // 监听page，当值改变时触发changeTranslateX
    page() {
      this.changeTranslateX();
    }
  },
  methods: {
    // prev tab
    prev() {
      if (this.page > 1) {
        this.reduction();
      }
    },
    // next tab
    next() {
      if (this.page < this.slideEls.length) {
        this.increment();
      }
    },
    // edit translateX according to page
    // 根据page修改translateX
    changeTranslateX() {
      this.translateX = -[].reduce.call(this.slideEls, (total, el, i) => {
        return i > this.page - 2 ? total : total + el['clientWidth'];
      }, 0);
    },
    // Record the current location on touchstart，also add touchmove and touchend event
    // 在touchstart时，记录开始位置、时间，并添加touchmove和touchend事件
    onTouchSart(e) {
      this.startPosX = this.getTouchXPos(e);
      this.startPosY = this.getTouchYPos(e);
      this.deltaX = 0;
      this.deltaY = 0;
      this.startTranslateX = this.translateX;
      this.startTime = new Date().getTime();

      document.addEventListener('touchmove', this.onTouchMove, false);
      document.addEventListener('touchend', this.onTouchEnd, false);
    },
    // change translateX on touchmove
    // 在touchmove时，改变translateX值
    onTouchMove(e) {
      this.deltaX = this.getTouchXPos(e) - this.startPosX;
      this.deltaY = Math.abs(this.getTouchYPos(e) - this.startPosY);
      // judge drag or scroll
      // 判定是切换选项卡还是滚动列表
      if (!this.dragging && !this.isScroll) {
        if (Math.abs(this.deltaX) / this.deltaY > 1.5) {
          e.preventDefault();
          e.stopPropagation();
          this.startDrag();
        } else {
          this.isScroll = true;
        }
      }

      // Prevents the scroll behavior when it is dragging;
      // 当我们在进行滑动切换时，阻止滚动行为
      if (this.dragging) {
        e.preventDefault();
        e.stopPropagation();
        this.translateX = this.startTranslateX + this.deltaX;
      }
    },
    // decide whether to change the page
    // 判定是否改变page
    onTouchEnd(e) {
      if (this.dragging) {
        this.endDrag();
        // drag time in 1 second is quickAction
        var isQuickAction = new Date().getTime() - this.startTime < 1000;
        // next
        if (this.deltaX < -100 || (isQuickAction && this.deltaX < -15)) {
          this.next();
        // prev
        } else if (this.deltaX > 100 || (isQuickAction && this.deltaX > 15)) {
          this.prev();
        // revert
        }
        this.changeTranslateX();
      }
      this.isScroll = false;
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
    },
    // get left of position on touch
    // 传入touch事件对象，获取此时在页面的X值
    getTouchXPos(e) {
      let key = 'pageX';
      return e.changedTouches ? e.changedTouches[0][key] : e[key];
    },
    // get top of position on touch
    // 传入touch事件对象，获取此时在页面的Y值
    getTouchYPos(e) {
      let key = 'pageY';
      return e.changedTouches ? e.changedTouches[0][key] : e[key];
    },
    // get vuex mutations
    ...mapMutations({
      setPage: SETPAGE,
      increment: INCREMENT,
      reduction: REDUCTION,
      startDrag: STARTDRAG,
      endDrag: ENDDRAG
    })
  }
};
</script>

<style lang="less">
  .tab-container {
    width: 100%;
    height: 100%;
    >.tab-title-container {
      position: absolute;;
      left: 0;
      bottom: 0;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 0 auto;
      border-top: 1px solid #ddd;
      background: #fff;
      >.tab-title {
        flex: 1;
        position: relative;
        height: 34px;
        line-height: 34px;
        text-align: center;
        cursor: pointer;
        outline-style: none;
        &.active, &:active {
          border-top: 2px solid #36acf4;
          color: #36acf4;
        }
      }
    }

    >.tab-swiper {
      position: relative;
      padding-bottom: 35px;
      height: 100%;
      overflow: hidden;
      >.tab-swiper-wrap {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        transition: all 0.2s ease;
        &.dragging {
          transition: none;
        }
        >div {
          overflow-x: hidden;
          flex-shrink: 0;
          width: 100%;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0;
  }
</style>
