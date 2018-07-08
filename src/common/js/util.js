/**
 * 洗牌函数
 * 功能：传入一个数组，将数组里元素乱序，并返回一个新数组，并不改变原来数组
 * 实现方式：通过遍历数组，通过一个随机索引与当前索引进行元素交换
 */
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 返回min与max之间的随机数（包含max）
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
