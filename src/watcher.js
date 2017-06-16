/*
 * @Filename: watcher.js
 * @Author: jin5354
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-16 14:53:25
 */

import {Dep} from './dep.js'

export class Watcher {

  constructor(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.depIds = new Set()
    this.cb = cb
    this.value = this.subAndGetValue()
  }

  update() {
    let value = this.subAndGetValue()
    let oldValue = this.value
    if(value !== oldValue) {
      this.value = value
      this.cb.call(this.vm, value, oldValue)
    }
  }

  subAndGetValue() {
    Dep.target = this
    let value = this.exp.call(this.vm)
    Dep.target = null
    return value
  }

  addDep(dep) {
    if(!this.depIds.has(dep.id)) {
      this.depIds.add(dep.id)
      dep.addSub(this)
    }
  }

}
