---
title: 원시 자료형 (Primitive) VS Ref value
date: 2020-09-18 22:24:00
category: development
draft: false
---

## 😔금일 10시 진행한 체크포인트

원시 자료형과 object 에 대한 것 그리고 9시부터 10시 까지 진행한 클래스 객체지향 관련 문제를 풀었다.

네 개나 틀렸다.
보니까 다 오브젝트 자료형을 원시 자료형 처럼 풀어서 틀렸던 것이였다.

11시 체크포인트 시간에 다른 사람들의 여러 질문들을 통해 나는 거꾸로 알고 있다는 걸 알게 되었다.

그래서 점심 시간에 엊그제 했던 Koans 과제의 Types_part-2.js 부분을 풀면서 더 꼼꼼히 보았다.

그리고 다시 문제를 풀어 보았다.

## 🥳Checkpoint - Value vs Reference

선생님께서 알려주신 사이트를 링크해 놓는다.

https://www.javascripttutorial.net/javascript-primitive-vs-reference-values/

아직 이게 정확히 뭐다 설명할 수는 없겠는데 느낌은 온다.
아래와 같이 Koans 과제에 주석을 붙여가며 나만의 방식대로 어느 정도 이해해 보았다.

```js
const overTwenty = ['hongsik', 'minchul', 'hoyong']

let allowedToDrink = overTwenty

// allowedToDrink 변수에 ['hongsik', 'minchul', 'hoyong']; 할당, 값을 할당하는게 아닌 저 배열의 주소를 복사했다.

// 이제, allowedToDrink, overTwenty 변수는 메모리상 어딘가에 있을 ['hongsik', 'minchul', 'hoyong']; 를 같은주소로 바라보고 있다.
```

![](https://cdn.javascripttutorial.net/wp-content/uploads/2016/08/JavaScript-Reference-Assignment.png)

이 그림으로 난 모든 설명이 끝났다고 본다.

## 1. 코드가 실행된 후, x.foo의 값은 무엇일까요?

```js
let x = { foo: 3 }
let y = x

y.foo = 2
```

원시 자료형 (숫자형, 문자열, 불리언, undefined.. 등등) 을 빼고 나머지 오브젝트 자료형 (배열, 오브젝트, 함수) 은 레퍼런스 밸류라고 한다.

원시 자료형의 경우는 값을 변수에 담아 값이 같은지 큰지 비교를 했다면, 오브젝트 자료형을 임의의 변수에 담았을 때는 그 변수의 값이 (배열 에 들어간 요소가 같다거나) 이런 거를 비교하는게 아니라 오브젝트 자료형이 위치한 메모리 어디엔가의 주소를 임의의 변수를 할당해 주는 것으로 이해했다.

x.foo 의 값은 2 이다.

![](https://cdn.javascripttutorial.net/wp-content/uploads/2016/08/JavaScript-Reference-Modifying-Property.png)

이걸로 설명이 된다.

## 2. 코드가 실행된 후, x의 값은 무엇일까요?

```js
let x = 2
let y = x

y = 3
```

원시 자료형이다. 이건 그냥 내가 아는대로 하면 된다.
y는 3으로 재할당 했지만, x 는 여전히 2이다.

## 3. 코드가 실행된 후, 콘솔에 찍히는 값은 각각 무엇일까요?

```js
console.log('codestates' === 'codestates')
console.log(3.14 === 3.14)
console.log([1, 2, 3] === [1, 2, 3])
console.log({ foo: 'bar' } === { foo: 'bar' })
```

true, true, false, false

## 4. 코드가 실행된 후, x.foo의 값은 무엇일까요?

```js
let x = { foo: 3 }
let y = x

y = 2
```

x.foo 의 값은 3 이다.

## 5. 코드가 실행된 후, myArray의 값은 무엇일까요?

```js
let myArray = [2, 3, 4, 5]
let ourArray = myArray // 1. 변수 ourArray 에도 myArray 가 바라 보는 주소를 할당한다.
// 2. myArray, ourArray 두 변수가,
//    대치동 89x-xX 에 있는 [2, 3, 4, 5] 를 보고 있다.
ourArray[2] = 25 // 3. 배열이 [2, 3, 25, 5] 로 바뀐다. 여전히 두 변수는 하나의 주소를 본다.
ourArray = undefined // 4. ourArray 변수에 undefined 값을 재할당한다.. 연결 고리가 끊겼다..
```

하지만 myArray 는 [2, 3, 25, 5] 의 주소를 향하고 있다. 🤗

주의할 점은 ourArray[2] = 25; 할 때 [2, 3, 25, 4, 5] 가 아니라는 점만 염두에 둬야 할 거 같다.

## 6. 코드가 실행된 후, player.score의 값은 무엇일까요?

```js
let player = { score: 3 }

function doStuff(obj) {
  obj.score = 2 // 2. obj.score 에 값 2가 재할당 되었다.
}

doStuff(player) // 1. player 는 바로 맨 위 변수를 받아서 obj 파라미터에 넣는다.
```

그래서 값은 2.

## 7. 코드가 실행된 후, score 의 값은 무엇일까요?

```js
let score = 80

function doStuff(value) {
  // 1. let value = 80; 을 의미.
  value = 90 // 2. value = 90; 을 통해 value 값 재 할당. // 90
}

doStuff(score)
```

score 의 변수에는 아무 영향을 미치지 못한다. score 의 값은 그냥 80!

아깐 뭐가 맞는지 몰라 틀렸는데 지금은 갑자기 풀이가 매끄러워 졌다 🥰

## 200919 추가. 배열을 슬라이스로 복사해온 변수는 기존 배열의 변수와 값이 같을까?

아래는 콘솔 창의 결과 를 긁어와 봤다..
임의의 배열과 그 배열을 slice(0) 을 통해 복사한 arr2.

```js

const arr = ['peanut', 'butter', 'and', 'jelly'];

const arr2 = arr.slice(0);

arr2
(4) ["peanut", "butter", "and", "jelly"]0: "peanut"1: "butter"2: "and"3: "jelly"length: 4__proto__: Array(0)

arr === arr2

false
```

안 똑같다 한다.
오브젝트 자료형은 내부 값이 같은지 비교하는게 아니라 할당된 주소가 같은지 어쩐지를 본다고 했다.

겉보기에는 모양이 같아 보이지만 arr.slice() 를 통해 새로운 주소에 할당된 배열 주소를 arr2 에 넘겨 준다.
그래서 두 변수의 주소는 서로 다르다.

아래는 어제 저녁에 학습했던 예시.

```js
const arr = ['peanut', 'butter', 'and', 'jelly']

const arr2 = arr

arr(4)[('peanut', 'butter', 'and', 'jelly')]

arr2(4)[('peanut', 'butter', 'and', 'jelly')]

arr === arr2

true
```

어제 학습했듯이 이번에는 두개의 변수가 메모리 어딘가 주소에 있는 배열을 같은 주소로 바라보고 있다.

그래서 true

## 아이 조아 👅 할라다가 와 다시 머리가 아파졌다..
