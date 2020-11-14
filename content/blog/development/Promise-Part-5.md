---
title: 🤙🏻Promise Part(5) async, await, Promise.all(), Promise.race()
date: 2020-11-14 16:40:00
category: development
draft: false
---

## 🤙🏻Syntactic Sugar

![](https://miro.medium.com/max/650/1*HA-HaqPdOxuvfxwr4eWkaA.jpeg)

async, await 은 Promise 를 좀 더 간결하면서 간편하게 그리고 동기적으로 실행되는 것 처럼 보이게 만드는 Syntatic Sugar 이다.

기존에 존재했던 Promise 를 감싸서 더 간편하게,

프로미스와 .then 으로 이어지는 또다른 Promise Hell 을 해결해 줄 수 있는 방식이기도 하다.

<p align="center"><img src="https://memegenerator.net/img/instances/400x/63888890.jpg"></p>

하지만 무조건 async, await 으로만 promise 를 대체해서 사용해라 라는 의미는 아니다.

잘은 모르지만 상황에 따라 promise 를 쓰거나 혹은 async, await 을 쓰는 것이라 한다.

## 😘다시, 이걸 왜 쓰는데?

사용자 데이터를 백엔드 (서버) 에서 받아오는 역할을 하는 fetchUser 함수를 만들어 보자.

그리고 그 코드는 역할을 수행하는데 대략 10초 정도 걸린다고 가정해 보자.

```js
function fetchUser() {
  // do network request in 10secs..
  return 'GangGunma'
}

const user = fetchUser()
console.log(user)
```

오오래.. 걸리는 코드라 가정했다.

이렇듯 오래 걸리는 코드에 대해 비동기 적으로 돌아가게끔 해주는 처리를 전혀 하지 않았을 때, Javascript Engine 은 동기적으로 코드를 수행하기 때문에,

한 줄 한 줄이 끝나야 다음 줄로 넘어가는 동기적인 코드를 처리하기 때문에,

fetchUser() 내에서 10초간 머무르고 있다가 그제서야 'GangGunma' 가 리턴이 된다.

그제서야 리턴된 값을 받아 화면에 찍히게 한다.

만약 위의 코드 다음에 Web 화면의 UI 를 처리하는 코드가 있었다면 웹 페이지에 접속한 사용자는 10초 동안 텅텅 비어있는 화면을 봐야만 할 것이다.

바로 이러한 오래 걸리는 코드, 일들을 비동기 적으로 처리해 주어야 한다!

아래와 같이 말이다! (눈감고도쓸수있다)

```js
function fetchUser() {
  return new Promise((resolve, reject) => {
    resolve('GangGunma')
  })
}
```

## 👨🏻‍💻다시, Promise 의 정의

"내가 언제 user 의 데이터를 받아올지 모르겠지만, 이 Promise 라는 Object 를 가지고 있으면 여기 네가 then 이라는 콜백함수만 등록해 놓으면

user 의 data 가 준비되는 대로 네가 등록한 콜백함수를 내가 불러주겠다고 약속할게!"

```js
function fetchUser() {
  return new Promise((resolve, reject) => {
    return 'GangGunma';
  })
}

fetchUser()
Promise {<pending>}
__proto__: Promise
[[PromiseState]]: "pending"
[[PromiseResult]]: undefined
```

new Promise 객체를 리턴하지만 resolve 나 reject 로 호출하지 않았기에

개발자도구에서 보듯이 state 가 계속 pending 상태이다.

그래서 꼭 Promise 안에는 resolve 나 reject 를 이용해 완료를 지어줘야 한다.

```js
function fetchUser() {
  return new Promise((resolve, reject) => {
    resolve('GangGunma');
  })
}

fetchUser()
Promise {<fulfilled>: "GangGunma"}
__proto__: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: "GangGunma"

```

이제 Promise 상태가 개발자도구에서 fulfilled 로 바뀌게 되면서 PromiseResult 가 GangGunma 로 바뀐 걸 확인할 수가 있다.

그렇게 해서 만들어놓은 Producer 를 사용하도록 consumer 를 설정해 보면,

```js
const user = fetchUser();
user.then(console.log)
GangGunma
Promise {<fulfilled>: undefined}
```

.then 이라는 콜백함수를 이용해서 서버에서 값을 얻어왔다. 좋아좋아 마음에 든다.

![](https://cdn.ppomppu.co.kr/zboard/data3/2018/0831/20180831234335_zudoixyy.jpg)

## 🌈async 바르기

```js
function fetchUser() {
  return new Promise((resolve, reject) => {
    resolve('GangGunma')
  })
}

const user = fetchUser()
user.then(console.log)
```

위와 같이 Promise 코드를 작성하지 않고도 간편하게 비동기 코드를 작성하는 방법이 있다.

이 블로그의 주제 중 첫번째인 async 를 소개하는 시간이다.

```js
async function fetchUser() {
    return 'GangGunma';
}

fetchUser()
Promise {<fulfilled>: "GangGunma"}
__proto__: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: "GangGunma"
```

function 앞에 async 라는 키워드만을 쓰는 것으로 앞서 만들었던 Promise Producer 와 똑같은 기능을 수행한다.

똑같이 fetchUser 가 Promise 를 리턴한다.

async 라는 키워드만으로 코드블럭이 자동으로 Promise 로 바뀌게 되는구나!

그 결과 resolve, reject, new Promise 키워드를 쓰지 않고 동기적으로 코드를 쓰듯 바로 return 해 주어도 되는구나!

## 🍎await 를 통해 알아보는 과일얻기🍌

일정 시간(ms) 이 지나면 resolve 를 호출하게 하는 지연 함수이다.

```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
```

그리고 각각 사과와 바나나를 리턴하는 Promise 를 만들었다.

위의 지연 함수 delay(ms) 를 통해 각각의 과일을 따는 시간을 딜레이 시켜 줄건데,

바로 여기서 await 을 사용했다.

```js
async function getApple() {
  await delay(3000)
  return '🍎'
}

async function getBanana() {
  await delay(3000)
  return '🍌'
}
```

await 는 delay(3000) 이 끝날 때까지 기다려 준다.

즉, 3초 있다가 '사과' 혹은 '바나나' 를 리턴하는 Promise 를 만들었다.

사실 위의 코드가 async, await 를 사용하지 않으면 아래 코드처럼 쓸 수 있다.

```js
function getBanana() {
  return delay(3000).then(() => '🍌')
}
```

위의 코드 보다는 어쩌면 async, await 키워드를 써서 delay 가 끝날 때까지 기다렸다가 banana 를 리턴하게 하는 것이,

동기적인 코드를 쓰는 것처럼 보이게 해서 가독성이 더 좋아 보이기도 한다.

이제 모든 나무에서 과일을 싹쓸이 해보자.

## 🍎pickFruits() 로 과일 다 따오기🍌(1) - Promise Hell Begins

```js
function pickFruits() {
  return getApple()
  .then(apple => {
    return getBanana()
    .then(banana => `${apple} + ${banana}`);
  })
}

pickFruits().then(console.log)
Promise {<pending>}
__proto__: Promise
[[PromiseState]]: "pending"
[[PromiseResult]]: undefined
🍎 + 🍌
```

정확히 6초 뒤에 (사과 3초, 바나나 3초) 🍎 + 🍌 로 모든 나무에서 과일을 따 왔다. (바나나가 나무였던가?)

하지만 콜백 지옥에 이은 프로미스 헬 지옥의 시작이다. 나무가 더 생긴다면 더욱 심한 중첩적인 체이닝이 이어질 것이다.

<p align="center"><img src="https://memegenerator.net/img/instances/400x/63888890.jpg"></p>

## 🍎pickFruits() 로 과일 다 따오기🍌(2) - async, await 키워드 써보기!

```js
async function pickFruits() {
  const apple = await getApple();
  const banana = await getBanana();
  return `async 와 await 을 사용한 과일 따기 -> ${apple} + ${banana}`;
}

pickFruits().then(console.log)
Promise {<pending>}
__proto__: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: undefined

async 와 await 을 사용한 과일 따기 -> 🍎 + 🍌
```

마찬가지로 6초 뒤에 사과와 바나나를 따왔다.

async, await 키워드를 통해 동기적으로 코드를 작성하듯이 자연스럽게 작성하고, 리턴값도 자연스럽게 작성하니 너무 간편해 보인다.

만약 async function getApple() 의 내부 코드에 throw 'error' 가 있다면,

```js
async function pickFruits() {
  try {
    const apple = await getApple();
    const banana = await getBanana();
  } catch() {
    // 에러 처리 코드 작성.
  }
  return `async 와 await 을 사용한 과일 따기 -> ${apple} + ${banana}`;
}
```

try, catch 를 통해 작성할 수가 있다.

아니 근데 사과 따는거 3초 기다리고 바나나 따는거 3초 기다리고 꼭 이렇게 해야돼?

사과랑 바나나 따는 게 먼 상관이라고... 6초 걸리게 하는건 너무 비효율이지 않나?

## 🍎🍌 await 병렬처리

사과 따는데 3초, 바나나를 따는데 3초..

이러한 순차 진행은 비효율 같다. 왜냐면 바나나, 사과는 각자 따는 행위에서는 서로 연관이 없기에

사과 다딸때까지 바나나를 못따고 기다릴 필요가 전혀 없는거다.

만들자 마자 바로 실행되어 버리는 프로미스의 특성을 활용해 보자!

```js
async function pickFruits() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  // 사과와 바나나의 프로미스를 만들었다. 만들면 바로 실행되는 promise 의 특성을 이용!
  const apple = await applePromise; // 동기화 수행
  const banana = await bananaPromise; // 동기화 수행
  return `병렬적 실행 이제 3초밖에 안걸린다! ${apple} + ${banana}`;
}

pickFruits().then(console.log)
Promise {<pending>}
__proto__: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: undefined

병렬적 실행 이제 3초밖에 안걸린다! 🍎 + 🍌
```

사과와 바나나의 프로미스를 만들고, 만들면 바로 실행되는 프로미스의 특성을 이용해서 이제 병렬적으로 코드가 실행되기에,

만들자 마자 동시에 따서 기다려 놨다가 써먹는 것이다.

사과 3초 그리고 바나나 3초.. 6초가 걸리는 것이 아니라,

모두 따는 데 3초 걸리는 것이다.

3초 만에 병렬적으로 실행, 즉 동시 다발적으로 기능을 수행하게 만드는 셈이다.

하지만 매우 더티한 코드이다. Promise.all() 에 대해 알아봐야 한다.

## 👽배열을 전달하는 Promise.all()

```js
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()])
  .then(fruits => fruits.join(' + '))
}

pickAllFruits().then(console.log)
Promise {<pending>}
__proto__: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: undefined

🍎 + 🍌
```

Promise.all() 은 내부 인자로 프로미스 배열을 전달하게 되는데 이 때, 모든 Promise 들이 병렬적으로 다 받아올 때까지 모아주는 역할을 담당한다.

## 🌱먼저 따온 첫번째 과일만 받아오는 Promise.race()

```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getApple() {
  await delay(3000)
  return '🍎'
}

async function getBanana() {
  await delay(3000)
  return '🍌'
}

async function getMelon() {
  await delay(1000)
  return '🍈';
}

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana(), getMelon()])
}

pickOnlyOne().then(console.log)

pickOnlyOne().then(console.log)
Promise {<pending>}
__proto__: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: undefined

🍈
```

Promise.race() 는 인자로 배열에 전달된 Promise 중에서 가장 먼저 값을 리턴하는 Promise 만 전달이 되어진다.

1초 만에 따지는 멜론이 먼저 출력되어 나온다!
