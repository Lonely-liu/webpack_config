import '../common/a';

import '../../css/about.scss';


class Person {
  constructor() {
    this.age = '24'
    this.name = 'Lonely'
  }

  showName() {
    console.log(this.name)
  }
}




window.onload = function () {
  let btn = document.getElementById('btn')
  let person = new Person()

  person.showName()

  function clickHandler() {
    btn.addEventListener('click', function () {
      console.log('======')
    })
  }

  clickHandler()

}


console.log('this is about page')