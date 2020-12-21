---
title: 👨🏻‍🚒Asynchronous JavaScript(3) - Promise, async & await
date: 2020-12-21 21:40:00
category: development
draft: false
---

## 🍎들어가기 전에

비동기의 순서를 제어하는 Callback + 콜백 지옥 벗어나기 를 시전하기 위한 테크닉이 있다.

바로 '약속' 이다.

사실 이전에 나름 부꾸럽지만 블로깅한 링크를 다시 재탕해 보자.

https://dev-seolleung2.netlify.app/development/Promise-Part-1/

https://dev-seolleung2.netlify.app/development/Promise-Part-2/

5편까지 썼는데.. 으잌..

## ✍🏻Promise

아까처럼 콜백을 인자를 받지 않고 new Promise를 리턴하는데 얘는 얘만의 콜백을 받는데,

resolve, reject 라는 인자를 받아 넣는다.

callback 을 promise 로 바꾼 코드를 가져왔다.

```js
const printString = string => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(string)
      resolve()
    }, Math.floor(Math.random() * 100) + 1)
  })
}

const printAll = () => {
  printString('A')
    .then(() => {
      return printString('B')
    })
    .then(() => {
      return printString('C')
    })
}
printAll()
```

printAll 함수에서 .then 으로 이어갈 수 있다.

즉 a 가 프린트되어 나오면 그다음 .then 으로 다음 task 를 실행한다.

## 🚀How to deal with callback chain

![](https://bitsofco.de/content/images/2016/06/Error-Handling.png)

callback 을 통한 비동기 처리에서는 콜백을 실행할 때마다 에러 핸들링을 해줘야 하는데,

Promise 를 통한 비동기 처리에서는 consumer 함수 (비동기를 사용하는 함수) 에서 제일 마지막 부분에다 .catch 를 통해 한 번만 처리를 해 주면 에러를 핸들링 할 수 있다.

## 👺Promise HELL

return 처리를 잘 해주지 않았을 때 아래와 같은 프로미스 헬을 만날 수 있다.

헬은 뭐다? 코드 가독성 헬이다.

```js
function gotoCodestates() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1. go to codestates')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

function sitAndCode() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2. sit and code')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

function eatLunch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('3. eat lunch')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

function goToBed() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('4. goToBed')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

gotoCodestates().then(data => {
  console.log(data)

  sitAndCode().then(data => {
    console.log(data)

    eatLunch().then(data => {
      console.log(data)

      goToBed().then(data => {
        console.log(data)
      })
    })
  })
})
```

return 처리를 잘 해주면 코드는 아래와 같아진다.

```js
function gotoCodestates() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1. go to codestates')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

function sitAndCode() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2. sit and code')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

function eatLunch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('3. eat lunch')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

function goToBed() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('4. goToBed')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

gotoCodestates()
  .then(data => {
    console.log(data)
    return sitAndCode()
  })
  .then(data => {
    console.log(data)
    return eatLunch()
  })
  .then(data => {
    console.log(data)
    return goToBed()
  })
  .then(data => {
    console.log(data)
  })
```

그나마 지옥에서 벗어 났다.

이런 Promise 의 한계(?)를 보완한 syntactic sugar 가 있는데,

그게 바로 async 와 await 이다.

## 🍎async 와 await

async 와 await 비동기 처리이지만 동기적인 처리처럼 보이게 한다.

표현 자체를 동기적으로 쓸 수 있어서 코드 가독성이 좋아진다.

```js
function gotoCodestates() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1. go to codestates')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

function sitAndCode() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2. sit and code')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

function eatLunch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('3. eat lunch')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

function goToBed() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('4. goToBed')
    }, Math.floor(Math.random() * 100) + 1)
  })
}

const result = async () => {
  const one = await gotoCodestates()
  console.log(one)

  const two = await sitAndCode()
  console.log(two)

  const three = await eatLunch()
  console.log(three)

  const four = await goToBed()
  console.log(four)
}

result()
```

https://dev-seolleung2.netlify.app/development/Promise-Part-5/

앗 언제 또 블로그를 작성했담..(?!)

참교육 당하지 않게 열심히 잘 공부하자.
