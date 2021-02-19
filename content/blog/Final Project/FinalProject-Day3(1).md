---
title: 🔥Final Project Day 3 - Grid
date: 2021-02-19 23:55:26
category: Final Project
draft: false
---

## 🧙🏻‍♂️Flex 만 쓰면 되지 Grid 는 뭣할라고 써?

```css
/* 3 columns 를 가지고 싶어서 flex-wrap: wrap 속성을 줬는데, */

.father {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/* space-between 도 주었다. */

.child {
  background: goldenrod;
  flex-basis: 33%;
  color: white;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

컬럼이 세개인 것을 표현하고자 flex-basis 를 33% 를 주고 부모 요소의 flex-wrap 을 wrap 으로 주었더니 적절 한 모양이 나온다.

그런데 html 에서 자식 박스를 하나 더 넣어서 총 네개가 된 모습은 어떤가?

그림을 확인해 보자.

![](./images/wrong-way-flex.jpeg)

음.. 1번 박스와 4번 박스의 간격 (마진) 을 띄우기 위해 다음과 같은 코드를 작성하는 수고를 한다.

첫번째와 네 번째 박스의 간격을 띄우려고 마진을 개별적으로!!!! 주는 수고를 한다 는 의미이다.

```css
.child:nth-child(4) {
  margin-top: 10px;
}
```

떨어진다 하지만 다섯번째 박스가 등장한다면 어떨까?

그 다섯번째 박스에서 내가 의도하려는 바는 2번 박스 아래에 박스 5번이 위치하게 하는건데.. 말이다.

![](./images/wrong-way-flex2.jpeg)

Flex 를 쓰고 space-between 을 쓰고.. 하 안된다. 안돼.

이게 바로 Flex 의 한계이고 그래서 바로 그리드(Grid) 를 배워야 하는 이유이다.
