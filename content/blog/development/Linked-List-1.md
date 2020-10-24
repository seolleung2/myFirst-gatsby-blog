---
title: LinkedList - addToTail 에 대한 고찰
date: 2020-10-24 23:55:00
category: development
draft: false
---

## 🤗3인조 페어 프로그래밍

공식 페어 프로그래밍을 실제 한 적은 없지만 알게 되고 가까워진 두분의 도움으로 오늘 말미에 이 Linkedlist 에 값을 추가하는 addToTail 을 제대로 이해 할 수 있었다.

## 🏠addToTail(value) 의 키워드 : 객체를 할당 (X), 두 변수가 동일한 객체의 주소를 바라봄 (O)

제목이 길지만 저 제목에 모든 내용이 들어있는 거나 마찬가지 라고 생각한다.

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this._size = 0
  }

  addToTail(value) {
    let node = new Node(value)
    if (this.head === null) {
      this.head = node
      this.tail = node
      this._size++
    } else {
      this.tail.next = node
      this.tail = node
      this._size++
    }
    return this
  }
}
```
