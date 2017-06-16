/*
 * @Filename: compiler.js
 * @Author: jin5354
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-16 14:58:16
 */
import {Watcher} from './watcher.js'

export class Compiler {
  constructor(vm) {
    this.vm = vm
    this.vm.$el = this.$el = document.querySelector(this.vm.$options.el)
    if(this.vm.$options.render) {
      this.$el.innerHTML = this.vm.$options.render.call(this.vm)
      new Watcher(this.vm, this.vm.$options.render, (newValue) => {
        this.$el.innerHTML = newValue
      })
    }
  }
}
