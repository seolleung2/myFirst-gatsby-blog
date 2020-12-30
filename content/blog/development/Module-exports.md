---
title: 🐼Module.exports - Checkpoint Solution with Socrative
date: 2020-12-30 23:20:00
category: development
draft: false
---

## ✍🏻Socrative 오답노트

## 1번

Assume you have the following in subject.js:

```js
let x = 10
let mod = require('./lib/my-module.js') let result = mod.x
```

...and the following in lib/my-module.js:

```js
let x = 20
exports.x = 30
```

After subject.js runs, what will be the value of result?

<b>Answer : 30</b>

subject.js 에서 console.log(mod) 를 해보면,

```js
{
  x: 30
}
```

## 2번

Assume you have the following in subject.js

```js
let mod = require('./lib/my-module.js')
let result = mod.x
```

...and the following in lib/my-module.js:

```js
let x = 10
exports.x = 20
module.exports.x = 30
```

After subject.js runs, what will be the value of result?

<b>Answer : 30</b>

my-module.js 에서,

exports = module.exports = { x : 20 }

서로 같은 주소를 바라보게 된다.

고로 어느 한 쪽이 바뀌어도 자동으로 한쪽도 같은 주소를 바라보므로 바뀌게 된다.

## 3번

Assume you have the following in subject.js:

```js
let mod1 = require('./lib/my-module.js')
let mod2 = require('./lib/my-module.js')
let result = mod1 === mod2
```

...and the following in lib/my-module.js:

```js
exports.obj = { name: 'Alice' }
```

After subject.js runs, what will be the value of result?

<b>Answer : true</b>

mod1 과 mod2 는 같은 주소 객체를 바라보는 변수라는 사실을 인지하면,

원시타입이 아닌 자료형의 비교는 주소 참조 이므로 결국 같은 주소를 바라본다.

고로 true

## 4번

Assume you have the following in subject.js:

```js
let mod1 = require('./lib/my-module.js')
let mod2 = require('./lib/my-module.js')

mod1.increment()
let result = mod2.increment()
```

...and the following in lib/my-module.js:

```js
let counter = 0
exports.increment = function() {
  counter += 1
  return counter
}
```

After subject.js runs, what will be the value of result?

<b>Answer : 2</b>

mod1 과 mod2 변수는 같은 주소값을 가진 객체를 바라본다. (함수도 객체의 한 종류이니까)

mod1.increment(); 을 통해 counter 가 1 이 되었다.

let result = mod2.increment();

같은 주소값을 가진 객체를 보므로 counter 가 2로 올라가고 result 는 2가 된다.

## 5번

Assume you have the following in subject.js:

```js
let mod1 = require('./lib/my-module.js')
let mod2 = require('./lib/my-module.js')
```

...and the following in lib/my-module.js:

```js
console.log('Loading module!')
```

After subject.js runs, how many logs in the console will you see?

<b>Answer : 1</b>

mod1 과 mod2 가 같은 주소 객체를 보는것은 이해했다.

하지만 이 경우에는 한 번만 log 가 찍힌다.
