---
title: 🍎객체 지향 프로그래밍 (9) 객체 간 전통적 방식의 상속방식, __proto__
date: 2020-10-31 22:45:00
category: development
draft: false
---

## 🦸🏻‍♂️prototype-inheritance

![](https://media.vlpt.us/post-images/adam2/12a5e250-fd90-11e9-959f-1f9679bea880/1nDBFaMpflmSsIKfMLxWIvQ.jpeg)

자바스크립트 Class 문법이 아닌 전통적 방식으로 상속을 구현하는 법에 대한 글이다.

```js
let pikachu = {
  attack: 90,
  defence: 50,
  skillOne: 'toSlapYourFace',
  skillTwo: 'lightning shock',
}

let raichu = { cuteness: 100, specialSkill: 'jungwangsukwha', canEvolve: true }
```

여기 피카츄와 라이츄가 있다. 각각의 속성을 수작업으로 만들어 주었다.

현재 두 객체는 서로 남남이다. 1도 상관없는 사이이다.

## 🌉\_\_proto\_\_\

![](https://ww.namu.la/s/3e7464bb7b69c699c56a968b51e01015f9bf51e780394bd971ac0f0cec4856f19011fd010269f78c889b8b856c23cc8cb1ede0fc3c6c6774059691646518d386180a3c3c7e615e1193016d0ec40eac05ffe55a3d44ce2322522236bca5abfd8a)

위의 다소 난해한 듯한 예시를 들긴 했는데 사실,

```js
let superObj = { superVal: 'super' } // === pikachu
let subObj = { subVal: 'sub' } //  === raichu
```

랑 똑같은 방식이다. 더 재밌게 해보고 싶었을 뿐..

여하튼 두 객체는 서로 남남인 상태인데 자바스크립트 에서는 Class 문법이 아닌, 객체를 직접 다른 객체의 자식으로 만들어 버릴 수가 있다.

어떻게?

바로 라이츄의 원형이 무엇인가를 가리키는 (라이츄의 원형은 피카츄 ㅎㅎ..🥰) prototype link 를 정해주면 된다.

```js
raichu.__proto__ = pikachu;
{attack: 90, defence: 50, skillOne: "toSlapYourFace", skillTwo: "lightning shock"}
raichu.cuteness
100
raichu.specialSkill
"jungwangsukwha"
raichu.canEvolve
true
```

당연 라이츄의 기본 속성을 선택하면 자기가 갖고 있는 값이므로 고대로 나온다.

근데 만약 라이츄.스킬One 첫번째 이렇게 하면 뭐가 나올까? 라이츄의 속성엔 스킬One 이 없어서 아무것도 안나올까?

```js
raichu.skillOne
;('toSlapYourFace')
raichu.skillTwo
;('lightning shock')
```

<p align="center"><img src="https://jjalbot.com/media/2018/12/FxIV6_Mff/zzal.gif"></p>

피카츄 (원형객체) 의 싸대기 스킬을 그대로 물려받았다!

라이츄의 속성에는 skillOne, skillTwo 을 안갖고 있음에도 불구하고 스킬을 물려받았다!

```js
raichu.__proto__ = pikachu
```

언더바 proto 링크를 통해 라이츄가 피카츄의 자식이다. 피카츄의 속성을 모두 물려받는다 라고 링크를 걸어준거다.

작동 원리는 Javascript 에서는 우선적으로 라이츄에서 스킬원과 스킬투 속성을 갖고 있는지 먼저 찾게 될 것이다.

하지만 없다. 그러면 언더바 proto 라는 속성을 담고 있는 객체에 (피카츄) 들어가서 스킬원과 스킬투 속성을 찾는다.

있다!

그럼 쓴다! 라이츄는 피카츄의 속성을 물려받는다!

## 🎃피카츄에게 물려받은 속성을 바꿔보기

피카츄의 공격력은 현재 attack : 90 이다.

피카츄의 공격력도 라이츄가 상속받았으므로,

```js
raichu.attack
90
```

명색이 라이츄인데 공격력이 한 두배는 되어야지 않겠나.

바꿔보자.

```js
raichu.attack = 180
180
```

여기서 의문이 드는거다. 어라 라이츄 공격력 바꿨는데.. 피카츄 공격력도 바뀌나요?

답은 아니.

```js
pikachu.attack
90
```

피카츄의 공격력은 여전히 똑같다.

즉, 라이츄의 (자식 객체 내 요소의) 값을 바꿨을 뿐 \_\_proto\_\_\가 가리키고 있는 객체의 (피카츄) 값을 가리키는게 아니다.

피카츄 객체의 proto 를 바꾸는 게 아니다.

## 🤤요약

** proto ** 를 통해 다른 객체의 자식으로 만들 수 있다는 것을 알았다.

```js
raichu.__proto__ = pikachu;
{attack: 90, defence: 50, skillOne: "toSlapYourFace", skillTwo: "lightning shock"}
raichu.cuteness
100
raichu.specialSkill
"jungwangsukwha"
raichu.canEvolve
true
```

장점은 유연함, 단점은 사고 혹은 복잡성을 야기한다고 한다. (일단 넘어가자)

자바스크립트 표준에서는 \_\_proto\_\_\ 를 인정하고 있지 않다고 한다.

하지만 대부분의 브라우저 혹은 javascript 시스템들이 \_\_proto\_\_\를 실제로 구현해서 제공하기 때문에 사실상의 표준인 셈이라 한다.

하지만 위와 같은 방법으로 상속을 받는 것은 정석이 아니라고 한다.
