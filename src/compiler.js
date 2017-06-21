/*
 * @Filename: compiler.js
 * @Author: jin5354
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-06-21 08:14:18
 */
import {Directive} from './directive.js'
import {Watcher} from './watcher.js'
import {isElementNode, isTextNode, isDirective} from './util.js'

const reg = /\{\{(.*)\}\}/

export class Compiler {

  constructor(vm) {
    this.vm = vm
    this.vm.$el = this.$el = document.querySelector(this.vm.$options.el)
    if(this.vm.$options.render) {
      this.$el.innerHTML = this.vm.$options.render.call(this.vm)
      new Watcher(this.vm, this.vm.$options.render, (newValue) => {
        this.$el.innerHTML = newValue
      })
    }else if(this.vm.$options.template) {
      this.vm.$fragment = this.transclude(this.vm.$options.template)
      this.compile(this.vm.$fragment)
      this.$el.appendChild(this.vm.$fragment)
    }
  }

  /**
   * [transclude 将模板转换为 fragment]
   * @param  {[any]} template
   * @return {[fragment]}
   */
  transclude(template) {
    if(typeof template === 'string') {
      return this.stringToFragment(template)
    }
  }

  /**
   * [stringToFragment 将模板字符串转换为 fragment]
   * @param  {[string]} templateString
   * @return {[fragment]}
   */
  stringToFragment(templateString) {
    let frag = document.createDocumentFragment()
    let node = document.createElement('div')

    node.innerHTML = templateString.trim()
    frag.appendChild(node.childNodes[0])

    return frag
  }

  /**
   * [compile 编译 fragment]
   * @param  {[fragment]} fragment
   */
  compile(fragment) {
    let childNodes = Array.from(fragment.childNodes)

    childNodes.forEach(node => {
      if(isElementNode(node)) {
        this.compileElementNode(node)
      }else if(isTextNode(node) && reg.test(node.textContent)) {
        this.compileTextNode(node)
      }

      if(node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })

  }

  /**
   * [compileTextNode 编译文本节点]
   * @param  {[node]} node
   */
  compileTextNode(node) {
    let text = node.textContent.match(reg)[1]
    this.vm.$directive.push(new Directive('text', node, this.vm, text))
  }

  /**
   * [compileElementNode 编译元素节点]
   * @param  {[node]} node
   */
  compileElementNode(node) {
    let attrs = Array.from(node.attributes)
    attrs.forEach(attr => {
      if(isDirective(attr.name)) {
        let exp = attr.value
        let dir = attr.name.substring(2)
        this.vm.$directive.push(new Directive(dir, node, this.vm, exp))
      }
    })

  }

}
