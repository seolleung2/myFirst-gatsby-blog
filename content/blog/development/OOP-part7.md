---
title: 🍎객체 지향 프로그래밍 (7) Super Keyword
date: 2020-10-28 23:58:00
category: development
draft: false
---

## 🦸🏻‍♂️super🦸🏻‍♂️

어려운 말로는 서브 (자식) 클래스에서 상위 클래스를 호출할 때 사용하는 키워드 라고 한다.

왜 자식 클래스에서 상위 클래스를 호출하지?

어떤 이점이 있지? 기존 상속의 단점을 어떻게 보완하지?

물론 뭔지 알게 되기 전까지는 저런 질문이 대체 뭔 소린가 싶었다.

그리고 공부하면서 느끼게 된 사실인데

게임할 때 부모님 안부를 그렇게 많이 여쭙듯이, 부모님을 대신 일을 시키고 부모님을 등골을 빼오는 등 이번 학습에서는 불효를 많이 저질르게 되는 거 같다.
![](https://lh3.googleusercontent.com/proxy/56H2KkTflXSs9d7G3NHT9Ec-6ENpIjruYN-sEcgZrOdiY689-1kvIE3146mzkqGpQqBTDzARNyPW3YwdRLUGtUpBpaOf3XIEZIzVN2nIR2JP3ApArEZcntUZabgBscfv6ZPwp75hJbO0AfIhBrihgQ)

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

class PersonPlus extends Person {
  avg() {
    return (this.first + this.second) / 2
  }
}
```

Person 부모 클래스를 상속받은 PersonPlus 클래스에서 갑자기 인스턴스를 생성할 때 인자를 하나 더 받고 싶어졌다.

그러니까 third, 세 번째 점수를 받아오고 싶다는 거겠지.

```js
let kim = new PersonPlus('kim', 10, 20, 30)
```

네 번째 인자로 숫자 30을 받았는데, Person 클래스 에는 네 번째 인자를 받을 세팅이 안되어 있다.

여기서 부모 클래스 Person 의 값은 그대로 유지하면서 세 번째 점수를 받아오게 할 방법은 뭘까??

## 😭부모 속성 복붙해오기

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

class PersonPlus extends Person {
  constructor(name, first, second, third) {
    this.name = name
    this.first = first
    this.second = second
    this.third = third
  }
  sum() {
    return this.first + this.second + this.third
  }
  avg() {
    return (this.first + this.second + this.third) / 3
  }
}
```

이렇게 부모 클래스를 또다시 복붙해 와서 PersonPlus 에 third 인자를 태우고 속성 this.third 를 추가 해주면 바라는 바대로 작동은 한다.

그런데 또다시 중복이 발생하기에 "상속" 의 의미를 퇴색시켜 버린다.

## 😱부모클래스에게 일시키기 (응?)

이 중복을 피하기 위해 부모 클래스를 자식 클래스로 불러와서 부모 클래스에게 일을 시키고 부모가 하지 못하는 일은 나만 하도록 하게 만드는 (?!?) 키워드가 바로 "super" 이다.

약간 불효 스럽긴 한데 위의 문장은 엄청나게 중요한 의미이므로 절대 걍 웃고 넘어가면 안된다.

## 🔑부모가 갖고 있는 기능 실행하기

#### 1. super 의 첫 번째 용법

PersonPlus 에서 constructor 가 실행될 때 위에 있는 부모 Person 의 기능을 먼저 실행되게 할 수 있다면 문제를 해결할 수 있다.

부모가 이미 갖고 있는 기능과 나도 (PersonPlus) 갖고 있는 기능의 중복을 제거하고,

super() 를 대신 넣어준다.

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

class PersonPlus extends Person {
  constructor(name, first, second, third) {
    // this.name = name
    // this.first = first
    // this.second = second
    // 부모의 기능과 중복되는 기능을 제거하고,
    super(name, first, second) // super() 를 대신 넣어준다.
    this.third = third
  }
  sum() {
    return this.first + this.second + this.third
  }
  avg() {
    return (this.first + this.second + this.third) / 3
  }
}
```

즉, super(name, first, second) 를 통해 PersonPlus 의 부모 클래스인 Person 의 생성자가 호출이 되고 그 생성자 안에서 해당 프로퍼티들이 알아서 세팅이 되기 때문에 자식인 PersonPlus 클래스는 이제 this.third = third 로 나만 갖고 있는 속성에 대해서만 세팅을 하면 된다.

#### 2. super 의 두 번째 용법

그리고 PersonPlus 클래스의 sum() 이나 avg() 메소드 기능도 손보고 싶다.

```js
return this.first + this.second + this.third
return this.first + this.second + this.third
return this.first + this.second + this.third
return this.first + this.second + this.third
return this.first + this.second + this.third
```

이게 일억줄에 달하는 코드라면 자식이 구현하기에 비효율 적인 상황이다.

this.first 와 this.second 를 부모 클래스에서 이미 가지고 있기 때문에 그걸 가져다 쓸 방법이 있을 텐데?

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
  constructor(name, first, second, third) {
    // this.name = name
    // this.first = first
    // this.second = second
    // 부모의 기능과 중복되는 기능을 제거하고,
    super(name, first, second) // super() 를 대신 넣어준다.
    this.third = third
  }
  sum() {
    // return this.first + this.second + this.third
    return super.sum() + this.third
  }
  avg() {
    // return (this.first + this.second + this.third) / 3
    return (super.sum() + this.third) / 3
  }
}
```

부모클래스에 있는 >>> super 를 의미하고,

.sum() 으로 호출한다.

즉, 부모 클래스에 있는 sum() 을 호출하고 그 결과를 받아서 (리턴받아서) 자식 클래스에서 추가적인 작업을 (add this.third) 할 수 있도록 하면 좋다.

```js
let teddy = new Person('teddy', 10, 20)

teddy
Person {name: "teddy", first: 10, second: 20}
teddy.sum()
30

let sunny = new PersonPlus('sunny', 10, 20, 30)

sunny
PersonPlus {name: "sunny", first: 10, second: 20, third: 30}
sunny.sum()
60
sunny.avg()
20
```

많이 써보질 않았기에 아직 어렵지만 아항 대강 느낌이 오기는 한다.

## 👩🏻‍⚖️요약

#### 1. super()와 super. 의 차이

- super()시 부모 클래스의 생성자 호출. 필요한 인자를 넘겨줘야 함

- super. 사용시 부모 클래스의 속성값에 접근하는 용도로 사용.

#### 2. super가 없다면?

- 부모 클래스에서 기능을 추가하고 싶을 때 필요한 코드를 자식 클래스에서 중복 작성해야 한다.
- 자식 클래스에서 부모 클래스의 속성값에 접근하지 못한다.

![](https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fblogs-images.forbes.com%2Fjvchamary%2Ffiles%2F2016%2F03%2Fman_of_steel-1200x800.jpg)

슈퍼슈퍼맨~~
