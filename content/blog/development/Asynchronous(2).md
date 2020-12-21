---
title: 👨🏻‍🚒Asynchronous JavaScript(2) - Callback
date: 2020-12-21 21:30:00
category: development
draft: false
---

## 🍎비동기의 순서를 제어하는 Callback

브라우저의 대표적 비동기 API 인 setTimeout 을 통해 알아보자.

```js
const printString = string => {
  setTimeout(() => {
    console.log(string)
  }, Math.floor(Math.random() * 100) + 1)
}

const printAll = () => {
  printString('A')
  printString('B')
  printString('C')
}
printAll() // what do you expect?
```

a, b, c 를 순차적으로 실행했다고 해서 나중에 a, b, c 가 끝나는 시점이 다를 수 있다는 점이 비동기의 특징이기애 결과를 예측할 수 없다.

a - b - c 로 나올 수 도 있지만 b - c - a 등 다른 방식으로 얼마든지 나올 수 있다는 거다.

![](https://miro.medium.com/max/1200/1*gKhbOEXeeaRCRarHgs9XLg.png)

즉 콜백 큐에 순서대로 들어오지 않을 수 있다는 것을 의미한다.

그런데 나는 순차적으로 (abc 순서로) 제어하고 싶다.

## 🥰Callback : A way to handle Asynchronous

끝나면 나에게 전화해줘!

무슨 일이 얼마나 걸릴지 모르지만 어찌됐던 그거 끝나면 이거 실행해줘 가 콜백 의 의미라 한다.

위와 다르게 printString 에서 두번째 인자로 callback 을 받는다.

```js
const printString = (string, callback) => {
  setTimeout(() => {
    console.log(string)
    callback()
  }, Math.floor(Math.random() * 100) + 1)
}

const printAll = () => {
  printString('A', () => {
    printString('B', () => {
      printString('C', () => {})
    })
  })
}
printAll() // now what do you expect?
```

이제는 아무리 쳐봐도 a-b-c 가 순서대로 나온다.

콜백으로 내가 원하는 비동기 태스크인 printString 함수의 순서를 지킬 수 있게 된다.

## 🚀Callback error handling Design

콜백의 에러 핸들링은 general 하게는 인자 맨 앞에는 error 를 주고,

다음 인자로는 data 를 넣는 형태이다.

```js
// Callback error handling Design
const somethingGonnaHappen = callback => {
  waitingUntilSomethingHappens()

  if (isSomethingGood) {
    callback(null, data)
  }

  if (isSomethingBad) {
    callback(error, null)
  }
}

// Usage
somethingGonnaHappen((err, data) => {
  if (err) {
    console.log('ERR!!')
    return
  }
  return data
})
```

방금의 유어클래스 코드가 스프린트 문제 해결에 크게 도움이 되었다.

## 👺단점 : Callback HELL

![](https://bravenamme.github.io/files/posts/201910/promise_01.png)

코드 가독성이 안좋아지고 관리가 안좋아진다.

그래서 또 Promise 라는 게 있다.
