import '../../css/index.scss';

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


let person = new Person

person.showName()



window.onload = function() {
  let h1 = document.querySelector('.h1')
  setTimeout(() => {
    h1.style.top = 300 + 'px'
  }, 1500)
  
  let vue = new Vue({
    data: {
        title: 'Title'
    },
    methods: {
      clickHandler() {
        console.log('点击了')
      }
    }
  }).$mount("#app")
}