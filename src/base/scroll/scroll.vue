<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {

  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    // 是否需要监听滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 是否需要上拉刷新
    pullup: {
      type: Boolean,
      default: false
    },
    // 延迟刷新时间
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      // 若需要监听滚动事件
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          // 派发scroll事件
          me.$emit('scroll', pos)
        })
      }
      // 若需要上拉刷新
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 若滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    enable() {
      // 实例存在则开启
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 滚动到目标元素
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    // 监听若data发生变化则刷新bs组件
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }

}
</script>

<style scoped>

</style>
