---
title: 🍎객체 지향 프로그래밍 (2) This Keyword
date: 2020-10-28 15:12:00
category: development
draft: false
---

## 🦥대명사, this 를 더 쉽게

![](https://this.co/wp-content/uploads/2019/03/Salt-pepper-chicken_DSC0835_edit.jpg)

개개인은 각자 이름이 있고 사물도 마찬가지로 이름이 있다.

이름을 대신하는 대명사도 있다. 나, 너, me.. 등등

프로그래밍에서 자기 자신을 가리키는 표현은 this 이다.

아래는 cutiehany 라는 아이디를 가진 플레이어의 이름, 테트리스 게임의 점수, 첫번째 결과와 두번째 결과를 합한 메소드 를 담은 서랍이다.

```js
let cutiehany = {
  name : "hany kim",
  first_record : 10, //첫 번째 게임의 스코어
  second_record : 20, //두 번째 게임의 스코어
  sum : function (f, s) {
    return f + s;
  }
}

console.log("게임스코어의 합계 :" , cutiehany.sum(cutiehany.first_record, cutiehany.second_record))
게임스코어의 합계 : 30
```

## 🔑메소드가 자신이 속해있는 객체를 가리키는 특수한 키워드

위의 예시를 통해 유저의 게임 스코어의 합계를 얻었다.
그런데, cutiehany 라는 객체 (서랍) 에는 10점, 20점 이라는 정보를 내부적으로 이미 가지고 있다.
몇 점인지 알고 있는데 cutiehany.sum 함수의 인자로 값을 또 한번 언급하고 있다.

```js
cutiehany.sum(cutiehany.first_record, cutiehany.second_record)
```

음 그럼 sum 이라는 메소드 내의 리턴문을 바꿔 볼까?

```js
let cutiehany = {
  name: 'hany kim',
  first_record: 10, //첫 번째 게임의 스코어
  second_record: 20, //두 번째 게임의 스코어
  sum: function() {
    return first_record + second_record
  },
}
```

앗.. first_record 가 정의 되어 있지 않다는 에러를 낸다.

```js
console.log("게임스코어의 합계 :" , cutiehany.sum(first_record, second_record))
Uncaught ReferenceError: first_record is not defined
at <anonymous>:1:43
```

그래서 다시 바꾸었다.

```js
let cutiehany = {
  name: 'hany kim',
  first_record: 10, //첫 번째 게임의 스코어
  second_record: 20, //두 번째 게임의 스코어
  sum: function() {
    return cutiehany.first_record + cutiehany.second_record;
  },
}

console.log("게임스코어의 합계 :" , cutiehany.sum())
게임스코어의 합계 : 30
```

합계를 잘 출력하지만 뭔가 아쉽다. 유연함이 떨어진다는 느낌이다.
왜냐하면? 서랍이름을 cutiehany 에서 goodhany 로 바꾸면 동작이 되지 않을 테니 또다시 return 문을 수정해야만 한다.

혹은, 아래와 같이 서랍 이름을 동시에 여러개 가질 수도 있다.

```js
let cutiehany = (prettyhany = {
  name: 'hany kim',
  first_record: 10, //첫 번째 게임의 스코어
  second_record: 20, //두 번째 게임의 스코어
  sum: function() {
    return cutiehany.first_record + cutiehany.second_record
  },
})
```

그리하여 어떤 메소드가 있으면, 그 메소드가 자신이 속해 있는 객체를 가리키는 특수한 키워드를 만들기로 약속했다고 한다.

## 🔑THIS 키워드

```js
let cutiehany = {
  name: 'hany kim',
  first_record: 10, //첫 번째 게임의 스코어
  second_record: 20, //두 번째 게임의 스코어
  sum: function() {
    return this.first_record + this.second_record;
  },
}

console.log("게임스코어의 합계 :" , cutiehany.sum())
게임스코어의 합계 : 30
```

this 가 속해 있는,

메소드가 속해 있는 객체를 가리키도록 약속된 특수한 예약어가 THIS 이다.

객체가 내부적으로 가지고 있는 상태를 (name, first_record, second_record) 힘수에서 참조할 수 있기 때문에,

깔끔하게 함수의 이름을 호출하면서 하고자 하는 일을 할 수 있게 되었다.

## 🔥결론

this 는 메소드가 속해 있는 객체를 말하고, this 를 통해 그 객체의 다른 변수의 값을 불러올 수 있다. (참조할 수 있다)

객체의 이름이 바뀌어도 this 라는 대명사가 지시하는 객체는 같다.
