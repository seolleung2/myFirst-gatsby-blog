---
title: Checkpoint - Scope Quiz 10
date: 2020-09-16 22:00:00
category: development
draft: false
---

## 1. 다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 30 // 전역변수 x 선언, 일단은 30이다.

function get() {
  return x // get()함수 선언, 근데 들어오는 파라미터가 없다.
}
var result = get(20) // get 함수에 20이라는 인자를 태워서 실행하려 한다.
```

마지막 줄에 get(20) 함수를 실행한 결과를 result 에 담는다.
get함수 내 20이라는 인자가 담기는데 아쉽게도 선언된 함수 function get () 은 안에 받는 파라미터가 없다.

주고 싶어도 받지 못하는 순간이다.

get() 함수는 x 를 리턴하는데, 이 때 x는 바깥의 전역 변수 x 를 참조하므로 정답은 30이다.

## 2. 다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 30

function get(x) {
  return x
}
var result = get(20)
```

1번 문제와는 다르게 맨 아랫줄에서 get(20) 으로 인자 20을 함수 get 에 보내려는데 받을 수 있는 파라미터 x 가 있다.

return x; 이다. 이 때, x 는 방금 받은 20을 그대로 갖다 쓴다. 1번에서는 전역변수 x 를 참조 했지만, 공부했듯이 참조하는데 있어서 전역변수 보다 지역변수가 우선 순위가 높다.

해서 result 는 20.

## 3. 다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 30 // 전역 변수, 일단 x 는 30이 할당됨.

function get() {
  return x // parameter 가 없는 get() 함수는 x 를 리턴, 이상태라면 get 함수의 실행결과는 30.
}

function set(value) {
  // value 라는 파라미터를 받고 curly bracket 안에서 value 를 참조,
  var x = value // 그 value 를 x 에 재선언.
}

set(10) // 이 때 x 는 10 이 됨.

var result = get(20) // 위의 set(10) 함수와는 상관없이 result 는 30. 1번 문제와 유사한 상황이다.
```

## 4. 다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 30

function get() {
  return x
}

function set(value) {
  x = value
}

set(10)

var result = get(20)
```

이 경우도 3번 문제랑 똑같네 하면서 함수 get 은 20을 받아줄 파라미터가 없으니 return 하는 x 는 전역 변수인 30을 참조하겠지 잌 하면 틀렸다.

이유는 바로 set(10); 함수의 실행에 있다.

set(10) 실행으로 10이라는 인자가 함수 set 의 value 파라미터에 할당이 된다.

중요한 것은, 다음이다.

```js
function set(value) {
  x = value // 함수 내 value 는 지역 범위를 참조해서 함수 실행으로 들어온 인자 10을 본다.
} // 근데 그 10 을 x 에 재할당 하고 있다. 이러면 전역 변수가 x 가 10으로 바뀐다.
```

최종적으로 result 10을 리턴하게 된다. 위 부터 아래로 실행되며 코드를 읽어들이는 거 같다.

## 5. 다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 30

function get(x) {
  return x
}

function set(value) {
  x = value //  set(10) 실행으로 10이 x 에 재할당. 이제 전역 변수 x 는 10.
}

set(10)

var result = get(20) // get(20) 실행으로 인자 20이 function get (x), x 에 할당됨. 받아먹었음.
```

result 는 그래서 20.

## 6. 다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 10

function add(y) {
  // 5. y 파라미터로 5를 받아 먹었다.
  return x + y // 6. y 는 지역변수 5를 참고하고, x 는 참고할게 없어서 전역 x 10을 참조한다.
} // 7. add(5) 는 5 + 10, 15 를 리턴하고 있다.

function strangeAdd(x) {
  // 2. x 파라미터로 5를 받아먹었다.
  return add(x) + add(x) // 3. 아, 최종 결과는 add(5) + add(5) 를 돌려주게 하는구나.
} // 4. function add 함수에 인자 5를 태워 보내니,

var result = strangeAdd(5) // 1. strangeAdd 함수에 인자 5를 태워 보낸다.
```

add(5) + add(5) = 30 이 result 의 결과 값이 된다.

