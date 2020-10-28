---
title: 🍎객체 지향 프로그래밍 (4) Prototype
date: 2020-10-28 18:00:00
category: development
draft: false
---

## ♻️Prototype 이란?

정의 : 어떤 사물의 공통된 모습, 본래의 모습

Javascript 를 Prototype based language 라 부르기도 하며 Javascript 를 지탱하는 기반이라고도 부른단다.

```js
function Person(name, first, second) {
  this.name = name
  this.first = first
  this.second = second
  this.sum = function() {
    return this.first + this.second
  }
}

var kim = new Person('kim', 10, 20)
var lee = new Person('lee', 10, 10)
```

생성하려고 하는 객체의 sum 이라는 이름의 함수가 객체를 생성할 때마다 새로 만들어지고 있다.

이러면 컴퓨터의 메모리를 낭비하게 되고, 속도도 저하된다.

그럼 생성자 내의 sum 함수를 작성하지 않으면서 sum 함수의 기능이 바뀔 때마다 다른 객체들의 기능도 한번에 바꾸는 방법은 없을까?

즉, 생성자 함수를 통해 만든 모든 객체가 공통적으로 사용할 수 있는 함수, 속성을 만들고 싶다.

## ♻️프로토타입의 사용

```js
function Person(name, first, second, third) {
  this.name = name
  this.first = first
  this.second = second
}

Person.prototype.sum = function() {
  return 'prototype : ' + (this.first + this.second)
}
```

sum 함수를 따로 생성자 함수 바깥으로 빼냈다. 그리고 Person.prototype.sum 으로 Person 과 sum 사이에 생성자 함수의 원형을 정한다는 의미에서 prototype 을 적어 넣었다.

이를 통해 객체를 만들고 실행하면, 잘 작동이 된다.

```js
var kim = new Person('kim', 10, 20);
var lee = new Person('lee', 10, 10);
console.log("kim.sum()", kim.sum());
console.log("lee.sum()", lee.sum());

kim.sum() prototype : 30
lee.sum() prototype : 20
undefined
```

생성자 (constructor) 안에 sum 을 정의하는 함수가 들어가 있지 않기에 Person.prototype.sum 를 정의하는 코드는 객체가 만들어질 때마다 실행되지 않게 된다.

한 번만 실행이 되고, 성능을 절약할 수 있다. 한 번만 정의되므로 메모리로 절약할 수 있다.

그리고 위의 상태에서 정의된 프로토타입의 리턴문을 바꾸면,

```js
Person.prototype.sum = function() {
  return 'modified prototype : ' + (this.first + this.second)
}
ƒ () {
  return 'modified prototype : ' + (this.first + this.second)
}
console.log("kim.sum()", kim.sum());
console.log("lee.sum()", lee.sum());
kim.sum() modified prototype : 30
lee.sum() modified prototype : 20
undefined
```

만약 객체가 일억 개 만들어져 있었다고 하면, 일억 개의 객체가 방금 바뀐 프로토타입의 sum 함수를 쉐어하게 되는 셈이다.

즉, 한번에 모두 다 바뀌어 버리는 것이다.

또한 일억 개의 객체 중에서 딱 그 특정한 하나의 객체의 기능만을 바꿀 수도 있다.

```js
kim.sum = function(){
    return 'this : '+(this.first+this.second);
}
ƒ (){
    return 'this : '+(this.first+this.second);
}
console.log("kim.sum()", kim.sum());
console.log("lee.sum()", lee.sum());
kim.sum() this : 30
lee.sum() modified prototype : 20
undefined
```

지금까지의 예시를 통해 만들어진 kim 이라는 객체의 sum() 이라는 메소드를 호출할 때, 자바스크립트 에서는 제일 먼저 객체 자신이 (kim) sum() 이라고 하는 속성을 가지고 있는지 부터 찾게 된다.

```js
kim.sum = function() {
  return 'this : ' + (this.first + this.second)
}
```

찾은 그 속성은 함수이다. 그리고 실행을 통해 해당 기능이 동작하게 된다.

마지막으로 객체 kim 과 다르게 lee 라는 객체는 sum() 이라는 메소드를 정의 한 것이 없다. 그러면 자바스크립트는,

내가 찾는 sum 이라는 메소드를 lee 라는 객체 자신이 가지고 있지 않으면, 이 객체의 생성자인 Person 의

Person 의 Prototype 이라고 하는 것의 sum 이라 하는 메소드가 정의되어 있는지를 찾게 된다.

```js
Person.prototype.sum = function() {
  return 'modified prototype : ' + (this.first + this.second)
}
```

lee.sum() 은 바로 위의 코드를 리턴해서 실행하여 해당 기능이 동작하게 만드는 것이다.

## 🤔일반적인 사용

객체의 속성, 변수들은 생성자 안에 넣는 것이 일반적이며,

함수는

```js
생성자.prototype.함수이름 = function() {
  return ...
}
```

의 형태로 정의하는 일반적인 패턴이다 라고 생각하면 될 듯 싶다.
