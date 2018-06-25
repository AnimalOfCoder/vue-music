export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id // songId
    this.mid = mid // songMid
    this.singer = singer // 歌手
    this.name = name // 歌曲名称
    this.album = album // 专辑名称
    this.duration = duration // 歌曲长度
    this.image = image // 歌曲图片
    this.url = url // 歌曲真实地址
  }
}

// 工厂方法
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: musicData.songmid
  })
}

// 处理歌手方法
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
