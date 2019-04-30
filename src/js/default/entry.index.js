import '../../css/index.scss'

import Vue from 'vue/dist/vue.js'
import '../common/a'

let name = 'Index123'

console.log(name)

class Person {
  constructor() {
    this.name = 'Lonely'
    this.age = '24'
  }

  showName() {
    console.log(this.name)
  }
}

let person = new Person()

person.showName()

window.onload = function () {
  let h1 = document.querySelector('.h1')
  setTimeout(() => {
    h1.style.top = 300 + 'px'
  }, 1500)

  new Vue({
    data: {
      title: 'Title'
    },
    methods: {
      clickHandler() {
        console.log('点击了')
      }
    }
  }).$mount('#app')

  let q = {}
  location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v)
  console.log(location.search)

  location.search.replace(/([^?&=]+)=([^&]+)/g, (str, k, v) => {
    console.log(str, k, v)
  })

  let str = 'ttss123ttsss456'
  str.replace(/^[a-z]*([123]*)[a-z]*([456]*)/g, (str, k, v) => {
    console.log('str:', str, '第一个组:', k, '第二个组:', v)
  })
}
