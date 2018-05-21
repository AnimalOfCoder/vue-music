// 添加样式
export function addClass(el, className) {
  // 已存在样式则返回
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 判断是否已存在该样式
export function hasClass(el, className) {
  // 正则匹配：以className开头或空字符开头，并以className结尾或空字结尾
  let reg = new RegExp('(^|//s)' + className + '(//s|$)')
  return reg.test(el.className)
}
