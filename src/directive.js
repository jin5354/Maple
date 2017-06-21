/*
 * @Filename: directive.js
 * @Author: jin5354
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-21 08:13:15
 */
import {Watcher} from './watcher.js'
import {parseAndSet, parseGetter} from './util.js'

/*
 *
 *  目前支持：
 *  v-text
 *  v-html
 *  v-model
 */

export class Directive {

  constructor(name, node, vm, exp) {
    this.name = name
    this.node = node
    this.vm = vm
    this.exp = exp
    this.expFn = parseGetter(exp)

    this.bindEvent(this.name, this.node, this.vm, this.exp)
    let updater = this.getUpdater(this.name, this.node)
    updater(this.expFn.call(this.vm))
    this.$watcher = new Watcher(this.vm, this.expFn, updater)
  }

  /**
   * [getUpdater 获取不同指令的回调函数]
   * @param  {[string]} name
   * @param  {[node]} node
   * @return {[function]}
   */
  getUpdater(name, node) {
    switch(name) {
      case 'text': {
        return function(value) {
          node.textContent = value
        }
      }
      case 'html': {
        return function(value) {
          node.innerHTML = value
        }
      }
      case 'model': {
        return function(value) {
          node.value = value
        }
      }
    }
  }

  /**
   * [bindEvent 执行不同指令的事件处理器]
   * @param  {[string]} name
   * @param  {[node]} node
   * @param  {[vm]} vm
   * @param  {[string]} exp
   */
  bindEvent(name, node, vm, exp) {
    switch(name) {
      case 'model': {
        node.addEventListener('input', e => {
          parseAndSet(vm, exp, e.target.value)
        })
      }
    }
  }

}
