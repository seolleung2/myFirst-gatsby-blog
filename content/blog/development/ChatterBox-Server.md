---
title: ChatterBox - Local Server 만들기
date: 2020-11-16 21:00:00
category: development
draft: false
---

## 🧙🏻‍♀️Chatterbox - 로컬 서버 만들기 과정

### im-sprint-chatterbox-server git fork 및 git clone

### 해당 디렉토리 code . 로 열고 npm install 진행하기

### package.json 내용을 수정

먼저 nodemon 을 설치해야 한다.

```js
npm install --save nodemon
```

(-g 로 글로벌 설치는 안해봤는데.. --save 를 통해 package.json 의 dependencies 에 설치 내용을 확인할 수 있게 해야 한다. 동료와의 불화를 예방..)

```js
"scripts": {
  "start": "nodemon server/basic-server.js",
  "test": "jest",
  "submit": "node .travis/submit.js"
},
```

npm start 명령어를 통해 어떤 내용을 실행하게 할 건지 지정해 주는 것이다.

node server/basic-server.js 를 통해서도 가능하지만, 이 경우에는 변동사항이 적용되었을 때 대응을 위해서는 매번 서버 실행을 껏다가 다시 켜야 하는 불편함이 발생하게 된다.

### 🐈basic-server.js 넌 대체 뭐냥

이제 npm start 를 통해 서버를 실행시킬 수 있지만 뭔가 에러가 뜬다.

이는 basic-server.js 내에서 requestHandler 라는 변수를 불러오지 못해서 인데,

기존 파일에서 한 두번째 줄에다가 requestHandler.js 파일을 (모듈을) 불러오게 하였다.

```js
// 끝에 파일 확장자 js 는 생략 가능하다.
const requestHandler = require('./request-handler')
```

아 파일 자체 코드를 다 가져와 보자.
(이러면 나중에 다 까먹어..)

```js
const http = require('http') // Node.js 의 Http 모듈을 사용하기 위해 불러왔다.
const requestHandler = require('./request-handler')

const port = 3000 // Port (서버로 요청을 받기 위한 아파트 호수 설정)
const ip = '127.0.0.1' // Local basic ip address
// const ip = "localhost";

const server = http.createServer(requestHandler)
// http.createServer 로 생성된 서버는 모든 incoming requests를 처리할 것이다.
console.log('Listening on http://' + ip + ':' + port)
server.listen(port, ip) // node 서버가 계속해서 돌도록 프로세스를 유지한다.

module.exports = server
```

Full IM 00 200JH 8:27 PM

module.exports는 다른파일에서 해당 모듈을 사용하기위한 준비단계?같은거라 쓴거죠. 정확히 어딘지는 모르겠지만 다른파일에서 server모듈을 require()를 써서 사용하는 곳이 있겠죠?

Full IM 00 XXX 8:27 PM

아아 감사합니다 ㅠㅠ

Full IM 00 200JH 8:27 PM

requestHandler도 동일하게 쓰셨으니 이해하셨을것 같습니당

Full IM 00 XXX 8:27 PM

그럼 저 server 라는 키워드를 다른 파일에서 쓸수 잇다는 의미인거같아요:)

### 👩🏿‍🦰request-handler.js 작성하기

basic-server.js 내에서 requestHandler 라는 외부 파일의 함수를 사용했는데 그 함수를 구현하는 것을 바로

request-handler.js 파일에서 작성해야 하는 것이였다.

reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않기 때문에

requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 해야 한다.

```js
module.exports = requestHandler
```

request-handler.js 파일 맨 아래에 위와 같이 코드를 넣어 주었다.

근데 뭐 어떻게 하라구.. ㅠㅠ엉엉..😭😭😭😭😭😭😭😭😭😭

#### 👩🏿‍🦰request, response, 그리고 GET

```js
const requestHandler = function(request, response) {
  // node server 의 requestHandler는 항상 request, response를 인자로 받습니다.
  // 또한 http 요청은 항상 요청과 응답이 동반 되어야 합니다.
  // 이것들은 요청에 대한 정보를 담고 있습니다. 예를들면, 요청 url과 method 등을 담고 있습니다.
  // 아래는 모든 리퀘스트의 메소드와 url을 로깅 해줍니다.
  console.log(
    'Serving request type ' + request.method + ' for url ' + request.url
  )
  // 이 위는 원래 있었던 코드.
}
```

