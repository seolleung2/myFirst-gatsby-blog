---
title: Day 2 DevLog (Tue)
date: 2020-09-08 22:09:00
category: CodeStates TIL
draft: false
---

## 🛀07:30 - 기상 및 씻기

좀 늦게 일어났다.. 일곱시에 알람을 맞춰 놓았는데, 더 자고 싶어서 몸이 움직이지를 않는다.

## 🚶‍♂️08:00 - 학습 장소로 이동 및 식사

집 나와서 바로 근처에 작은 카페가 3-4 군데 있는데, 이 중 한 곳에서 아침 한정 삼각김밥을 판매한다.
그래서 냅다 2개를 샀다.

집에서 챙겨온 구운 계란 및 삼각김밥 하나를 해치우고 어제 한 복습 블로그 써야지 하니까 8시 40분..

여튼 작성 완료.

## 💡09:00 - 조건문 lesson

1. 어떠한 조건을 판별하는 기준을 만드는 것

2. 반드시 비교 연산자가 들어간다.

- 자바스크립트에서의 같다(equal) 는 아래를 보자.

```js
function myName(name) {
  if (name === '선릉이') {
    return `제 이름은 ${name} 입니다.`
  } else {
    return '내 이름 빼곤 소개금지!'
  }
}
```

3. 조건문의 형태

위의 코드를 참고 하면 대략적인 형태를 알 수 있음.

4. 두 가지 조건문이 한 번에 적용되는 경우

논리 연산자 (Logical Operator) 를 사용

무엇이 아니다! 할 때 쓰는 !

> > > 이 느낌표 (!) 는 Not 을 의미하는 연산자 이다. truty, falsy 여부를 반전시킨다.

4. 조건문의 실습

!undefined 는 어떻게 나올까?
!'Hello' 는 어떻게 나올까?

5. 기억해야 할 6가지 falsy 값

아래 링크 참조

### https://developer.mozilla.org/ko/docs/Glossary/Falsy

6. 조건문 문제로 에러 메세지 알아보기

에러 메세지를 읽는 법, 오류난 코드를 수정해 가는 디버깅 과정에 대해 이해해 보게 되었다.

## 🚀10:00 - 페어 프로그래밍 : 조건문

내가 드라이버 역할을 맡아 12시 까지 조건문의 절반 가량을 페어 님과 함께 풀었다.

## 🍱12:00 - Lunch Time

남은 삼각김밥 하나와 훈제란 2개 먹고 끝

## 📝13:00 - 페어 프로그래밍 : 조건문 ~

## 🕹14:00 - 조건문으로 배우는 알고리즘 lesson

수도 코드에 대해 알게 되었다.

> > > 수도 코드란 프로그램의 절차 하나하나를 우리가 실제 사용하는 일반적인 언어를 이용해서 작성하는 방법이다.

프로그램이 어떻게 작동하는지 그 흐름을, 즉 숲을 보기 위함이지 않을까.

## 🖌12:30 - 문자열 다루기 lesson

- 문자 자체를 배열로 인식하는 것 같다.
- 문자열은 읽기 전용이다. 접근은 가능하지만 (즉 볼수는 있지만), 그 값을 바꾸거나 하는 수정은 불가하다.
- 새로 값을 할당하지 않는 이상 바뀌지 않는다.

- 문자열에 다른 타입을 + 연산자를 통해 더하면 문자열로 강제 전환된다.

- 문자열의 전체 길이를 반환하는 str.length

- 찾고자 하는 문자 또는 문자열이 시작되는 index 를 알려주는 str.indexOf(searchValue)

- return 값이 배열로 나오며 separator value 를 기준으로 쪼개지는 str.split(separator)
  : 개행 문자 \n 에 대해 알게 되었다.

- str.substring(start, end)
  : end - 1 의 index 까지의 문자열만 가지고 온다고 함

- str.toLowerCase()
- str.toUpperCase()

> > > 모든 string method 는 immutable 이다. 바꿔서 값을 보여주지만 기존 할당된 원본은 변하지 않는다.

> > > array (배열) method 는 immutable 및 mutable 여부를 잘 기억해야 한다고 함.

## 💻15:00 - 17:00 페어 프로그래밍 : 조건문 ~

문제가 쉽지 않다는 것을 느꼈다.

## 😱17:00 - 19:00 오피스 아워

엔지니어 님께서 학습했던 내용을 되짚어 주시고 질문을 해결하며 어려웠던 문제를 함께 풀어보는 시간이였다.

## 🤔느낀점

얼른 가서 자야겠다.