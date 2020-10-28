---
title: 🍎객체 지향 프로그래밍 (5) Classes
date: 2020-10-28 21:00:00
category: development
draft: false
---

## 🅲Class

객체를 만드는 공장 으로서 다른 언어들은 Class 라는 것을 지원했다고 한다.

하지만 Javascript 는 ECMAscript6 에 추가된 기능이라고 한다.

(4) 까지는 전통 자바스크립트 방식을 사용, Constructor function 을 통해 객체를 찍어내는 방법을 학습했다.

이제 Class 문법을 적용해 바꿔 보자.

## 🏭객체를 만드는 공장, Class

![](https://kr.bignox.com/blog/wp-content/uploads/2019/03/1-2.png)

다시 한번 Constructor 의 역할을 떠올리면

1. 객체를 만든다.

2. 객체의 초기상태를 세팅한다.

아하 컨스트럭터는 객체를 만들면서 객체의 기본적 기능을 세팅하는구나.

생성되는 객체를 초기화 하겠구나.

## 👩🏻‍⚖️클래스 내의 함수는

```js
class Person() {
  sum () {
    // 클래스 내에서의 함수의 모습은 마치 실행을 하는 거 같아 보이지만,
  } // 클래스 내에서는 함수를 선언해 두는 형태로 봐야 한다.
}
```

## 🥇constructor 함수는

객체가 생성될 때 자동으로 생성되기 전에 실행되도록 약속되어 있는 함수이며 이를 클래스 내에 구현한다.

```js
class Person{
  constructor(name, first, second){
    this.name = name;
    this.first = first;
    this.second = second;
  }
}

var kim = new Person('kim', 10, 20);
console.log("kim 의 인스턴스 입니다. ", kim)

kim 의 인스턴스 입니다.  Person {name: "kim", first: 10, second: 20}

```

## 🍒Class 안에 메소드 구현하기

방법 1. prototype 메소드 고대로 넣기

```js
class Person{
  constructor(name, first, second){
    this.name = name;
    this.first = first;
    this.second = second;
  }
  Person.prototype.sum = function() {
    return 'prototype : ' + (this.first + this.second)
  }
}
```

방법 2. sum() 을 그대로 class 내에 넣기

```js
class Person {
  constructor(name, first, second) {
    this.name = name
    this.first = first
    this.second = second
  }
  sum() {
    // 클래스 내 함수 sum() 는 실행이 아니라 선언이다!
    return 'sum()함수 실행! : ' + (this.first + this.second)
  }
}
```

class 내 sum() 을 통해 같은 클래스 안에 속해 있는 모든 객체가 공유하는 함수가 된다.

## 🔑자바스크립트가 class 에서 함수를 실행하는 과정!

1. Javascript 는 kim 이라는 객체가 sum 함수를 따로 가지고 있는지 먼저 확인한다.

```js
var kim = new Person('kim', 10, 20)
kim.sum = function() {
  return 'this : ' + (this.first + this.second)
}
```

가지고 있으면 그것을 실행하게 한다.

즉 객체 하나만 다른 기능을 하게 되는 셈이다.

2. sum 함수를 따로 가지고 있지 않다면, kim 이라는 객체를 만든 클래스 Person 안에 sum 이라 하는 메소드가 정의되어 있는지 확인한 뒤에 그것을 실행하게 된다.
