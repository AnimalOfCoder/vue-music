import jsonp, {param} from 'common/js/jsonp'
import {commonParams, options} from './config'

// 获取歌曲真实地址
export function getSongUrl(songmid) {
  let url = `https://dl.stream.qqmusic.qq.com/C400${songmid}.m4a`
  _getVkey(songmid).then((res) => {
    if (res.code === 0) {
      console.log(res)
      const data = Object.assign({}, commonParams, {
        fromtag: 66,
        guid: _getGuid(),
        uin: 0,
        vkey: res.data.items[0].vkey
      })
      url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
      return url
    }
  })
}

// 获取vkey
function _getVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    loginUin: 0,
    platform: 'yqq',
    songmid: songmid,
    filename: 'C400' + songmid + '.m4a',
    guid: _getGuid()
  })

  return jsonp(url, data, options)
}

// 获取guid
function _getGuid() {
  let t = (new Date()).getUTCMilliseconds()
  let guid = Number(Math.round(2147483647 * Math.random()) * t % Math.pow(10, 10))
  return guid
}
