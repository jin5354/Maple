/*
 * @Filename: example.js
 * @Author: jin
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-16 15:26:17
 */

import {Mvvm} from '../src/index.js'

let app = new Mvvm({
  el: '#app',
  data: {
    text: 'Hello mvvm!'
  },
  render() {
    return this.text
  },
  methods: {
    sayHi() {
      this.text = 'Hi!!'
    }
  }
})

window.clickHandle = () => {
  app.$data.text = 'Hi!!'
}
