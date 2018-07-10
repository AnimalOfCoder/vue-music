/**
 * 存储状态（也就是变量）
 */

import {playMode} from 'common/js/config'

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
  disc: {}
}

export default state
