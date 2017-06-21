/*
 * @Filename: index.js
 * @Author: jin5354
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-21 10:59:06
 */

import {Observable} from './observable.js'
import {Compiler} from './compiler.js'
import {proxyData} from './util.js'

export class Maple {
  constructor(options) {
    this.$options = options
    this.$data = options.data || {}
    proxyData(this, this.$data)
    this.$observable = new Observable(this.$data)
    this.$directive = []
    this.$compile = new Compiler(this)
  }
}
