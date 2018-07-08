<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singerList" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Singer from 'common/js/singer'
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

// 热门歌手长度
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
  mixins: [playlistMixin],
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    // 选中歌手时触发的方法
    selectSinger(singer) {
      // 路由至歌手详情页
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    // 获取歌手列表数据
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singerList = this._nomarlizeSinger(res.data.list)
        }
      })
    },
    // 处理歌手数据
    _nomarlizeSinger(list) {
      let map = {
        // 热门歌手
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        // 处理热门歌手数据
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        // 按索引分装歌手数据
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 由于js对象属性是无序的，因此要保证顺序，必须使用数组
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 升序排序
      ret.sort((a, b) => {
        return a.title.charCodeAt() - b.title.charCodeAt()
      })
      return hot.concat(ret)
    },
    // 映射mutations中的方法（vuex写数据的语法糖）
    ...mapMutations({
      setSinger: 'SET_SINGER' // 将 `this.setSinger()` 映射为 `this.$store.commit('SET_SINGER')`
    })
  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
