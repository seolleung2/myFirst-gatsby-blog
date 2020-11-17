---
title: CORS - Browser Security Model
date: 2020-11-17 23:50:00
category: development
draft: false
---

## 💄들어가며

저번 주 부터 자꾸 cors cors 이야기가 나와서 그냥 대강 이해하고 넘어갔는데 아주 상 찝찝한 느낌이 들어 오늘 나름 학습을 다시 해보고 블로깅을 한다.

일단 CORS 는 Cross-Origin-Resource-Sharing 의 약자이다.

서로 다른 origin 간에 리소스를 공유하게 하는 방식이며 추가적인 HTTP 헤더를 이용해서,

브라우저가 자발적으로 이 브라우저의 어플리케이션을 사용하는 유저들을 보호하기 위한 정책 이라고 한다.

브라우저 만의 자발적인 보안 조치.

근데 이렇게 적고 끝낼리가 없다.

지금

매우

매우

찝찝하다.

## 👩🏻‍🦳CORS 의 등장 이유 (1) 리즈 시절

![](https://images-na.ssl-images-amazon.com/images/I/91yo+bOZfXL.jpg)

옛날 리즈 시절 에는 서버에서 내려받은 client 로만 통신을 했다고 한다.

다수의 사용자가 서버에서 내려준 자체 클라이언트로만 통신을 했다.

이 때 서버 입장에서는 클라이언트가 위해 나 의심의 여지가 없다. Same - Origin 이다.

서버 내 자체 클라이언트를 가지고 통신하기에 개별 클라이언트의 요청을 서버 입장에서 막을 필요가 없었다.

## 👩🏻‍🦳CORS 의 등장 이유 (2) SPA 의 등장

![](https://miro.medium.com/max/1200/1*7fXfXk2_d5t3_NHUMP-ZmQ.jpeg)

Single Page Application 의 등장으로 여러 곳에 있는 자원 (resourse) 을 활용할 필요가 생겼다.

자체 서버의 클라이언트 뿐만 아니라 타 플랫폼의 API 를 쓰게 될 일이 많아졌다.

지금 이 블로그 만 하더라도 커피 한잔 값의 기부나 facebook 이동 등의 리소스 등을 자유자재로 내장시킬 수 있지 않은가?

그래서 이제는 Same Origin 이 아니라 Cross Origin 요청을 해야 한다.

## 👱🏼‍♀️Cross Origin 요청 허용의 계기

그래서 이제 Cross origin 에서 리소스 (서버자원) 를 요청하여 사용하게 되는데 (구글 지메일로 깃허브 가입하는 등의)..

보안상의 이유로 브라우저에서의 크로스 도메인 요청은 기본적으로 제한되어 있다고 한다.

이유는 만약 서버가 요청을 열어 놓으면 클라이언트가 서버에 어떠한 리소스를 생성할지 확인을 할 수 없어서 라고 한다.

![](https://portswigger.net/web-security/images/attack-on-cors.svg)

그런데 개발자들이 브라우저 벤더사들에 "웹 app 고도화" 를 위해 개선 요청을 했다고 한다.

그래서 이제는 "서버가 Allow 한 범위" 내에서 cross origin 요청을 허용하게 되었다고 한다.

고로 이제 모든 도메인에서 해당 서버로 CORS 요청을 할 수 있게 되었다. (허용 여부는 해당 서버 뜻대로)

아래는 서버 입장에서 바라본 허용 요건이다.

```js
const defaultCorsHeaders = {
  'access-control-allow-origin': '*', // 모든 도메인을 허용 (와일드카드)
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS', // 허용가능한 메소드들
  'access-control-allow-headers': 'content-type, accept', // Header 에 쓸 수 있는 타입
  'access-control-max-age': 10, // Preflight request 는 10초까지 허용 된다.
}
```

이러한 조건들을 갖춘 request 들은 크로스 도메인에서 리소스 요청이 가능하도록 허용해 주겠다 라는 설정 코드 이다.

## 👱🏼‍♀️CORS 해부하기

### Same-Origin requests, Always allowed.

![](https://mdn.mozillademos.org/files/14295/CORS_principle.png)

domain-a.com 클라이언트가 동일 domain-a.com 내 Web Server 에 야 나 웃짤 불러와야돼 하면서 리소스 요청을 (GET Request) 넣는다.

같은 도메인이라 문제가 되지 않는다.(Same-Origin requests, Always allowed.)

서버가 옹 그래 가져가렴~~ 여기 옛다 웃짤~

### Cross-Origin requests, Controlled by CORS.

![](https://mdn.mozillademos.org/files/14295/CORS_principle.png)

domain-a.com 클라이언트 는 불만이 많다.

내 자체 서버에 있는 웃짤은 이제 시대가 한참 지났단 말이다.

그래서 요새 트렌드에 맞춰진 타 웃짤 Web Server에 (domain-b.com)

비 정형화 된 웃짤 이미지를 요청하기에 이른다.

<p align="center"><img src="https://lh3.googleusercontent.com/proxy/Xs-XVOCy6H8c5irRUSGynsNEzkNB7ojfcpetrB-XSaUiJHz-2Pv9lO19uNGKcRH9dgnC5pvUpmCIv8NXLdCq1fWxKP24E5ec7I6_pgEHzFjQj2JXeSS3iET5eteOz2aBu3nNRbEmB_kfmuP5Zs8TJwMxPuez3blcG5FZEa3QsuQ4k7LAvw"></p>

이걸 줘 말어?

위의 이미지가 domain-b.com 에서 불려질 수도 있고 아닐 수도 있다.

지금 상황은 domain-a.com 에서 타 도메인 서버인 domain-b.com 에 이미지를 요청하는 Cross-Origin requests 이다.

이는 CORS 에 의해 컨트롤 된다.

## 👱🏼‍♀️교차 출처 리소스 공유가 동작하는 방식을 보여주는 세 가지 시나리오

https://developer.mozilla.org/ko/docs/Web/HTTP/CORS

### 1. Simple Requests

- 가능한 Methods : GET, HEAD, POST

- 자동으로 세팅되는 Header 로만 simple requests 가 가능.

- 매뉴얼 헤더 (기본적 헤더에서 추가되는 헤더) 는 simple requests 불가능.

- Content-Type 헤더는 다음의 값들만 허용된다.

```js
application / x - www - form - urlencoded // application/json 이런거는 불가능.
multipart / form - data
text / plain
```

![](https://mdn.mozillademos.org/files/17214/simple-req-updated.png)

예로, 클라이언트에서 타 도메인에 자료를 요청한다.

```js
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```

타 도메인 서버에서는 요청을 뜯어본 뒤,

GET 요청... 삐빅..

메뉴얼 헤더.. 아니네 삐빅..

Content-Type 헤더.. 해당 사항에 해당.. 삐빅..

아! 이 클라이언트의 요청은 Simple Requests 에 해당하는 구나!

서버는 200OK 를 날린다. 응답 코드를 자세히 확인해보자!

```js
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: *
// 애스터리스크 (*) 는 모든 도메인에서 접근이 가능함을 의미한다!
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml

[…XML Data…]
```

### 2. Preflighted Requests

simple request 와는 별개로 Preflighted Requests 는 "OPTIONS" 라는 메소드에 의해 요청이 이루어 진다.

그게 뭐?

크로스 도메인에 POST 요청을 날렸을 뿐인데 POST 보다 먼저 브라우저에서 자동으로

"OPTIONS Request" 라는 Preflighted Requests 가 보내지는 것이다.

![](https://mdn.mozillademos.org/files/16753/preflight_correct.png)

```js
const def = {
  Preflighted: '이전에 먼저 날아간다',
}
```

즉, POST 요청보다 먼저 날아가서 (OPTIONS) 나 접근 가능해 쀼우? 하면서 간을 보는 것이다.

### 2-1. Preflighted 의 트리거(발생) 되는 조건

- 요청 가능한 Methods : PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH

- 요청들에 다른 헤더들을 포함하는 경우에도 Preflighted request 가 실행됨

- Content-Type 헤더에 다음의 값이 아닌 것들이 들어가면 Preflighted 발동

```js
application / x - www - form - urlencoded
multipart / form - data
text / plain
```

아닌 것들은 application / json 이 있겠지. 얘는 프리플라이트로 발동되는거다.

POST 요청 보내면 먼저 OPTIONS 가 날라가는거야 서버로.

마지막으로 기본으로 세팅되는 헤더가 아닌 내가 원하는 대로 커스터마이징 한 헤더를 세팅하는 경우도

Preflighted Requests 가 발동 된다.

### 2-2. Preflighted Requests 발동 메커니즘

![](https://mdn.mozillademos.org/files/16753/preflight_correct.png)

👩🏿‍🦰Client : foo.example 에서 요청을 날린다. 야아 server.b.com 아 나 프로필에 새로 웃짤좀 추가해 보자?

🖥Server : 뭐여 시방. 니 요청 Simple Request.. 아니네? Preflight request 보내라!

👩🏿‍🦰Client : ... OPTIONS 리퀘스트 가요~~ 사랑의 리퀘스트~~

👩🏿‍🦰Client : 미안.. 나 이러 이러한 방식으로 POST 요청을 날리는데 이거 니네 서버에서 허용하고 있지?

🖥Server : ...

👩🏿‍🦰Client : 똑똑... 새로나온 정으니 웃짤 내 프로필에 저장좀 해보자~

🖥Server : Access-Control-Allow-Origin 에 foo.example 이 등록되어 있네.. 도장 쾅쾅..

🖥Server : 200OK... 하고 싶은 요청 넣어라.. 리소스 요청 가능하다고 OPTIONS 에 태워 보낸다.

👩🏿‍🦰Client : 오 ㅎㅂ 땡큐 이제 내가 진짜 원하는 요청을 날린다. POST Request (text.xml 등등)..

🖥Server : 200OK... 울 땡땡이 하고 시픈대로 해~~

나는 POST 를 날렸을 뿐인데 자동으로 OPTIONS Requests 라는 Preflighted Requests 가 날아간다.

서버의 화이트리스트에 없으면 에러 코드가 담겨져서 응답이 올 것이다.

### 3. Requests with Credentials

서버에서 클라이언트 (브라우저) 에 쿠키를 심을 때가 있다. 안에 세션 토큰을 넣을 때가 있다는데..

유튜브 알고리즘 자동 추천이라든지 쿠키 동의나 검색어 저장 등의 그러한 있는 정보들을 같이 보낼것인가 의 request 라 한다.
