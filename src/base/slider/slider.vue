<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="item"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'

export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    // 是否可以轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 时间间隔
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    // 浏览器刷新通常是17ms一次，设置20ms可以保证DOM渲染完毕
    setTimeout(() => {
      this._setSliderWidth()
      // betterScroll会默认拷贝轮播图片首位的图，目的是实现无缝滚动，因此_initDots需放在_initSlider前
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    // 监听窗口改变事件
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      // 重新计算
      this._setSliderWidth(true)
      // bs重新刷新
      this.slider.refresh()
    })
  },
  methods: {
    // 设置轮播宽度
    _setSliderWidth(isResize) {
      // 获取sliderGroup下所有子元素
      this.children = this.$refs.sliderGroup.children
      let width = 0
      // 获取slider内部宽度
      let sliderWidth = this.$refs.slider.clientWidth
      // 循环为每个子元素添加样式、设置宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        // 子元素与slider内部宽度相同
        child.style.width = sliderWidth + 'px'
        // 累加总宽度
        width += sliderWidth
      }

      // isResize为true时，此时已经初始化好bs了，所以不用再加两倍宽度了
      if (this.loop && !isResize) {
        // 循环播放bs会在首尾各加一张图,因此总宽度还要加两倍的宽度
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化轮播
    _initSlider() {
      // 初始化betterScroll
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false, // 关闭滚动动画
        snap: true, // 开启循环轮播
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
      // 监听一次滚动开始之前
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
      // 监听一次滚动结束
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        // 若为轮播
        if (this.loop) {
          // currentPageIndex从0开始
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        // 每次滚动结束，若为轮播则自动播放
        if (this.autoPlay) {
          clearTimeout(this.timer) // 防止手动滚动时，轮播触发
          this._play()
        }
      })
    },
    // 初始化轮播图的导航点
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    // 播放
    _play() {
      // 下张图片索引
      let pageIndex = this.currentPageIndex + 1
      // 若为轮播
      if (this.loop) {
        pageIndex += 1
      }
      // 按 interval 的时间间隔轮播
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      left: 0
      right: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        background: $color-text-l
        width: 8px
        height: 8px
        border-radius: 50%
        margin: 0 4px
        &.active
          background: $color-text-ll
</style>
