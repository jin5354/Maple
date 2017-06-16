/*
 * @Filename: index.js
 * @Author: jin5354
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-16 14:36:05
 */

import {Observable} from './observable.js'
import {Compiler} from './compiler.js'

export class Mvvm {
  constructor(options) {
    this.$options = options
    this.$data = options.data || {}
    this.proxyData(this.$data)
    this.$observable = new Observable(this.$data)
    this.$compile = new Compiler(this)
  }

  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          data[key] = newValue
        }
      })
    })
  }

}
