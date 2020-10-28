---
title: 🍎객체 지향 프로그래밍 (3) Constructor
date: 2020-10-28 16:35:00
category: development
draft: false
---

## 👜에르메스

![](https://i.pinimg.com/originals/ef/64/64/ef6464f445aef48160b2f713e6888156.jpg)

https://dev-seolleung2.netlify.app/development/OOP-part2/

바로 전 글에서 만든 서랍장은 말 그대로 가내 수공업 에르메스 다.

한땀한땀 서랍장의 name, record 가 뭔지 정성스럽게 만들었다. 서랍장 하나당 기본 500만원을 호가한다.

```js
let cutiehany = {
  name: 'hany kim',
  first_record: 10, //첫 번째 게임의 스코어
  second_record: 20, //두 번째 게임의 스코어
  sum: function() {
    return this.first_record + this.second_record;
  },
}

console.log("게임스코어의 합계 :" , cutiehany.sum())
게임스코어의 합계 : 30
```

게임 두판 플레이한 유저를 일일이 1억개 만들 수 있을까? 할 수 있다.

그런데 기껏 다 만들어 놨는데 플레이한 게임의 세번째 기록 (third_record) 을 추가하라고 한다면,

고생도 이런 개고생이 없는거다.. 1억개의 객체 에 각각 일일이 부랴부랴 추가해 줘야 하고 return 문도 손봐야 하니까 말이다.

바로 이런 불편함 때문에 유저 정보를 찍어내는 공장을 만들거고,

그리고 그 공장을 통해 서랍장 (객체) 을 대량 양산할 거다.

## ⏰new Date() 로 알아보는 객체 양산의 사례

```js
let dateInfo = new Date('2020-10-28')

dateInfo
Wed Oct 28 2020 09:00:00 GMT+0900 (대한민국 표준시)
dateInfo.getFullYear()
2020
dateInfo.getDay()
3 // 수요일을 의미
```

현재날짜를 파라미터로 담아서 현재 날짜를 데이터, 상태로 가지고 있는 객체가 만들어져 dateInfo 에 담겼다.

맨 위의 객체와 다르게 객체의 설계도가 노출되지 않았다.

이를 통해 new 를 붙였을 때 객체를 만들어서 리턴 해 주고 있는 것 같다.

아까 만들었던 가내 수공업 객체도 저런식으로 미리 공장을 만들어 놓고 생산한다면 코드도 깨끗해지고 이따금 공장장의 변덕으로 공장 라인변경을 통해, 만들어지는 모든 객체가 자동으로 다르게 생성될 것이다.

## 🏭Factory 만들기

![](https://img2.ruliweb.com/img/img_link7/301/300395_1.jpg)

위에 만든 let dateInfo = new Date('2020-10-28') 를 보면 마치 함수를 호출한 모양 같다.

실제 함수가 맞다.

그렇기 때문에 공장을 한번 만들어 본다.

```js
function UserInfo() { // UserInfo() 라는 함수를 통해 만들어진 객체, this!
  this.name = 'hany kim' // 그래서 속성마다 this 를 앞에 붙이는 거다.
  this.first_record = 10;
  this.second_record = 20;
  this.third_record = 30;
  this.sum = function() {
    return this.first_record + this.second_record + this.third_record;
  }
}

console.log("유저 정보 :", UserInfo());
유저 정보 : undefined
```

유저 정보가 undefined 가 뜬다. 아무 것도 리턴하는 것이 없다.

## 🎉마법의 키워드 new, 그리고 Constructor

UserInfo() 앞에 new 라는 키워드를 붙이면 완전히 다른 존재가 된다. UserInfo 라는 객체가 딱 만들어 진다.

new 가 붙지 않은 UserInfo() 는 그냥 함수이지만

new 가 붙은 new UserInfo() 는 객체를 생성하는 "생성자" (Constructor) 가 된다.

생성자 함수라고 부르기도 한다.

```js
console.log("유저 정보 :", new UserInfo());
유저 정보 :
UserInfo {name: "hany kim", first_record: 10, second_record: 20, third_record: 30, sum: ƒ}
first_record: 10
name: "hany kim"
second_record: 20
sum: ƒ ()
third_record: 30
__proto__: Object
```

이제 유저를 두개 양산해 보자.

let seolleung2 = new UserInfo();
let insoozzang = new UserInfo();

얼레? 두 유저의 점수 합계가 같게 나온다?

seolleung2.sum()
60
insoozzang.sum()
60

constructor 내부적으로 동일한 상태이므로 생성자 함수 내 인자에 다른 정보를 태워 보내야 한다.

```js
let seolleung2 = new UserInfo('seolleung2', 10, 20, 30)
let insoozzang = new UserInfo('insoozzang', 10, 10, 10)
```

그리고 공장에 constructor 도 수정해 줘야 한다.

```js
function UserInfo(name, first, second, third) {
  this.name = name
  this.first_record = first
  this.second_record = second
  this.third_record = third
  this.sum = function() {
    return this.first_record + this.second_record + this.third_record
  }
}
```

위의 함수는 constructor function 이라 부르기도 한다.

그리고 점수의 합계가 다르게 나오는 것을 확인해 볼 수 있다.

seolleung2.sum()
60
insoozzang.sum()
30

뭔가 컨스트럭터 함수는 만들어질 객체의 속성을 정의하면서 초기의 값을 지정해 놓는 형태인 것 같다.

## 🎆이거 만들면 뭐가 좋앙?

수공예 에르메스 장인은 만들 때마다 객체를 다시 지정해 줘야 하는데 constructor function 을 만들면 앞에 new 키워드를 사용함으로써 실행할 때마다 객체가 양산된다.

그리고 생성자 함수의 내용을 바꾸면 (생산라인을 바꾸면) 그 함수에 의해 만들어지는 모든 객체가 한 번에 바뀌어 생산되는 폭발적인? 효과를 얻게 된다.
