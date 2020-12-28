---
title: 🐼Before Start Mini Node Server (2)
date: 2020-12-28 22:00:00
category: development
draft: false
---

## 🐧HTTP advanced + Network Tab

브라우저 주소창에 URL 를 입력했을 때 벌어지는 일을 정리해 보았다.

(예) http://www.google.com/intl/ko_kr/about

여기서 google 닷컴 (Domain name) 이 실제 어떤 ip 를 갖고 있는지 DNS 서버에 IP 를 요청하면,

서버에서 숫자로 된 고유한 아이피 주소를 준다 (사내망, 또는 글로벌 ip).

해당 ip 로 접속해도 같은 화면을 볼 수 있다.

google 닷컴 뒤에는 라우팅인데, 한 서버에서도 저렇게 갈림길이 있는 거다.

디테일한 주소 같은 느낌으로 생각하면 쉽다. (몇 층으로 가면 로비, 17층에 가면 사무실 등등..)

### STEP 1. 도메인 이름 탐색

#### 1-1. DNS 서버에 접속한 후, www.google. com 의 IP 가 무엇인지 요청

#### 1-2. DNS 서버는 요청에 대한 응답으로 216.58.197.196 리턴

이거로도 접속가능 - 글로벌 IP 임

### STEP 2: 웹 서버(HTTP) 요청

#### 2-1. 웹 서버의 라우팅 (routing: 주소 탐색 규칙) 에 따라 요청 처리

🐼단순하게 정적 파일만 제공하는 경우 다음과 같이 조회

(URL): 웹서버루트/intl/ko_kr/about/index.html

🐼서버가 비즈니스 로직을 실행하도록 요청할 수도 있음

- 웹서버루트/search?q=codestates

- 웹서버루트/preferences

#### 2-2. 서버가 요청에 대한 응답을 자원 (resource: HTML/JS 파일 등) 의 형태로 전달

#### 2-3. 서버가 보내주는 자원을 브라우저에서 처리

## 🐧IF STEP2 FAILS ??

그 뜻은 웹 서버에서 클라이언트가 요청한 리소스를 찾을 수 없다!!

즉, 404 NOT FOUND 리턴!

