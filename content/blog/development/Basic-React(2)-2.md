---
title: 🍇Basic React Part 2 - on 으로 시작하는 이벤트 연습(2)
date: 2021-01-08 22:30:00
category: development
draft: false
---

## 🍊input 에 name 속성이 있는 이유, input 여러개 컨트롤하기

하나의 컴포넌트에 input 이 여러 개 일 때, 각각 메서드를 만들어서 state 를 관리하게 해야 할까?

더 쉽게 처리하는 방법이 있다고 한다.

event 객체를 활용하는 것인데, event.target.name 값을 사용하면 된다.

onChange 이벤트 핸들러에서 event.target.name 은 해당 인풋의 name 을 가리킨다.
