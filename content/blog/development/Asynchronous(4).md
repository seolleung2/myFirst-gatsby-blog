---
title: 👨🏻‍🚒Asynchronous JavaScript(4) - Sprint Part 1
date: 2020-12-21 22:15:00
category: development
draft: false
---

# ⏰Sprint Part 1 - 타이머 API

브라우저에서의 대표 비동기 API - setTimeout, setInterval

## Mission 1. part-1/index.html 을 열어보기

part-1/index.html 을 브라우저에서 열어보고, callback, promise, async & await 버튼을 각각 클릭해보세요.

이 버튼들은 정확히 동일한 액션을 하지만, 그 구현 방법은 조금씩 다릅니다.

## Mission 1. 결론

작동은 동일하게 되지만 내부 코드가 다르다로 이해.

## Mission 2. part-1/script.js 파일을 열어 확인하기

### Mission 2-1. callback

<b>⏺callback 버튼은 runCallback 함수를 실행합니다.</b>

delay 라는 함수는 01_callback.js 에 선언되어 있다.

오~ delay 함수는 wait 과 callback 함수를 인자로 받은 다음 setTimeout 함수를 리턴하는구나!

1초 뒤에 pauseVideo(), displayTitle() 을 실행한다.

그리고 다시 delay 함수를 실행하는데, 0.5초 뒤에 highlightTitle() 을 실행하게 되고,

그리고 다시 delay 함수가 실행되는데, 2초 뒤 resetTitle() 이 실행되는 구조의 함수이다.

⏩callback 함수의 형태가 curly bracket 으로 만들어지는 코드 블록이라는 점을 유심히 봐야 한다.

### Mission 2-2. promise

<b>⏺promise 버튼은 runPromise 함수를 실행합니다.</b>

정의된 runPromise() 함수 내에는 sleep 이라는 함수가 들어 있다.

sleep 함수는 02_promiseConstructor.js 에 정의되어 있다.

오~ sleep 이라는 함수는 wait 이라는 인자만 받네? 어? 아까 위에 delay 함수는 wait 인자 뿐만 아니라 callback 함수도 인자로 받았는데 말이다?!

여튼 sleep 함수는 wait 인자 만을 받고 promise 객체를 리턴한다.

promise 객체는 인자로 executor 라는 콜백 함수를 전달해 주게 되는데,

이 콜백 함수에는 또 다른 2가지의 콜백 함수를 인자로 받게 된다. 그게 바로  resolve 와 reject 키워드 이다.

• resolve : 기능을 정상적으로 수행해서 마지막에 최종 데이터를 전달하는 콜백함수

• reject : 기능을 수행하다 중간에 문제가 생기면 호출하게 될 콜백함수

⏩여기서는 기능이 정상적으로 수행 될 때 setTimeout api 를 리턴(실행) 하게 한다.어떻게?

setTimeout 의 첫번째 인자에 resolve 함수를 태워서!

### Mission 2-3. async & await

<b>⏺async & await 버튼은 runAsync 함수를 실행합니다.</b>

비동기적인 아이들을 마치 동기적으로(?) 실행 되는 것 처럼 보이게 해 주는 ‘syntactic sugar’

마치 모든 로켓들이 발사 준비를 다 마친 상태 에서 (버튼하나누르면지구가멸망) await 이라는 잠금?장치를 걸어 놨다가 첫번째 로켓 부터 발사시켜 나가는 느낌이랄까?

## Mission 3. delay 함수와 sleep 함수의 차이점을 확인해보세요.

delay 함수는 인자로 wait 과 callback 함수를 받지만,

sleep 함수는 인자로 wait 만을 받고 new Promise 로 프로미스 객체를 리턴합니다.

이 프로미스 객체는 executor 라는 콜백함수를 인자로 받고, 이 콜백함수의 인자로는 resolve, reject 라는 콜백함수가 들어가게 됩니다.

## Mission 4. runAsync 함수

runAsync 함수는 async 및 await 키워드의 사용법을 보여주고 있습니다.

비동기 함수의 흐름이 마치 동기 함수를 사용하는 구조처럼 보입니다.

하지만, 실제로는 Promise를 이용하여 결과를 반환하는 것입니다. 이 경우, 코드 위에서부터 아래로, 시간의 흐름대로 진행됩니다.

## Bare Minimum Requirements

### ⏺Promise 실행함수가 가지고 있는 두 개의 파라미터, resolve, reject는 각각 무엇을 의미하나요?

promise 객체는 인자로 executor 라는 콜백 함수를 전달해 주게 되는데, 이 콜백 함수에는 또 다른 2가지의 콜백 함수를 인자로 받게 된다.

그게 바로  resolve 와 reject 키워드 이다.

• resolve : 기능을 정상적으로 수행해서 마지막에 최종 데이터를 전달하는 콜백함수

• reject : 기능을 수행하다 중간에 문제가 생기면 호출하게 될 콜백함수

### ⏺resolve, reject 함수에는 인자를 넘길 수 있습니다. 이때 넘기는 인자는 어떻게 사용할 수 있나요?

resolve 의 경우에는 기능이 정상적으로 수행되어 나온 최종 데이터가 인자로 담긴다. 여기서는 ‘hello’ 라는 문자열 이였다.

이제 promise 실행 함수를 써먹는 consumer 함수에서 .then 을 통해 데이터를 이어 받아 (데이터를 리턴 받아서) 데이터를 조작 및 가공을 한다.

reject 함수는 .catch 를 통해 에러 를 리턴하게 된다.

callback 을 통한 비동기 처리에서는 실행할 때마다 에러 처리를 해줘야 된다고 했는데, Promise 를 통한 비동기 처리에서는 consumer 함수에서 제일 마지막 부분에서 .catch 를 통해 한 번만 처리를 해주면 에러를 핸들링할 수 있다.

.then, .catch 외에도 .finally 라는 키워드도 있다.

얘도 consumer 함수 마지막에 작성해 주는데 데이터를 받아오건 어쩌건 무조건 마지막에 호출되어 진다. 어떤 기능을 마지막에 수행하고 싶을때 사용한다고 한다.

### ⏺Promise의 세가지 상태는 각각 무엇이며, 어떤 의미를 가지나요?

• 대기(pending): 이행하거나 거부되지 않은 초기 상태.

• 이행(fulfilled): 연산이 성공적으로 완료됨.

• 거부(rejected): 연산이 실패함.

## ⏺await 키워드 다음에 등장하는 함수 실행은, 어떤 타입을 리턴할 경우에만 의미가 있나요?

해당 함수가 Promise 타입을 리턴할 경우에만 사용할 수 있습니다.

무턱대고 아래 코드 처럼,

```js
async setTimeout(() => {
    console.log('나는 비동기');
} ,1000)
```

비동기 함수라고 setTimeout 앞에 async 를 붙인다 해서 동기적으로 쓸 수 있게 되는 것이 아니라는 의미 이다.
