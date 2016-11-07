<template>
  <div class="tab-container">
    <ul class="tab-title-container ul-reset">
      <li class="tab-title" :class="{'active': index + 1 === currentPage}" v-for="(title, index) in tabTitles" :key="index" @click="setPage(index + 1)" v-text="title"></li>
    </ul>
    <div class="tab-swiper" @touchstart="onTouchSart">
      <div class="tab-swiper-wrap" ref="tab-swiper-wrap" :style="{'transform': 'translate3d(' + translateX + 'px,0,0)'}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabTitles: {
      type: Array,
      default: () => []
    },
    curPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      lastPage: 1,
      currentPage: this.curPage,
      translateX: 0,
      startTranslateX: 0,
      deltaX: 0,
      deltaY: 0,
      startPosX: null,
      startPosY: null,
      dragging: false,
      isScroll: false,
      slideEls: []
    };
  },
  watch: {
    curPage: () => {
      this.currentPage = this.curPage;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.slideEls = this.$refs['tab-swiper-wrap'].children;
      this.setPage(this.currentPage);
    });
  },
  methods: {
    // prev tab
    prev() {
      let page = this.currentPage;
      if (page > 1) {
        page--;
        this.setPage(page);
      } else {
        this.revert();
      }
    },
    // next tab
    next() {
      var page = this.currentPage;
      if (page < this.slideEls.length) {
        page++;
        this.setPage(page);
      } else {
        this.revert();
      }
    },
    // not changed tab
    revert() {
      this.setPage(this.currentPage);
    },
    // set tab page
    setPage(page) {
      this.lastPage = this.currentPage;
      this.currentPage = page;

      this.translateX = -[].reduce.call(this.slideEls, function(total, el, i) {
        return i > page - 2 ? total : total + el['clientWidth'];
      }, 0);
    },
    isPageChanged() {
      return this.currentPage !== this.lastPage;
    },
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
    onTouchMove(e) {
      this.deltaX = this.getTouchXPos(e) - this.startPosX;
      this.deltaY = Math.abs(this.getTouchYPos(e) - this.startPosY);
      // judge drag or scroll
      if (!this.dragging && !this.isScroll) {
        if (Math.abs(this.deltaX) / this.deltaY > 1.5) {
          e.preventDefault();
          e.stopPropagation();
          this.dragging = true;
        } else {
          this.isScroll = true;
        }
      }
      if (this.dragging) {
        e.preventDefault();
        e.stopPropagation();
        this.translateX = this.startTranslateX + this.deltaX;
      }
    },
    onTouchEnd(e) {
      if (this.dragging) {
        this.dragging = false;
        // drag time in 1 second is quickAction
        var isQuickAction = new Date().getTime() - this.startTime < 1000;
        // next
        if (this.deltaX < -100 || (isQuickAction && this.deltaX < -15)) {
          this.next();
        // prev
        } else if (this.deltaX > 100 || (isQuickAction && this.deltaX > 15)) {
          this.prev();
        // revert
        } else {
          this.revert();
        }
      }
      this.isScroll = false;
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
    },
    getTouchXPos(e) {
      let key = 'pageX';
      return e.changedTouches ? e.changedTouches[0][key] : e[key];
    },
    getTouchYPos(e) {
      let key = 'pageY';
      return e.changedTouches ? e.changedTouches[0][key] : e[key];
    },
    onTransitionStart() {
      if (this.isPageChanged()) {
        this.$emit('tab-change-start', this.currentPage);
      } else {
        this.$emit('tab-revert-start', this.currentPage);
      }
    }
  }
};
</script>

<style lang="less">
  .tab-container {
    width: 100%;
    >.tab-title-container {
      position: relative;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 0 auto;
      border-bottom: 1px solid #ddd;
      >.tab-title {
        flex: 1;
        position: relative;
        height: 1.066666rem;
        line-height: 1.066666rem;
        font-size: 0.533333rem;
        text-align: center;
        cursor: pointer;
        outline-style: none;
        &.active, &:active {
          border-bottom: 2px solid #36acf4;
          color: #36acf4;
        }
      }
    }

    >.tab-swiper {
      position: relative;
      overflow: hidden;
      >.tab-swiper-wrap {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        transition: all 0.2s ease;
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
