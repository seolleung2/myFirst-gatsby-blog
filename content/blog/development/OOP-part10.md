---
title: 🍎객체 지향 프로그래밍 (9) __proto__ 를 대체하는 Object.create()
date: 2020-10-31 23:55:00
category: development
draft: false
---

## 👻Object.create()

이전 글 참조.

### https://dev-seolleung2.netlify.app/development/OOP-part9/

\_\_proto\_\_ 를 대체하는 방식이다.

자바스크립트에게 피카츄를 부모로 하는 새로운 객체를 만들라 명령할 때 쓴다.

```js
let pikachu = {
  attack: 90,
  defence: 50,
  skillOne: 'toSlapYourFace',
  skillTwo: 'lightning shock',
}
let raichu = Object.create(pikachu)
raichu
{
}
__proto__: attack: 90
defence: 50
skillOne: 'toSlapYourFace'
skillTwo: 'lightning shock'
__proto__: Object
```

Object.create() 의 인자에 부모 객체를 태워서 새로운 객체를 만드는데, 그 새로운 객체는 pikachu 를 부모로 하는 새로운 객체 이다.

그래서 raichu 가 만들어 졌는데 아무것도 없는 텅텅 빈 객체 같다.

하지만 raichu.\_\_proto\_\_ 는 위에서 보듯이 정확히 pikachu 를 가리키고 있다.

## ⚡️라이츄에게 다른 속성 넣어주기

![](https://images-na.ssl-images-amazon.com/images/I/61NEy1dZTQL.jpg)

```js
raichu.cuteness = 100
100
raichu.specialSkill = 'jungwangsukhwa'
;('jungwangsukhwa')
raichu.canEvolve = true
true
```

이제 라이츄는 귀여움, 특수스킬, 진화가능여부 의 속성을 얻었다.

```js
raichu
{cuteness: 100, specialSkill: "jungwangsukhwa", canEvolve: true}
canEvolve: true
cuteness: 100
specialSkill: "jungwangsukhwa"
__proto__:
attack: 90
defence: 50
skillOne: "toSlapYourFace"
skillTwo: "lightning shock"
__proto__: Object
```

라이츄는 피카츄를 부모로 하는 새로운 객체가 된다.

전 글에 이어 마찬가지로 라이츄 공격력을 두 배로 뻥튀기 했다.

```js
raichu.attack = 180
180
pikachu.attack
90 // 부모 속성은 그대로 이다.
```

이처럼 \_\_proto\_\_ 를 사용하는 것 보다 Object.create() 를 통해 객체와 객체간의 상속관계, 프로토 링크를 지정해 주는 것이 더 좋다.

마지막으로,

```js
raichu.__proto__
{attack: 90, defence: 50, skillOne: "toSlapYourFace", skillTwo: "lightning shock"}
raichu.__proto__ === pikachu
true
```
