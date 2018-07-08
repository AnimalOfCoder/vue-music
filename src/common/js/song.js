import {ERR_OK} from 'api/config'
import {getLyric} from 'api/song'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id // songId
    this.mid = mid // songMid
    this.singer = singer // 歌手
    this.name = name // 歌曲名称
    this.album = album // 专辑名称
    this.duration = duration // 歌曲长度
    this.image = image // 歌曲图片
    this.filename = `C400${this.mid}.m4a`
    this.url = url // 歌曲真实地址
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          // eslint-disable-next-line
          reject('no lyric')
        }
      })
    })
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
    url: 'http://ws.stream.qqmusic.qq.com/C100' + musicData.songmid + '.m4a?fromtag=0&guid=126548448'
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
