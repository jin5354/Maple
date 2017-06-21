/*
 * @Filename: observable.js
 * @Author: jin5354
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-21 07:43:48
 */

import {Dep} from './dep.js'
import {isObject} from './util.js'

export class Observable {
  constructor(value) {
    this.value = value
    this.Observify(value)
  }

  /**
   * [Observify 将指定对象响应化]
   * @param {[obj]} obj
   */
  Observify(obj) {
    if(!isObject(obj)) {
      return
    }
    if(Array.isArray(obj)) {
      for(let i = 0; i < obj.length; i++) {
        this.Observify(obj[i])
      }
      this.observifyArray(obj)
    }else {
      Object.keys(obj).forEach((key) => {
        this.defineReactive(obj, key, obj[key])
      })
    }
  }

  /**
   * [observifyArray 使数组响应化]
   * @param  {[array]} arr
   */
  observifyArray(arr) {
    const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
    let arrayAugmentations = Object.create(Array.prototype)

    aryMethods.forEach(method => {
      arrayAugmentations[method] = function(...arg) {
        Array.prototype[method].apply(this, arg)
      }
    })

    Object.setPrototypeOf(arr, arrayAugmentations)
  }

  /**
   * [defineReactive 将对象的某个 key 响应化]
   * @param  {[obj]} obj
   * @param  {[string]} key
   * @param  {[any]} value
   */
  defineReactive(obj, key, value) {

    let dep = new Dep()

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        if(Dep.target) {
          dep.depend()
        }
        return value
      },
      set: (newValue) => {
        if(newValue === value) {
          return
        }else {
          value = newValue
          this.Observify(newValue)
          dep.notify()
        }
      }
    })
    this.Observify(value)
  }

}
