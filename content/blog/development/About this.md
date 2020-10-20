---
title: This 키워드에 대해
date: 2020-10-20 21:30:00
category: development
draft: false
---

## 🚬this 키워드

객체의 구조분해할당 을 학습하고 이제 이 this 키워드 라는 것에 대해 블로깅 해보려 한다.

첫번째. 블로그 주인 : 나는 멋진 백엔드 개발자가 될 거야.

두번째, 이머시브 동기 : 나는 더 구체적으로 프론트 엔드 개발자가 될 거야.

세번째, 지나가는 행인 : 흥 나는 다 필요없고 로또나 하나 얻어 걸려 돈많은 백수가 될 거야.

this 를 하는데 갑자기?
첫번째의 '나' 는 바로 블로그 주인이다. 나머지도 각자 다 동기, 헹인으로 되어있다.

```js
나 === 블로그 주인
나 === 이머시브 동기
나 === 지나가는 행인
```

누가 썼는지에 따라, '나' 라는 의미가 달라졌다.

일단 그래서 this 키워드에 대한 정의를 복사해 오면,

```js
this는 함수 실행시 호출(invocation) 방법에 의해 결정되는 특별한 객체입니다.
함수 실행시 결정되므로, 실행되는 맥락(execution context)에 따라 this는 다르게 결정됩니다.
```

텍스트로만 읽어서 대체 뭔지 감이 오지 않았지만, AboutThis.js 파일을 통해 과제를 해결해 나가면서 느낌을 조금 찾았다.

## 📟호출값에 따른 this 의 값 (global vs module.exports)

브라우저 환경에서 this는 기본적으로 window 객체를 가리킨다.

node.js 환경에서 this는 기본적으로 module.exports 객체를 가리키고 이는 빈 객체가 들어 있는 것 ({}) 과 같다고만 확인하고 넘어갔다.

실제 실행해 보면 아래와 같다.

```js
Module {
  id: '<repl>',
  path: '.',
  exports: {},
  parent: undefined,
  filename: null,
  loaded: false,
  children: [],
  paths: [
    '/Users/seolleung/my-blog/repl/node_modules',
    '/Users/seolleung/my-blog/node_modules',
    '/Users/seolleung/node_modules',
    '/Users/node_modules',
    '/node_modules',
    '/Users/seolleung/.node_modules',
    '/Users/seolleung/.node_libraries',
    '/Users/seolleung/.nvm/versions/node/v12.18.3/lib/node'
  ]
}
```

그런데 node.js 환경에서 함수를 호출할 때 this 를 리턴하면, this 의 값은 global 이라는 객체를 불러온다.
이 global 이라는 객체는 브라우저 환경의 window 객체와 비슷하게 작동한다.

이건 블로그의 맨 마지막 절에서 node 콘솔 내에서 실행한 결과 값을 확인해 볼 수 있다.

```js
// 1. 함수 표현식
const foo = function() {
  return this
}

expect(foo()).to.eql(global)

// 2. 함수 선언식
function foo() {
  return this
}

expect(foo()).to.eql(global)
```

이처럼 함수 식 내에 this 가 있고 이 때 함수를 호출했을 때 this 값을 확인해 보면,
global 과 동일함을 확인할 수 있다.

하지만 화살표 함수를 호출할 때 this 값은 global 이 아니다.

```js
const foo = () => {
  return this
}

expect(foo()).to.eql(module.exports)
```

화살표 함수를 호출했을 때 this 값은 module.exports 라 한다. 왜일까? foo 가 아니고?

## ⚒함수와 메소드의 차이.

함수는 알고 있지만 메소드는 특히,
객체의 속성 값으로 담긴 함수를 특별히 "메소드" 라고 부른다.

가령 foo() 가 일반적인 함수의 실행이라면,
foo.bar() 는 foo 라는 객체의 bar 라는 key 의 속성 (value) 값으로 담긴 어떤 함수를 실행하는 메소드 이다.

```js
const counter = {
  value: 0,
  increse: function() {
    this.value++
  },
  decrease: function() {
    this.value--
  },
  getValue: function() {
    return this.value
  },
}

counter.increse()
counter.increse()
counter.decrease()
expect(counter.getValue()).to.eql(1)
```

counter 라는 객체에는 네 종류의 키가 있고 (value, increase, decrease, getValue), value 를 제외한 나머지 세 종류의 키의 속성에는
익명 함수가 각각 선언되어 있다.

각 함수내에 선언되어 있는 this 는 counter 라는 객체를 가리키고, this.value 는 counter 객체의 value 키를 가리킨다.

