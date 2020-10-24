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

## 🍒쌈박?한 해설

일단 이론적인 블로깅은 내일 완전 뿌리를 뽑은 뒤 할 것이므로 오늘 블로깅은 핵심만 작성한다.

간단하게 addToTail(value) {} 가 하는 역할은 다음과 같다.

### 1. LinkedList 의 인스턴스를 만들기

LinkedList 의 인스턴스를 만들어서 해당 인스턴스.addToTail('삼겹살') 하면,

```js
Node { value : 'samgyupsal', next : null }
```

라는 Node 인스턴스가 하나 만들어 진다.

이제 하나 하나 만들어지는 노드가 LinkedList 의 Tail 로 들어간다는 느낌이다.

### 2. LinkedList 의 형태

```js
LinkedList { head : null, tail : null, _size: 0 }
```

아무것도 들어가 있지 않은 순수한 상태이다.

### 3. 만약 head 에 아무것도 들어가 있지 않을 때

```js
LinkedList {head: Node, tail: Node, _size: 1}
head: Node {value: "samgyupsal", next: null}
tail: Node {value: "samgyupsal", next: null}
_size: 1
__proto__: Object
```

head 에도 node 가, tail 에도 node 가 들어가야 한다.

이유는 처음 들어가는 Node {value: "samgyupsal", next: null} 은 head 이자 tail 일 테니까.

여기서 초 중요한데, 위의 코드를 일부 떼와 보면

```js
addToTail(value) {
  let node = new Node(value)
  if (this.head === null) {
    this.head = node // 삼겹살 노드가 this.head 에 할당
    this.tail = node // 삼겹살 노드가 this.tail 에 할당
    this._size++
  }
}
```

최초 만든 이 삼겹살 Node { value : 'samgyupsal', next : null } 를 this.head 에 할당하고,

삼겹살 Node { value : 'samgyupsal', next : null } 를 this.tail 에 할당하는 거 같지만..

할당이라고 이해하면 안 된다.

프리 코스 때 배웠듯이 원시 자료형이 아닌 객체, 배열 이런 아이들은 객체 자체를 할당하는게 아니라 객체의 주소를 할당한다고 이해해야 한다.

```js
this.head = { value: 'samgyupsal', next: null }
this.tail = { value: 'samgyupsal', next: null }
```

this.head 와 this.tail 은 "삼겹살 노드" 라는 객체의 "동일한" 주소를 바라보고 있다.

"동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소 "동일한" 주소

![](https://pbs.twimg.com/media/EAo2Vv3UIAA3Dos.jpg)

하...

```js
LinkedList {head: Node, tail: Node, _size: 1}
head: Node {value: "samgyupsal", next: null}
tail: Node {value: "samgyupsal", next: null}
_size: 1
__proto__: Object
```

### 4. head 가 이미 있는 상태에서 2번째 값을 넣을 떄

3번의 상태를 더 알아보기 좋게 보여주겠다.

```js
LinkedList { head: {value: "samgyupsal", next: null},
             tail: {value: "samgyupsal", next: null},
             _size: 1}
```

이제 두번째 노드를 만들어 넣을 건데 나는 '목살' Node 를 만들거다.

![](https://cdn.crowdpic.net/list-thumb/thumb_l_21015AB7069B9BA07306776199881D79.jpg)

하.....

```js
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
```

else 이하의 구문으로 '목살' Node 를 LinkedList 에 집어넣는 건데..

this.tail.next = {value: "moksal", next: null} 을 넣은 모습이다.

```js
LinkedList { head: {value: "samgyupsal", next: null},
             tail: {value: "samgyupsal", next: {value: "moksal", next: null}},
             _size: 1}
```

지금 이 행위로 인해서 this.tail 이 바라보는 node 의 주소에 "moksal" 이라는 퀵이 배달되었다.

오 개꿀 하면서 this.tail 이 목살냠냠을 시전하려 드는데

this.head 가 저기 구석탱이에서 몰래 지켜보고 있는 거다..

![](https://lh3.googleusercontent.com/proxy/Zat8gE1vpVdBlVrMfAdeRiPtSTu6Wu2SGuP1pfLiSzjGhs8r75b5DSYaoPm6K9kM27i2cy8-hCTqFSA3xBYoKFrWMVrfHjIGgXqwLOq0P-oZO2eVannr1gz3CvuKJN5T9KY4I_xtLxZOgngTGgE)

왜?

this.head 와 this.tail 은 "삼겹살 노드" 라는 객체의 "동일한" 주소를 바라보고 있다. 라고 했기 때문이다.

this.head 도 this.tail 과 같은 주소를 바라보게 되므로,

```js
LinkedList { head: {value: "samgyupsal", next: {value: "moksal", next: null}},
             tail: {value: "samgyupsal", next: {value: "moksal", next: null}},
             _size: 1}
```

이렇게 바뀌게 되는 것이다!

그리고 마지막으로 this.tail = {value: "moksal", next: null} 를 통해,

this.tail 에 완전히 덮어쓰게 (overwrite) 되는 것이다.

```js
LinkedList { head: {value: "samgyupsal", next: {value: "moksal", next: null}},
             tail: {value: "moksal", next: null},
             _size: 1}
```

### 5. 세번째 Node 넣어보기

이번엔 "항정살" Node 를 넣는다.

![](https://1.bp.blogspot.com/-rztT_rYj8qE/XhiGVLbYuKI/AAAAAAAOLPQ/6a6u6iuZquoImADzCDofwUfCFEFTZ5HrQCLcBGAsYHQ/s1600/2_018.jpg)

```js
LinkedList { head: {value: "samgyupsal", next: {value: "moksal",
                                         next: {value: "hangjungsal", next: null}}},
             tail: {value: "hangjungsal", next: null},
             _size: 1}
```

```js
LinkedList {head: Node, tail: Node, _size: 3}
head: Node
next: Node
next: Node {value: "hangjung", next: null}
value: "moksal"
__proto__: Object
value: "samgyupsal"
__proto__: Object
tail: Node {value: "hangjung", next: null}
_size: 3
__proto__: Object
```

## 😭느낀 점

뭐야 더 헷갈리는데 갑자기?ㅠㅠ
