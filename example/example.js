/*
 * @Filename: example.js
 * @Author: jin
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-21 11:00:21
 */

import {Maple} from '../src/index.js'

window.data = {
  text1: {
    text2: {
      text3: 'Hello World!'
    },
    text4: 'This is text 4!',
    text5: 'Test'
  }
}

let app = new Maple({
  el: '#app',
  data: window.data,
  // render() {
  //   return this.text1.text2.text3
  // },
  template: `
    <div>
      <p>{{text1.text2.text3}}</p>
      <p v-text="text1.text4"></p>
      <input type="text" v-model="text1.text5" />
    </div>
  `,
  methods: {
    sayHi() {
      this.text1.text2.text3 = 'Hi!!'
    }
  }
})

window.clickHandle = () => {
  app.text1.text2 = {
    text3: 'Hi!!!'
  }
}