이제 GET 방식으로, 즉 클라이언트가 (구글 크롬) 내 로컬 서버로부터 ChatterBox 채팅 내역을 "조회" 할 수 있게 만들어 줘야 한다!

let body 를 통해, 일단 목업 데이터를 객체 내에 (임시 서버라 치자) 넣어두었다.

이제 서버 (body) 의 데이터를 가져와 조회할 수 있냐는 거다. GET!

```js
let body = {
  results: [
    {
      username: '관리자',
      roomname: '코드스테이츠',
      date: '2020-11-16T03:44:53.221Z',
      text: '이머시브 여러분들 환영합니다',
    },
    {
      username: '관리자',
      roomname: '코드스테이츠',
      date: '2020-11-16T03:44:53.221Z',
      text: 'chatterbox client 스프린트를 위한 서버입니다',
    },
    {
      username: '관리자',
      roomname: '코드스테이츠',
      date: '2020-11-16T03:44:53.221Z',
      text: '아자 아자 화이팅!!!',
    },
  ],
}

const requestHandler = function(request, response) {
  // node server 의 requestHandler는 항상 request, response를 인자로 받습니다.
  // 또한 http 요청은 항상 요청과 응답이 동반 되어야 합니다.
  // 이것들은 요청에 대한 정보를 담고 있습니다. 예를들면, 요청 url과 method 등을 담고 있습니다.
  // 아래는 모든 리퀘스트의 메소드와 url을 로깅 해줍니다.
  console.log(
    'Serving request type ' + request.method + ' for url ' + request.url
  )
  // 이 위는 원래 있었던 코드. 아래부터 시작
  if (request.method === 'GET' && request.url === '/messages') {
    request
      .on('data', chunk => {
        let str = new String(chunk, 'UTF-8')
        body = str
      })
      .on('end', () => {
        response.writeHead(200, defaultCorsHeaders)
        response.end(JSON.stringify(body))
      })
  } else if (request.method === 'OPTIONS') {
    response.writeHead(201, defaultCorsHeaders)
    response.end()
  } else if (request.method === 'POST' && request.url === '/messages') {
    let body2 = ''
    request
      .on('data', chunk => {
        body2 = body2 + chunk
      })
      .on('end', () => {
        const data = JSON.parse(body2)
        body.results.push(data)
        response.writeHead(201, defaultCorsHeaders)
        response.end(JSON.stringify(data))
      })
  } else {
    response.writeHead(404, defaultCorsHeaders)
    response.end()
  }
  // 기본 CORS 설정이 되어있는 코드 입니다. 아래에 있습니다.
  // console.log(request);
  // CORS에 대해서는 조금더 알아보세요.
  const headers = defaultCorsHeaders
  // 응답 헤더에 응답하는 컨텐츠의 자료 타입을 헤더에 기록 합니다.
  headers['Content-Type'] = 'text/plain'

  // .writeHead() 메소드의 두번째 인자로는 응답 헤더와 키와 값을 객체 형태로 적어줍니다.
  // response.writeHead(200, headers);

  // 노드 서버에 대한 모든 요청은 응답이 있어야 합니다. response.end 메소드는 요청에 대한 응답을 보내줍니다.
  // response.end("Hello, World!");
}

const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
}

module.exports = requestHandler
```

"< Buffer 22 61 62 63 64 22 >" 와 같이 처리 되는 부분을 문자열로 변환하기 위해 위와 같은 방식을 사용했다.

request 는 on 으로 들어오는 콜백 함수와 연결되는 듯 하다. (작동원리는 모른다)

JSON.stringify()는 값을 JSON 표기법으로 변환한다.

코드를 세세히 해부하려는 생각은 전혀 없지만 그래도 감이 잘 안와서 뭔가 더 읽어보고 정리를 해야 할 거 같다.

뭔가 현재로서는 왜 이래야 되는지 납득이 되질 않아서이다.
