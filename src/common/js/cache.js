import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15 // 搜索列表最大存储空间

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200 // 最近放歌曲历史最大存储空间

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200 // 收藏歌曲最大存储空间
/**
 *
 * @param arr 将插进的数组
 * @param val
 * @param compare 比较函数，比较当前数组arr是否存在val
 * @param maxLen
 */
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  // 若为第一条数据，直接插入即可
  if (index === 0) {
    return
  }
  // 若不为第一条，删除重复的，再插入
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  // 插入后，若最大长度限制存在，且arr长度大于最大长度，则删除arr最后一个元素
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

/**
 *
 * @param arr 要操作的数组
 * @param compare 比较函数
 */
function deleteFromArry(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 保存搜索记录
export function saveSearch(query) {
  // 从localstorae中获取数组，若不存在该数组，则新建一个数组
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  // 存入缓存
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 读取本地缓存里的搜索记录
export function loadSearch() {
  // 从localstorae中获取数组，若不存在该数组，则新建一个数组
  return storage.get(SEARCH_KEY, [])
}

// 删除搜索记录
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArry(searches, (item) => {
    return item === query
  })
  // 保存数组
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清空搜索记录
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 保存播放历史
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 读取播放历史
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 收藏歌曲
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 取消收藏歌曲
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArry(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 加载收藏列表
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