![](https://www.howtogeek.com/wp-content/uploads/2013/01/image84.png)

## 🐧HTTP

서버와 클라이언트가 주로 HTML 등의 문서를 주고받는 데 사용하는 프로토콜 이다.

주로 TCP/UDP 80번 포트를 사용한다고 한다.

요청과 응답은 Start/Status Line, Header 그리고 Body 로 이루어져 있다.

http message mdn 으로 검색 해보았다.

![](https://mdn.mozillademos.org/files/13827/HTTPMsgStructure2.png)

https://developer.mozilla.org/ko/docs/Web/HTTP/Messages

### HTTP request 할 때 헤더

HTTP request 시 헤더는 어떤 모양으로 보내지는지 확인해 본 이미지는 아래와 같다.

![](https://mdn.mozillademos.org/files/13821/HTTP_Request_Headers2.png)

### HTTP response 할 때 헤더

HTTP response 시에 헤더는 어떤 모양으로 받아오는지 아래 그림으로 보자.

![](https://mdn.mozillademos.org/files/13823/HTTP_Response_Headers2.png)

### HTTP 요청, 응답 마지막 부분에 들어가는 Body

첫번째 그림 맨 밑에 실제적인 컨텐츠가 담겨진다. (payload == body)

이제 클라이언트가 받아서 화면으로 확인한다.

개발자 도구의 network 탭에 들어가서 확인해 보았다. 어떤 모양인지! 어떤 요청이 이루어 지고 있는지!

chatterbox 를 열어 보는 확인을 거쳐 보았다.

## 🐧URL 과 URI 의 차이

URI ? URL 이 단순한 파일 처리 뿐만 아니라 비즈니스 로직도 처리해 주기 때문에 Identifier 라고 해서 저렇게 부르게 되었다고 함.

![](https://danielmiessler.com/images/url-uri-url-miessler-2020.png)

통합 자원 식별자 URI는 Uniform Resource Identifier 의 약자이며 인터넷에 있는 자원을 나타내는 유일한 주소이다.

URI 의 존재는 인터넷에서 요구되는 기본조건 으로서 인터넷 프로토콜에 항상 붙어 다닌다. URI 는 인터넷 상의 자원을 식별하기 위한 문자열 정도로 생각할 수 있다.

즉, 네트워크 상에서 자원이 어디 있는지를 알려주기 위한 규약이다. 이는 인터넷 상의 자원 위치라고 생각하면 된다.

URI 가 가장 큰 상위개념이고 이것의 하위 개념으로 URL 과 URN 이 있다.

URL은 Uniform Resource Locator 의 약자 이고 URL 은 URI 의 한 형태로,

URI 는 URL 을 포함하는 개념이다.

https://dev-seolleung2.netlify.app/ 이라는 주소는 URL 이면서 URI 이다.

https://dev-seolleung2.netlify.app/development/

와 같은 형식은 development 라는 인터넷상의 자원 위치를 의미한다.

이또한 URL 이면서 URI 이다.

https://192.168.3.x.x/category/index.html 이라는 주소는 192 로 시작하는 호스트 주소 하위의 category 아래에 index.html 이라는 자원의 위치를 가리키고 있으므로 URL 이면서 URI 이다.

https://dev-seolleung2.netlify.app/development/111

의 주소는 좀 다르게 볼 수 있다. 여기서 URL 은 https://dev-seolleung2.netlify.app/development 까지 이다.

내가 원하는 정보까지 도달하기 위해서는 111 이라는 식별자 (Identifier) 가 필요한 것이다.

즉, https://dev-seolleung2.netlify.app/development/111 의 주소는 URI 지만, URL 은 아니게 된다.

- HTTP 의 요청은 URI 를 통해 할 수 있다.

- 주소창을 통해 하는 요청은 전부 GET Request

## 🐧HTTP Status Code

https://developer.mozilla.org/ko/docs/Web/HTTP/Status

200 - 요청 성공

304 - 요청에 대한 응답이 수정되지 않음 (Cache)

403 - 컨텐츠에 접근할 권한 없음

404 - 요청받은 리소스를 사용할 수 없음

500 - 서버가 처리할 수 없는 요청

## 🐧HTTP Request Methods

https://developer.mozilla.org/ko/docs/Web/HTTP/Methods

GET - 특정 리소스를 가져오도록 요청

POST - 데이터를 서버로 제출하는 용도로 사용하며, 서버 상태의 변화를 일으킴

PUT - POST 와 비슷하나, 연속적인 요청시에도 같은 효과를 가져옴. 기존 데이터를 교체하는 용도로 쓰일 수 있음 (UPDATE)

DELETE - 리소스의 삭제를 요청할 때 사용

메소드가 PATCH OPTIONS 도 있긴하지만 일단.. 패쓰

GET 요청은 주소만 지정해주면 (호스트와 url 의 뒷 쪽 부분을 이용해서 경로를 통해 라우팅 이용해서 받아옴) 요청을 넣을 수 있지만,

POST 요청은 넣어줄 내용들이 필요하니까 (사용자 코멘트 등) Payload 가 있다.

예로,

```js
{
  username: “강건마”,
  text:”나의108계단콤보는자비심이 없다”,
  roomname:”럭키짱”
}
```

request 를 보낼 때 보낼 body(payload) 의 타입이 즉 Content-Type 을 명시해 준다.

주로 많이 쓰이는게 application/json 이다.

그럼 이제 아래의 Payload 를,

```js
{
  username: “강건마”,
  text:”나의108계단콤보는자비심이 없다”,
  roomname:”럭키짱”
}
```

json 화 해서 서버로 보내질 것이다.

서버에 어떤 데이터를 업데이트 하는 경우 (POST 처럼) 에는 payload 와 같이 요청을 보낸다!
