/*
 * @Filename: dep.js
 * @Author: jin5354
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-16 14:52:34
 */
let uid = 1

export class Dep {

  constructor() {
    this.id = uid++
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  depend() {
    Dep.target.addDep(this)
  }

  removeSub(sub) {
    let index = this.subs.indexOf(sub)
    if(index !== -1) {
      this.subs.splice(index, 1)
    }
  }

  notify() {
    console.log('notify!')
    console.log(this.subs)
    this.subs.forEach(sub => {
      sub.update()
    })
  }

}
