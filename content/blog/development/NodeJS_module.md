---
title: 🌲Node.js module 사용법
date: 2020-12-21 22:40:00
category: development
draft: false
---

## Node.js module 사용법

node.js : 비동기 이벤트 기반 자바스크립트 런타임

브라우저에서는 셋타임아웃 등 비동기 api 가 한정적이라 하면, node.js 환경에서는 많은 부분의 api 가 비동기로 작성되어 있다고 한다.

## 모듈의 정의?

건축으로부터 비롯된 모듈이라는 단어는, 어떤 기능을 떼서 조립할 수 있는 형태로 만든 부분입니다.

fs(File System) 모듈은, 파일을 읽거나 저장하는 등의 일을 할 수 있게 돕는 node.js의 한 부분입니다.

## Node.js 내장 모듈을 사용하기

아래 링크에서 FileSystem 을 눌러보면,

https://nodejs.org/dist/latest-v12.x/docs/api/

```js
fs.readFile(path[, options], callback)
```

라는 nodejs 의 내장함수를 쓰는 구문이 나온다.

파일을 읽는 (readFile) node.js 의 내장함수 이다.

## 사용을 위해 적용해야 할 사항은?

> > > 자바스크립트 코드 가장 상단에 require 구문을 이용한다. How?

const fs = require('fs') // 파일 시스템 모듈을 불러옵니다

어? 저는 이러이러한 모듈을 쓰고 싶은데 node.js 에는 없나 본데요?

> > > 그럴 땐 npm, yarn 같은 패키지 매니저에서 알아서 찾아 모듈을 다운받으세요.

커스텀 모듈을 말하는 구나!

## fs.readFile을 통해 알아보는 node.js 공식 문서 가이드

```js
fs.readFile(path[, options], callback)
```

fs.readFile 이라는 모듈은 로컬 파일을 읽어오는 메소드 이다. 또한 비동기 적으로 파일 내용 전체를 읽어들인다고 한다.

### 1. path <string> | <Buffer> | <URL> | <integer>

첫번째 인자인 path 에는 위와 같이 네가지 종류의 타입을 넘길 수 있다. 보통은 문자열로 넘긴다고 한다.fs.readFile('/etc/passwd', ..., ...)

### 2. options <Object> | <string>

두번째 인자 options 는 넣을 수도 안넣을 수도 있다. 대괄호는 선택적 인자를 의미함.

위와 같이 객체 형태 또는 문자열 형태로 넘길 수 있다.

문자열로 넣을 경우에는 인코딩인 ‘utf-8’ 을 넘기게 된다.

### 3. callback <Function>- err <Error>- data <string> | <Buffer>

파일을 읽고 난 뒤에 비동기적으로 실행되는 함수인 콜백 함수를 넘긴다.

콜백 함수에는 두 가지 파라미터가 존재한다. 위와 같이 err, data 이다.

보통 인자의 첫번째에 err 가 온다고 했다.

에러가 발생하지 않으면 err 는 null 이 되며 data 에 문자열이나 Buffer 라는 객체가 전달될 것이다.

<b>Q. data 에는 문자열이나 Buffer 가 전달됩니다. 어떤 경우에 문자열로 전달되는 것일까요?</b>

fs.readFile 의 두번째 options 인자에 ‘utf-8’ 이라는 인코딩을 명기해 주었을 때?? 아니라면 Buffer 가 전달될 것이다.

Buffer 의 형태 :

```js
<Buffer ec bd 94 eb 93 9c ed 85 8c ec 9d b4 ec 8a a4 ed 8a b8 20 ec a0 9c eb 8f 84 eb 8a 94 20 ec 97 86 eb 82 98 ec 9a 94 3f 20 e3 85 a0 e3 85 a0 20 ec 8b 9d ... 36 more bytes>
```