이제 위의 코드를 화살표 함수로 작성한 뒤 메소드를 호출했을 때 this 는 어떻게 확인 될까?

이해는 되지 않지만 일단 그렇구나 하고 나를 내려 놓기로 했다.

아까 화살표함수를 호출할 때 리턴되는 this 를 확인해 본 값은 module.exports 라 했다. 그 상태에서 아래 코드를 확인한다.

```js
module.exports.value = 100

const counter = {
  value: 0,
  increse: () => {
    this.value++
  },
  decrease: () => {
    this.value--
  },
  getValue: () => {
    return this.value
  },
}

counter.increse()
counter.decrease()
counter.decrease()
expect(counter.getValue()).to.eql(99)
```

즉 화살표 함수내의 this 키워드가 가리키는 것은 객체 counter 가 아니라 'module.exports' 인 것이다.
그리고 맨 윗줄에 module.exports.value = 100 이라고 선언을 해 놓은 상태이므로 바로 이 값을 증가시키고 감소시키는 것이다.

학습 마지막에,
메소드 선언시에는 화살표 함수 사용을 피하거나, 화살표 함수를 사용할 경우 this 사용을 피해야 한다고 주석에 설명이 되어 있다.

## 🎉new 키워드와 생성자

객체 지향 프로그래밍 학습에서 봤던 그 new 키워드를 이용해 함수를 호출할 수 있고 그 해당 함수를 특별히 "생성자" 라고 부른다.

바로 위의 예시인 객체.메소드() 처럼 객체 내의 메소드를 호출하는 방법과 비슷하지만 객체가 new 키워드를 이용해서 만들어 졌다는 점이 다르다.

이때의 객체를 인스턴스라고 부르며,
인스턴스.메소드() 형태의 호출이 된다.

```js
let this_value_in_constructor

function Car(name, brand, color) {
  this.name = name
  this.brand = brand
  this.color = color

  this_value_in_constructor = this
}
```

Car 라는 클래스 (함수) 를 선언했다.
바로 아래의 코드인 this _ value _ in_constructor = this; 가 없었더라면 this 가 가리키는 것은 global 이였을까?

(지금 보니 없어도 생성자 호출을 할 때, this는 new 키워드로 생성한 Car 의 인스턴스 mycar, yourcar 가 된다.)

그리고 아래의 코드와 같이 만들어진 함수를 호출한다.

```js
const mycar = new Car('mini', 'bmw', 'red')
expect(mycar.name).to.eql('mini')
expect(mycar.brand).to.eql('bmw')
expect(mycar.color).to.eql('red')
expect(this_value_in_constructor).to.eql(mycar)

const yourcar = new Car('911', 'porsche', 'black')
expect(yourcar.name).to.eql('911')
expect(yourcar.brand).to.eql('porsche')
expect(yourcar.color).to.eql('black')
expect(this_value_in_constructor).to.eql(yourcar)
```

#### ✨생성자 호출을 할 경우, this는 new 키워드로 생성한 Car 의 인스턴스입니다.

위의 클래스 함수 에서 this _ value _ in_constructor 를 지우고 콘솔에 실행해 봤는데 동작했다.
저 변수는 아마도 this 가 어떤 것인지 보여주기 위한 변수 일까 추측해 본다.

그래서 this _ value _ in_constructor 를 콘솔에서 확인해 보면 아래와 같다.

```js
this_value_in_constructor
Car {name: "mini", brand: "bmw", color: "red"}
```

그러니까 저 Car 라는 클래스 내의 this 는 위와 같은 형태라는 말이다.

```js
this_value_in_constructor === mycar
true
```

## 🈚️new 키워드 없이 호출했을 때

```js
const secondcar = Car('spark', 'chevrolet', 'violet')

expect(secondcar).to.eql(undefined) // 왜일까요?
expect(this_value_in_constructor).to.eql(global)
```

new 키워드 없이 호출 했을 때 this 키워드는 global 객체를 불러온다.

this _ value _ in_constructor 를 node 에서 실행하면 아래와 같은 global 객체가 나온다.

```js
Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  Car: [Function: Car],
  name: 'spark',
  brand: 'chevrolet',
  color: 'violet'
}
```

즉, 아래와 같이 불러올 수 있지만 이러면 클래스를 사용하는 의미가 없겠지 싶다.

```js
> global.name
'spark'
> global.brand
'chevrolet'
> global.color
'violet'
```

과재는 제출했지만 난 여기까지 이해 하기 위해 블로그 정리를 한 뒤 보는 시간을 가져야 겠다.

오늘 끝!

# 😭😭😭😭😭😭😭😭😭😭
