---
title: 화살표 함수 (Arrow Function)
date: 2020-10-20 15:30:00
category: development
draft: false
---

## 1. 일반적인 함수 표현식의 형태

```js
let func = function(arg1, arg2, ...argN) {
  return expression
}
```

## 2. 화살표 함수

함수 표현식보다 단순하고 간결한 문법으로 함수를 만드는 방법이다.

```js
let func = (arg1, arg2, ...argN) => expression
```

함수 func 는 화살표 우측의 표현식 (expression) 을 평가하고, 평가 결과를 반환한다.

### 2-1. 화살표 함수의 다양한 예시 1.

1. 함수 표현식을 사용한 덧셈 함수

```js
let sum = function(a, b) {
  return a + b
}
```

2. 화살표 함수를 사용한 덧셈 함수

```js
let sum = (a, b) => a + b
```

### 2-2. 화살표 함수의 다양한 예시 2.

1. 인수(parameter) 가 하나밖에 없는 함수 표현식의 예

```js
let double = function(n) {
  return n * 2
}
```

2. 인수(parameter) 가 하나밖에 없는 화살표 함수

```js
let double = n => n * 2

double(3) // 6
```

인수가 하나밖에 없다면 인수를 감싸는 괄호를 생략할 수 있다.

3. 인수(parameter) 가 하나도 없는 화살표 함수

```js
let sayHi = () => alert('안녕하세요!👋')

sayHi()
```

### 2-3. 화살표 함수의 다양한 예시 3.

삼항 연산자와 함께 쓰여서 함수를 동적으로 만들 수 있는 경우이다.

```js
let age = prompt('나이를 알려주세요.', 18)

let welcome = age < 18 ? () => alert('안녕') : () => alert('안녕하세요!')

welcome()
```

### 2-4. 화살표 함수의 다양한 예시 4.

본문이 여러 줄인 화살표 함수, 즉 함수 body 내에 평가해야 할 표현식이나 구문이 여러 개인 함수가 있다면 마찬가지로 화살표 함수 분법을 사용해 함수를 만들 수 있다.

하지만 이 때는 "중괄호" 를 사용해서 그 안에 평가해야 할 코드를 넣어주어야 하고, "return" 을 사용해 명시적으로 결괏값을 반환해 주어야 한다.

```js
let sum = (a, b) => {
  let result = a + b
  return result
}
```

## 문제 풀어보기

함수 표현식을 사용해 만든 아래 함수를 화살표 함수로 바꿔 보았다.

```js
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no()
}

ask(
  '동의하십니까?',
  function() {
    alert('동의하셨습니다.')
  },
  function() {
    alert('취소 버튼을 누르셨습니다.')
  }
)
```

내가 푼 코드는 아래에!

```js
let ask = (question, yes, no) => {
  if (confirm(question)) {
    return yes()
  } else {
    return no()
  }
}

ask(
  '동의하시나요?',
  () => '네 동의합니다',
  () => '아니요 취소합니다'
)
;('네 동의합니다')
ask(
  '동의하시나요?',
  () => '네 동의합니다',
  () => '아니요 취소합니다'
)
;('아니요 취소합니다')
```
