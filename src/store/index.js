/**
 * 入口
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // 修改日志

// 注册vuex插件
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // 开发环境中为true，否则为false

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, // 开发环境下严格模式开启
  plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
})
