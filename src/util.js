/*
 * @Filename: util.js
 * @Author: jin
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-21 08:13:49
 */

/**
 * [isObject 判断是否为对象]
 * @param  {[any]}  value
 * @return {Boolean}
 */
export function isObject(value) {
  return typeof value === 'object' && value !== null
}

/**
 * [isElementNode 判断是否为元素节点]
 * @param  {[node]}  node
 * @return {Boolean}
 */
export function isElementNode(node) {
  return node.nodeType === 1
}

/**
 * [isTextNode 判断是否为文本节点]
 * @param  {[node]}  node
 * @return {Boolean}
 */
export function isTextNode(node) {
  return node.nodeType === 3
}

/**
 * [parseGetter 解析字符串，返回其值]
 * @param  {[string]} exp
 * @return {[any]}
 */
export function parseGetter(exp) {
  return function() {
    let arr = exp.split('.')
    let target = this
    while(arr.length > 1) {
      if(target[arr[0]]) {
        target = target[arr[0]]
        arr.shift()
      }
    }
    return target[arr[0]]
  }
}

/**
 * [parseAndSet 解析字符串，设置其值]
 * @param  {[obj]} vm
 * @param  {[string]} exp
 * @param  {[any]} value
 */
export function parseAndSet(vm, exp, value) {
  let arr = exp.split('.')
  let target = vm
  while(arr.length > 1) {
    if(target[arr[0]]) {
      target = target[arr[0]]
      arr.shift()
    }
  }
  target[arr[0]] = value
}

/**
 * [isDirective 判断属性是否为指令]
 * @param  {[string]}  attrName
 * @return {Boolean}
 */
export function isDirective(attrName) {
  return attrName.indexOf('v-') === 0
}

/**
 * [proxyData 代理数据]
 * @param  {[obj]} target
 * @param  {[obj]} source
 */
export function proxyData(target, source) {
  Object.keys(source).forEach(key => {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get() {
        return source[key]
      },
      set(newValue) {
        source[key] = newValue
      }
    })
  })
}
