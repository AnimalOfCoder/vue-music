<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- 当获取到recommends时才去渲染slider-->
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends" :key="item.value">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl" @load="loadImage">
              </a>
            </div>
          </slider>
        </div>
        <!-- 歌单 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul style="height: 100%;overflow: hidden;">
            <li v-for="item in discList" :key="item.value" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- loading -->
      <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    // 获取轮播图
    this._getRecommend()
    // 获取歌单
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
          console.log(this.discList)
        }
      })
    },
    // 防止sroll组件刷新时轮播图未加载，造成计算缺失。因此当轮播图加载时，刷新一次scroll组件
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
