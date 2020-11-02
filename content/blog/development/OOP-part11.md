---
title: 🍎객체 지향 프로그래밍 (11) __proto__, Object.create() 자유자재로 다루기
date: 2020-11-01 01:20:00
category: development
draft: false
---

## ⚡️1. \_\_proto\_\_ 방식

```js
let esanghaessi = {
  name: '이상해씨',
  type: '풀',
  attack1: 45,
  attack2: 95,
  sum: function() {
    return this.attack1 + this.attack2
  },
}
let ggoboogi = { name: '꼬부기', type: '물', attack1: 75, attack2: 25 }
```

꼬부기는 이상해씨의 점수 합치기 스킬을 가져다 쓰고 싶다!

<p align="center"><img src="https://ww.namu.la/s/187c5738ec5244e5577ab34c31a7acb4ac8b58ea91c887f14e226d4f2b3323a632b91a3ba2b0b56b88d76be17edf6724a98e9ae8f96ad418a008f37ad10c77e12a5e73a71309531e9f6ade98769d22d230cc816781e41b47e630a92ea29f71f7"></p>

```js
ggoboogi.__proto__ = esanghaessi
console.log(ggoboogi.sum())
100
```

꼬부기는 생각했다.

난 점수합치기도 할 수 있고 점수평균도 할 수 있어!

이건 나만 할 수 있어 이상해씨는 못하는 기술이야~ 이상해씨 바보~(?)

라이츄의 신기술을 쓰고 싶지만 참기로 하고 꼬부기에게 점수 평균 스킬을 부여해 주자.

```js
let ggoboogi = {
  name: '꼬부기',
  type: '물',
  attack1: 75,
  attack2: 25,
  avg: function() {
    return (this.attack1 + this.attack2) / 2
  },
}
ggoboogi.__proto__ = esanghaessi // 다시 연결해 주고

console.log("꼬부기의 공격 점수 합계 :" + ggoboogi.sum())
꼬부기의 공격 점수 합계 :100
ggoboogi.avg()
console.log("꼬부기의 공격 점수 평균 :" + ggoboogi.avg())
꼬부기의 공격 점수 평균 :50
```

꼬부기는 이상해씨의 기술을 모두 받고 다른 고유 스킬도 부릴 줄 알게 되었다.

이번엔 다른 방법으로 해볼까?

## 💦2. Object.create()

서브 객체로 지우레기를 만들었다.

<p align="center"><img src="https://i.imgur.com/46dr5hY.jpg/thumb"></p>

```js
let esanghaessi = { name : '이상해씨',
                    type : '풀',
                    attack1 : 45,
                    attack2 : 95,
                    sum : function () {
                      return this.attack1 + this.attack2
                      }
                    }

let jiwooleegi = Object.create(esanghaessi);

console.log(jiwooleegi)
{}__proto__:
attack1: 45
attack2: 95
name: "이상해씨"
sum: ƒ ()
type: "풀"
__proto__: Object

// 지우레기의 속성을 넣어준다.
jiwooleegi.name = "지우레기"
jiwooleegi.type = "꼬장의결정체"
// 지우레기만 쓸 수 있는 avg 메서드
jiwooleegi.avg = function () {return (this.attack1 + this.attack2) / 2}
console.log(jiwooleegi)
name: "지우레기", type: "꼬장의결정체", avg: ƒ
console.log(`${jiwooleegi.name}의 공격 점수 합계 : ${jiwooleegi.sum()}, 공격 점수 평균 : ${jiwooleegi.avg()}`)
지우레기의 공격 점수 합계 : 140, 공격 점수 평균 : 70
```

지우레기는 미워서 딱히 설명을 달지 않았다.

하지만 지우레기를 만들기 위해 사용했던 Object.create() 는 지우레기가 이상해씨 공장 출신이라는(?) 것을 알게 해준다.
