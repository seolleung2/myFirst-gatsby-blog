---
title: 🍎객체 지향 프로그래밍 (12) 용병 Call, 분신술의 Bind
date: 2020-11-01 14:30:00
category: development
draft: false
---

## 👻함수의 변화무쌍함

자바스크립트 언어에서 함수는

1. 혼자 있으면 개인 택시

2. new 가 앞에 있으면 객체를 만드는 신 (갓)이 되고

3. call 을 뒤에 붙이면 용병이 되고

4. bind 를 뒤에 붙이면 분신술을 부리는

놀라운 존재이다. 그만큼 자바스크립트가 유연하며 함수를 호출하는 방식에 따라 참 변화무쌍해 지는구나.

<p align="center"><img src="https://scriptverse.academy/img/tutorials/js-call-apply-bind.png"></p>

## 🛣밑작업

이제 object 와 function 의 관계를 규정해 보자.

```js
const kim = { name: 'kim', first: 10, second: 20 }

const lee = { name: 'lee', first: 10, second: 10 }
```

서로 관계가 없는 두 객체를 생성해 주고, 어떤 객체의.first 그리고 second 값을 더해 리턴하는 기능의 sum() 함수를 그냥 밖에다 선언해 놓았다.

```js
function sum() {
  return this.first + this.second
}
```

오잉? sum() 함수는 현재 어떤 객체에도 속해 있지 않다. 혼자 왕따처럼 있는 상태이다.

어쨋든 객체 내의 first 와 second 를 더해주는 역할을 하는 sum(),

이제 어떻게 써줘야 할까?

## 📲sum.call(kim)

sum.call()

sum 이라고 하는 객체를 실행시킨다는 의미인데, sum() 과 의미가 같다.

그럼 왜 call 을 붙여 쓰는건가 하면,

일단 call() 이라고 하는 메소드는 어.. 모든 함수는 call 이라고 하는 메소드를 가지고 있다.

call 이라고 하는 함수의 메소드를 호출할 때 첫 번째 인자로 kim 을 주면,

```js
sum.call(kim)

function sum() {
  return this.first + this.second
} //sum.call(kim)가 실행되면서 함수 내부적으로 this 가 kim 이 된다.

30
```

즉, sum() 이라는 함수는 본래 kim 이라는 객체의 멤버가 아니였다. 아까 말했든 혼자 놀고 있었다.

근데 sum 함수를 실행한다고 하면서 갑자기 call 이라고 하는 특이한 걸 써가지고서는,

call 의 첫번째 인자로 sum 이 내부적으로 사용할 this 의 값을 kim 으로 지정했더니,

sum 이라는 함수가 비로소 kim 의 멤버인 메서드가 되었다.

## 📲sum.call(kim) 의 두번째 인자

그리고 sum.call(kim) 은 인자를 몇개 더 받을 수도 있다.

```js
function sum(bonusP) {
  return bonusP + (this.first + this.second)
}
sum.call(kim)
NaN
```

기존 정의해 놓은 sum 함수가 bonusP 라는 파라미터를 받고 기존 값에 bonusP 를 더한 값을 리턴하도록 수정하고 sum 함수에 kim 객체를 불러와 실행했다.

위의 결과처럼 NaN 가 나온다.

즉 bonusP 가 없는 값이다. 없는 값에 더했기 때문에 제대로 실행이 되지 않았다.

그리해서,

```js
sum.call(kim, 100)
130
```

call 의 첫 번째 인자로는 그 함수에 내부적으로 this 를 뭘로 할 것인가 가 오게 되고,

두 번째 인자부터는 우리가 호출하려는 함수의 파라미터에 (bonusP) 들어갈 인자값들이 들어간다.

어떤 함수를 실행할 때마다 어떤 객체의 this 값을 바꾸는, 다시말해 context 를 바꾸는 명령어 call 에 대해 학습해 보았다.

## 🦥bind

엮는다. 묶는다의 의미인 bind

sum 이라고 하는 함수가 호출될 때마다 this 를 바꾸는 것이 아니라 아예 함수에 내부적으로 사용할 this 를 다른 어떤 특정한 걸로 딱 고정시켜 버리는 게 바로 bind 라고 한다.

sum.bind(kim);

마찬가지로 bind 에도 sum 함수 내부적으로 this 를 뭘 로 쓸 것이냐에 대한 것으로 첫번째 인자를 받았다.

이제 sum 이라고 하는 함수는 똑같은데 내부적으로 this 를 kim 으로 하는

"새로운 함수" 가 만들어 진다.

```js
const kimSum = sum.bind(kim, '🔜')
// call 과 마찬가지로 함수가 호출될  때 사용할 인자를 지정할 수 있다.
kimSum()
;('🔜30')
```

sum() 은 바뀌지 않았다. 단지 sum 이 취지에 맞게 달라진 새로운 함수가 만들어져서 리턴된 것이다.

sum() 에는 영향을 주지 않는다.

## 🔜요약

call 은 함수를 실행할 때 this 의 컨텍스트를 바꾼다.

bind 를 통해 sum 은 어떤 함수의 내부의 this 값을 "영구적" 으로 바꾸는 새로운 함수를 만들어낸다.

call 메소드는 주어진 this 값 및 각각 전달된 인수와 함께 함수를 호출한다.

bind 메소드는 호출되면 새로운 함수를 생성하고,

받게되는 첫 인자의 value로는 this keyword를 설정하며, 이어지는 인자들은 바인드된 함수의 인수에 제공된다.
