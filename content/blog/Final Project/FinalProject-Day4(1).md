---
title: 🔥Final Project Day 4 - Grid Line 에 이름 붙이기
date: 2021-02-20 21:20:00
category: Final Project
draft: false
---

## 🍄Grid Line 에 이름 붙여서 숫자 대신 사용하기

grid-template-columns: repeat(4, 100px); 라고 작성했지만 여기에 더 구체적으로 그리드 라인의 이름을 함께 표시해 줄 수 있었다.

```css
/* Line 별로 이름 붙이기 */
.grid {
  display: grid;
  gap: 10px;

  grid-template-columns: [first-line] 100px [second-line] 100px [third-line] 100px [fourth-line] 100px [fifth-line];

  grid-template-rows: repeat(4, 100px [sexy-line]);
}
```

그렇게 되면, grid-column: 1 / -2 처럼 숫자로 표기한 사항을 앞서 지어준 이름으로 바꾸어 적을 수 있게 된다.

```css
.header {
  background: #2ecc71;

  grid-column: span 4;
}
.content {
  background: #3498db;

  /* grid-column: 1 / -2; 를 아래로 대체*/
  grid-column: first-line / fourth-line;

  /* grid-row: span 2; 를 아래로 대체 */
  grid-row: sexy-line 1 / sexy-line 3;
}
.nav {
  background: #8e44ad;

  grid-row: span 2;
}
.footer {
  background: #f39c12;

  grid-column: span 4;
}
```