## 7. 다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 10

function outer() {
  var x = 20

  function inner() {
    return x
  }

  return inner()
}

var result = outer()
```

outer() 했을 때, function inner () 의 모습만 보이는 게 아니라 아예 inner 함수가 실행 되어 버린다.

inner 함수는 x 를 리턴한다. 근데 그 x 를 어디서 참조하냐면, 스코프 법칙에 의해 지역 변수인,

var x = 20; 을 먼저 참조해서 가지고 온다.

그래서 20을 리턴하고 result 는 20이다.

## 8. 다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 10

function outer() {
  var x = 20 // (4번째). 이제 이 변수는 30으로 바뀝니다.

  function inner() {
    x = x + 10 // (3번째). 여기서 x는 바로 위 지역변수 x = 20 을 가져와서, + 10 을 한 값 30을 지역 변수 x에 재할당 합니다.
    return x // (5번째). 리턴되는 x 는 바로 위 지역 변수로 변경된 30을 참조하므로 30을 리턴하고.
  }
  inner() // (1번째). inner() 가 아니라 return inner() 가 맞는게 아닌지 궁금합니다.
}

outer() // (2번째). outer() 의 실행으로 inner() 함수를 실행시킵니다.
var result = x // (8번째) 갑분 x 는 함수 내의 변수를 참조할 수 없습니다. 대신 전역 변수 x = 10 을 바라보므로 10 이 됩니다.
```

그래서 result 는 10이긴 한데 왜 inner(); 앞에 return 이 없는지 궁금해서 질문을 올렸다.

#### 2020.09.18 00:10 수정 (아 나중에 블로그에 이런 기능도 추가 하고 싶다)

8번 문제에 대한 답변을 그대로 이어 붙여 본다.

여기서 inner()를 return 해 주지 않은 것은 함정입니다.
inner뒤에 괄호를 열고 닫음을 통해서 inner 함수는 실행을 시켜주었기 때문에 inner()은 30이 될 것입니다.

하지만 이 실행한 inner()를 return을 해주지 않고 있기 때문에 30이라는 값은 outer 함수 안에서 나오지 못하고 갇혀있게 됩니다.

즉, 주석의 2번째 를 통해 outer() 함수를 실행시키기는 했지만, return은 해주지 않고 있기 때문에 outer 함수는 undefined를 return 합니다.

즉, 이 문제를 통해 말하고자 하는 바는 outer 함수 내의 x(지역 변수)와 outer 함수 밖의 x(전역 변수)는 명칭은 같지만 전혀 다른 변수라는 점을 이해하기 위한 문제입니다!

오케! 이해완료!

## 9.다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 10 // 7. 이제 전역 변수는 20.

function outer() {
  x = 20 // 6. outer() 함수의 실행으로 전역 변수 x 에 값을 재할당 한다.
  function inner() {
    var x = x + 20 // 2. x 는 바로 위 x = 20 을 참고해서, inner 함수에 x를 재선언 했다.
    return x // 3. 40을 리턴한다.
  }
  inner()
}

outer() // 1. inner() 함수를 실행하기 시작.
// 5. 40을 리턴한다.

var result = x // 8. 전역 변수 20을 가져오므로 result 는 20.
```

이 경우에는 result 값이 맞앗긴 했지만,

outer 함수에서 40을 반환하는 게 아닌 NaN 을 반환했다. 왜일까?

```js
var x = 10

function outer() {
  x = 20
  function inner() {
    var x = x + 20
    return x
  }
  return inner()
}

outer()
NaN
let result = x

result
20
```

왜일까? 이것도 헬프 데스크에 올려보았다.

## 10. 다음의 코드를 실행시킨 후에 result 의 값 은 무엇이 될까요?

```js
var x = 10 // 전역 변수가 20으로 재할당 됨.

function outer() {
  x = 20
  function inner() {
    x = x + 20 // 바로 위 x 에서 20을 가져와서 x 가 40이 된 것을 전역 변수에 다시 40으로 할당.
  }
  inner()
}

outer()

var result = x // 전역변수 40을 result 에 할당.
```

result 는 40.
