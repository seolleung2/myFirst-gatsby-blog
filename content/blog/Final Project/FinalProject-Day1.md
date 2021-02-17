---
title: 🔥Final Project Day 1 - Flexbox
date: 2021-02-17 23:55:26
category: Final Project
draft: false
---

## 🐝일반적인 Display 속성 되짚기

display의 대표 속성 세 가지는 block, inline-block, inline 이 있다.

block 은 너비와 높이가 있으며, 옆에는 어떠한 것도 옆으로 붙어 올 수 없다.

inline block 은 block 속성을 (너비와 높이가 있는 속성) 유지하게 해주며 일직선으로 옆으로 붙어 올 수 있게 한다.

inline 은 box 가 아니다. 너비와 높이가 없다. 유동적이기 때문이라 한다.
딱 자기 크기만큼의 공간을 가진다. 대표적인 예가 바로 text.

결론 : 쌩 마진 짜맞추기로 중간을 맞추기 위해 마진을 조절하지만, 그마저도 브라우저의 크기를 조절하면 모든 레이아웃이 다 어긋나진다!

Flex 를 배우는 이유이다!

## 🐝Flexbox 의 규칙

![](./images/flexbox-test.jpeg)

항상 붙어있는 부모 (father, wrapper container) 가 자식 (children) 의 위치를 움직일 수 있다.

1. flexbox 에서 뭔가를 움직이고자 할 때는 children 과 이야기하지 않는다.

2. flexbox container (즉, 부모 컨테이너) 를 만들어야 한다.

## 🐝Flex-direction 에 따른 main axis, cross axis 이해하기

진짜 설명 잘 되어 있는 url 이다. 그림이 아래 예시처럼 아주 좋다.

https://studiomeal.com/archives/197

![](https://studiomeal.com/wp-content/uploads/2020/01/03.jpg)

요약하자면,

- main axis 방향으로 아이템을 옮길 땐, <b>justify-content</b> 를 사용

- cross axis 방향으로 아이템을 옮길 땐, <b>align-items</b> 를 사용

flex-direction: row (default) 이면,

<u>main axis 는 가로 (horizontal) 이며 cross axis 는 세로 (vertical) 이다.</u>

flex-direction: column 이면,

<u>main axis 는 세로 (vertical) 이며 cross axis 는 가로 (horizontal) 이다.</u>

```css
.box2 {
  width: 200px;
  height: 200px;
  background: goldenrod;
  font-size: 50px;
  /* box2 의 (직계)부모가 flex container 가 된다. */
}

.container {
  display: flex;
  flex-direction: row;
  /* display: flex 를 통해 바로 위에 했던 inline-block 과 같은 결과를 얻을 수 있다. */
  /* ? Main Axis */
  justify-content: space-around;
  /* ? Cross Axis */
  /* align-items: center; */
  /* stretch 를 쓰고 자식 box 의 높이를 없애면 부모 크기의 높이만큼 stretch 된다. */
  /* 기본 default 는 flex-start, flex-end 를 써볼 수 있다. */
  height: 100vh;
}
```

## 🐝vh(viewport height), vw(viewport width)

반응형 사이트 제작에서 vh(viewport height), vw(viewport width) 가 매우 편리하다고 함.

% 를 쓰는 것과의 차이는,

자식 요소에 %를 쓴다면 자식 요소의 폭과 높이는 부모 요소의 폭과 높이에 결정되지만,

vh 와 vw 는 브라우저의 높이와 브라우저의 너비에 근거한다. 1vh 는 viewport 높이의 1% 와 같다.

## 🐝align-self 와 order 속성

align-self 는 align-items 처럼 행동한다.

다시 한번, align-items 는 cross axis 방향에 있는 item 의 위치를 바꾼다.

⏬이 모든 flex 를 쓰는 전제 조건 ⏬

<b>father container 의 높이 (height) 가 있어야 한다!</b>

html 을 변경하지는 않고 아이템의 순서를 바꾸고 싶을 때, <b>order 를 쓴다고 한다.</b>

order 의 기본 디폴트 밸류는 0 이고 숫자를 올릴 수록 왼쪽에서 오른쪽으로 이동하며 숫자가 클 수록 숫자가 작은 order 보다 더 오른쪽으로 위치한다.
