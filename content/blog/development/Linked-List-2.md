---
title: LinkedList - addToTail 에 대한 고찰 마무리
date: 2020-10-26 21:00:00
category: development
draft: false
---

## 🤗이해하고 작성한 코드 다시 이해하기

첫 번째 블로깅을 작성 후 살짝 흔들린 멘탈을 부여잡고 찾아보고 그려보고 슬랙에 나와 대화했던 분들을 차례로 붙잡아 이해될 때까지 매달렸다.

https://dev-seolleung2.netlify.app/development/Linked-List-1/

전체 코드는 위의 링크에 있다.

아래는 addToTail 함수 기능을 만들었다.

```js
addToTail(value) {
    let node = new Node(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      this._size++;
    } else {
      this.tail.next = node;
      this.tail = node;
      this._size++;
    }
    return this;
  }
```

## 🤔그래서 주소 참조, 할당은 이해했는가?

앞으로 나올 다른 문제에서는 장담은 못하지만 현재 저 문제에 대해서는 코드 한 줄 안보고 다른 사람에게 설명할 수 있다.

아래는 헬프 데스크에 내가 올린 내용을 정리해 보았다.

## 🍎🍇🍋아이디어 정리🍎🍇🍋

let fruitsList = new LinkedList();

첫번쨰. 사과를 넣었다! 사과 노드를 만들어서 fruitsList라는 LinkedList 에 담아 넣었다.

fruitsList.addToTail('🍎');

```js
LinkedList {head: Node, tail: Node, size: 1}
head: Node {value: "🍎", next: null}
tail: Node {value: "🍎", next: null}
```

두번째. 포도를 넣는 과정을 풀어본다.

fruitsList.addToTail('🍇');

일단 어찌됐건 이 상태에서 '포도' 노드가 하나 만들어 진다.

Node {value: "🍇", next: null}

else 구문 바로 아래의 this.tail.next = node 의 동의 어는 바로

this.tail.next = {value: "🍇", next: null} 이 된다 그러므로,

```js
LinkedList {head: Node, tail: Node, size: 1}
head: Node {value: "🍎", next: null}
tail: Node {value: "🍎", next: {value: "🍇", next: null}}
size: 1 _proto: Object
```

애초 맨 처음에 '사과' 노드를 넣는 과정에서 'head' 와 'tail' 이 동일한 노드를 바라보고 있다.

'head' 와 'tail' 이 동일한 주소의 객체를 바라보고 있다.

그렇기 때문에 this.tail.next 에 포도를 넣건 할애비를 넣건 'head' 의 'next' 도 똑같이
자동 원격 으로 바뀌어 버리는 것이다.

```js
LinkedList {head: Node, tail: Node, size: 1}
head: Node {value: "🍎", next: {value: "🍇", next: null}}
tail: Node {value: "🍎", next: {value: "🍇", next: null}}
size: 1 _proto: Object
```

그리고 else 의 두 번째 구문 this.tail = node 를 통해,
'포도' 노드가 this.tail 을 완전히 덮어 씌워 버리게 된다.

```js
LinkedList {head: Node, tail: Node, size: 1}
head: Node {value: "🍎", next: {value: "🍇", next: null}}
tail: Node {value: "🍇", next: null}
size: 1_proto: Object
```

그리고 두번째, this.tail = node; 를 통해서 포도 노드 자체가 this.tail 을 덮어씌기 해버리면

this.head 와 this.tail 은 서로 다른 주소를 가리키게 된다. (this.tail 이 가출힘)

this.tail 이 가출하기 전에 this.head.next 에 나 어디로 탈주한다고 흔적을 (나중에 찾아달라고 여지를..) 남겨 놓는다.

this.head 와 this.tail 은 서로 다른 주소를 가리키지만,

this.head.next 와 this.tail 은 동일한 Node (포도) 의 주소를 가리키고 있게 된다.

세번째. 레몬을 넣는 과정이다.
레몬 노드를 만들어 놓은 상태에서,

Node {value: "🍋", next: null}

일단 else 의 첫번째 구문 this.tail.next = node 를 실행해 보자.

```js
LinkedList {head: Node, tail: Node, size: 2}
head: Node {value: "🍎", next: {value: "🍇", next: null}}
tail: Node {value: "🍇", next: {value: "🍋", next: null}}
size: 2_proto: Object
```

세번 째 레몬 노드를 넣더라 하더라도,

this.tail.next = next: {value: "🍋", next: null}

```js
LinkedList {head: Node, tail: Node, size: 2}
head: Node {value: "🍎", next: {value: "🍇", next: {value: "🍋", next: null}}}
tail: Node {value: "🍇", next: {value: "🍋", next: null}}
size: 2_proto: Object
```

this.tail 과 this.head.next 는 동일한 Node (포도) 의 주소를 가리키고 있기 때문에 this.head.next 도 마찬가지로 자동으로 바뀌게 되는 것이다.

마지막으로 tail 에 레몬 노드를 덮어 씌우고 가출한다. (this.tail = node)

```js
LinkedList {head: Node, tail: Node, size: 3}
head: Node {value: "🍎", next: {value: "🍇", next: {value: "🍋", next: null}}}
tail: Node {value: "🍋", next: null}
size: 3_proto: Object
```

하지만 head.next.next 에는 레몬 노드의 주소 흔적이 고스란히 남아 있고,

next: {value: "🍋", next: null}

이는 현재 this.tail 이 가리키는 레몬 노드의 주소와 일치한다.
