---
title: 🍎객체 지향 프로그래밍 (6) Inheritance 상속
date: 2020-10-28 22:30:00
category: development
draft: false
---

## 💰상속

일단 어려운 말로는 Javascript 에서 클래스를 상속해서 서브클래스를 만드는 방법이다.

## 1. ➕클래스에 다른 기능 추가하기 (코드를 Update 하는 방식)

```js
class Person {
  constructor(name, first, second) {
    this.name = name
    this.first = first
    this.second = second
  }
  sum() {
    return this.first + this.second
  }
}
```

점수 합계 구하는 기능 말고 점수 평균 구하는 기능도 넣고 싶단 말이지.

그래서 다음과 같이 코드를 작성했다.

```js
class Person {
  constructor(name, first, second) {
    this.name = name
    this.first = first
    this.second = second
  }
  sum() {
    return this.first + this.second
  }
  avg() {
    return (this.first + this.second) / 2
  }
}

let kim = new Person('kim', 2, 4)

kim.sum()
6
kim.avg()
3
```

잘 된다.

## 🤔위의 코드의 단점

만약 Person 이라는 클래스가 내가 만든 것이 아닌 가져다 쓰는 라이브러리 라면 내가 작업한 것이 원본을 덮어쓰게 되거나 수정사항 때문에 업데이트를 못하게 되는 경우가 생기고 만다.

또 Person() 이라는 클래스의 기능을 최소한으로 유지하면서 avg() 같은 기능을 바로 추가하기에는 부담? 스러운 경우 라고 한다.

마지막으로 그런 수정사항 때문에 업데이트를 못하게 되는 경우가 생길 수도 있다고 한다.

## 2. ➕클래스에 다른 기능 추가하기 - 클래스를 하나 또 만들기

위의 코드를 고대로 복붙해서 클래스 이름만 다르게 만드는 거다.
그리고 신기술 avg() 를 추가해 주는 거다.

```js
class Person {
  constructor(name, first, second) {
    this.name = name
    this.first = first
    this.second = second
  }
  sum() {
    return this.first + this.second
  }
}

class PersonPlus {
  constructor(name, first, second) {
    this.name = name
    this.first = first
    this.second = second
  }
  sum() {
    return this.first + this.second
  }
  avg() {
    return (this.first + this.second) / 2
  }
}
```

결과는 원하는 대로 값을 얻을 수 있겠지만 여기에는 치명적인 문제가 존재한다.

## 😱문제점? ㅈ ㅜ ㅇ ㅂ ㅗ ㄱ

![](https://gvsc.rajephon.dev/before.jpg)

그거슨 바로 중복 이다.

이 중복 제거를 가능하게 해주면서 코드의 양을 줄이는 방법은 뭘까?

## 👿상속 (Inheritance) 첫번째. 중복 날리기.

PersonPlus 클래스에서 일단 중복을 다 지워 버린다.

```js
class Person {
  constructor(name, first, second) {
    this.name = name
    this.first = first
    this.second = second
  }
  sum() {
    return this.first + this.second
  }
}

class PersonPlus {
  avg() {
    return (this.first + this.second) / 2
  }
}
```

![](https://gvsc.rajephon.dev/after.jpg)

하지만 아직 하나 남았다.

그것은 class Person 을 상속받아 오는 과정이다.

## 👿상속 (Inheritance) 두번째. 상속 연결 시키기

부모님의 모든 계좌를 이제 내껄로 흐르게 만들자.

```js
class Person {
  constructor(name, first, second) {
    this.name = name
    this.first = first
    this.second = second
  }
  sum() {
    return this.first + this.second
  }
}

class PersonPlus extends Person {
  avg() {
    return (this.first + this.second) / 2
  }
}
```

extends Person 을 통해 부모님의 계좌를 내 호주머니로 연결했다!

이제 남은 것은 부모의 요소를 써먹는거다!(??)

클래스 Person 이 가지고 있던 요소들이 이제 PersonPlus 에 로딩된다.

## 💃🏻상속의 효과

1. 중복되는 코드를 제거함

2. 중복 코드 제거를 통해 코드의 양을 줄이며, 중복해서 사용하고 있는 부모 클래스의 요소를 바꾸면

3. Person 을 상속받고 있는 모든 클래스 에서 동시 다발적으로 변경이 일어나며

4. 3을 통해 유지 보수의 편의성을 도모할 수 있게 된다.

## 👨‍👩‍👧다시 한번 더 상속.

##### 1. 상속이 뭘까요?

class로 만든 하나의 객체 생성자(부모)에 기능 등을 추가하려고 할 때, 자식 생성자를 만들어 들어올 값을 부모로 부터 상속받아 사용하는 것입니다.

##### 2. 상속이 없으면 뭐가 불편한가요?

다른 사람이 만든 라이브러리 등을 유지보수를 위해 직접 수정시 오류가 날 수 있습니다. 이를 방지하기 위해 복제해서 사용하게 되면 중복이 많아져 유지보수에 좋지않고 메모리 관리시 효율이 떨어집니다.

##### 3. 상속받는 자식 클래스는 어떻게 구현?

(extends 부모클래스명 - 부모로부터 받아와서 확장한다.)

자식클래스는

```js
class 자식클래스명 extends 부모클래스명 {
  추가할함수명() {}
}
```
