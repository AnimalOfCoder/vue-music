/**
 * 存储状态（也就是变量）
 */

import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  // 播放器相关
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1, // 当前播放索引
  // 歌单详情（推荐页面）
  disc: {},
  topList: [],
  searchHistory: loadSearch(), // 搜索历史
  playHistory: loadPlay(), // 播放历史
  favoriteList: loadFavorite() // 收藏列表
}

export default state
