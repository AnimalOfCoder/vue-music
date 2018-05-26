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
    }
  },
  watch: {
    // 监听若data发生变化则刷新bs组件
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }

}
</script>

<style scoped>

</style>
