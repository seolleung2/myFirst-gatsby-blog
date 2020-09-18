---
title: BTS 가 나오는 스코프 문제😍
date: 2020-09-18 15:46:00
category: development
draft: false
---

## Koans_04_Scope.js 를 풀면서😳

```js
it('lexical scope와 closure에 대해 다시 확인합니다.', function() {
  let age = 27
  let name = 'jin'
  let height = 179

  function outerFn() {
    let age = 24 // 2. 이제 여기 age 는 26 이다.
    name = 'jimin'
    let height = 178

    function innerFn() {
      age = 26 // 1. 바로 바깥 outerFn 의 지역 변수 age 가 26 으로 재할당 된다.
      let name = 'suga'
      return height
    }

    innerFn() // return 은 하지 않았다. 실행은 했다.

    expect(age).toBe(26)
    expect(name).toBe('jimin') // 여기에 왜 jimin 이 들어가지? 'suga' 가 아닌가?

    return innerFn
  }

  const innerFn = outerFn()

  expect(age).toBe(27)
  expect(name).toBe('jimin')
  expect(innerFn()).toBe(178)
})
```

코드 가운데 쯤 innerFn() 실행을 한다. 실행을 할 뿐 뭔가 돌려주는 return 은 없다.

실행이 되면서 innerFn 내부에 age = 26; 을 통해 바로 위 지역변수 age 에 재할당 을 해주고 있다.
그래서 age 는 26 으로 바뀌게 된다.

고정관념에 갖혀서인가? 그 다음,

```js
innerFn()

expect(age).toBe(26)
expect(name).toBe('jimin')
```

변수 name 이 왜 'suga' 가 아닌 'jimin' 이란 말인가?
함수 바깥에서 안쪽 함수의 변수에 접근할수가 없다는 것은 알고 있었는데, 이제 innerFn() 이 실행되었으니까 거기에서 name 을 가져오는 거다 로 잘못 해석했던 것이다.

그럼 제대로 알고 있던 게 아니였구나.

Helpdesk 에 질문을 통해 원하는 답을 얻게 되었다.

<p align="center"><img src="https://user-images.githubusercontent.com/59815596/93555261-71fa2280-f9b0-11ea-983f-c7712862df13.png"></p>

일단, @seolleung2 님 말씀처럼 innerFn()을 실행한 뒤의 값을 보는 질문입니다. innerFn 안의 age는 선언해 주지 않은 상태이기 때문에 위의 지역변수를 가지고 오게 됩니다.
그렇다면 innerFn 안에 선언된 name은 어떨까요? innerFn 안에 선언된 name이 outerFn에서 사용이 가능할까요?
@seolleung2 님도 아시겠지만, 안쪽 스코프에서 바깥쪽 스코프로의 접근은 가능하지만 바깥쪽 스코프에서 안쪽 스코프로의 접근은 불가합니다. 그렇기 때문에 innerFn 안에 선언된 let name = sugar는 innerFn 안에서만 사용이 가능하고, outerFn에서는 불가합니다.

## 🥰감사합니다!!
