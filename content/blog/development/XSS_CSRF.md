---
title: XSS, CSRF 간단 돋보기
date: 2020-11-17 21:30:00
category: development
draft: false
---

## 💄들어가며

브라우저에서 자바스크립트를 통해 다양한 일을 할 수 있기 때문에 그만큼 다양한 해커의 공격 옵션이 있을 수 있다고 한다.

대표적으로 XSS, CSRF 가 있다 하는데 알아보자.

## 👩🏿‍🦰XSS : 클라이언트가 서버를 신뢰하기 때문에 발생하는 이슈

XSS – Cross-Site Scripting is no more new in the world of IT Security in fact one of the most popular and common vulnerabilities. There are many blogs, clean sheets, security tips/tricks, advices and other resources available in the web.

XSS는 웹 상에서 가장 기초적인 취약점 공격 방법의 일종 이라 한다.

악의적인 사용자가 공격 대상에게 스크립트를 넣는 기법을 (Script Injection) 의미하며,

주로 다른 웹 사이트와 정보를 교환하는 식으로 작동한다고 한다.

![](https://media.geeksforgeeks.org/wp-content/uploads/20190516152959/Cross-Site-ScriptingXSS.png)

Chatterbox Client 를 진행하면서 다음과 같은 과정을 거쳐서 데이터를 가지고 올 수 있었다.

1. 클라이언트에서 서버에 메시지 요청

2. 서버에서 클라이언트에게 메시지 응답

3. 클라이언트에서 응답 받은 메시지를 DOM 에 반영

나는 textContent 를 통해 진행했지만, 태그 를 실행하기 위해 .innerHTML 로 받아서 appendChild 로 렌더해 놓았다 가정하자.

만약 받은 메시지 중에, 아래와 script injection 코드가 있다면 어떻게 될까?

```js
{
  name : "hacker",
  text : "<script>alert('너의 컴퓨터는 해킹되었다!')</script>"
}
```

나의 원래 의도는 서버로부터 사용자들이 재밌게 남겨놓은 댓글 텍스트만 받기로 한 것이였는데,

해커가 심어 놓은 script code 에 대응하지 못하는 경우가 생기게 된다.

그 공격이 alert 가 아닌 더 쎈 것이라면?

웹 어플리케이션이 사용자로부터 입력 받은 값을 제대로 검사하지 않고 사용할 경우에 발생할 수 있다고 하며,

이에 따른 결과는 사용자가 의도치 않은 행동을 수행하거나 쿠키, 세션등의 정보를 탈취 당한다.

따라서 XSS의 희생자는 웹 어플리케이션이 아닌 사용자가 된다.

## 👩🏿‍🦰XSS 방지 대책

1. 쿠키에 중요한 정보를 담지 않고 서버에 중요 정보를 저장

2. 정보를 암호화

3. document.cookie를 이용해 쿠키에 접속하는 것을 방지

4. url encoding 이나 문자열 치환 (&lt, &nbsp 같은..)

## 👩🏿CSRF : 서버가 클라이언트를 신뢰해서 발생하는 이슈

서버가 인증된 사용자를 신뢰한다는 취약점을 공격하는 방법이다.

서버 api에서 보안 취약점을 찾은 후에, 사용자가 의지와는 무관하게 서버 요청을 보내서 정보를 수정, 삭제하는 해킹기법 이다.

지정한 Client 는 서버 입장에서 해가 되는 행동? 들을 지정해 놓지 않았기 때문에 클라이언트가 위해가 되는 요청을 하지 않을 것이다 라는 느낌?

"Server" 는 인증정보를 가지고 오면 믿는다.

가령 해커가 나쁜 코드를 잔뜩 심어놓은 웹사이트를 만들었다.

![](https://miro.medium.com/max/1400/1*vdh5SWbgqYu4QNgtovBt2A.png)

이제 해커는 웹사이트 url 을 어떤 커뮤니티 게시판 에 링크로 올려 놓는다. (사칭 쇼핑몰 사이트 같은)

이제 다른 사용자가 링크를 클릭하면 해당 사용자의 인증 정보를 가지고 해커가 심어놓은 링크로 들어가게 되는데,

이제 해커가 그 인증정보를 가로채서 서버에 다시 요청을 보내면,

서버는 인증정보가 해커의 요청임을 알지 못하므로 해커가 원하는 API 구현이 (회원탈퇴, 예금인출, Admin 접근 등) 가능해 진다.

따라서 사용자가 웹사이트에 로그인한 상태에서 CSRF 코드가 삽입된 페이지를 열면, 공격 대상이 되는 웹사이트는 위조된 공격 명령이 믿을 수 있는 인증된 사용자로부터 발송된 것으로 판단하게 되어 공격에 노출된다.

즉, CSRF는 공격자가 유저의 컴퓨터를 감염시키거나 해킹을 해서 이뤄지는게 아니라 2가지 조건을 만족해야한다.

1. 위조 요청을 전송하는 서비스에 로그인 상태여야한다.

2. 희생자는 공격자가 만든 피싱 사이트에 접속해야한다.

## 👩🏿CSRF의 방지 대책

1. Referrer 검증 (서버 단에서 요청의 referrer를 확인하여 도메인이 일치하는지 검증)

2. Security Token을 사용 (사용자 세션에 암호화된 값을 저장하고, 사용자의 요청마다 해당 암호화된 값을 포함 시켜 전송한다. 이후 서버에서 요청을 받을 때마다 세션에 저장된 토큰 값과 요청에 전달되는 토큰 값이 일치하는지 확인한다.)

단, 두 방법 모두 같은 도메인 내에 XSS 취약점이 있다면 CSRF 공격에 취약해진다.

## 👩🏿‍🦰XSS 와 CSRF 비교👩🏿

두가지 방법 모두 사용자의 브라우저를 목표로 하는 비슷한 공격이지만

XSS는 사이트 변조나 백도어를 통해 클라이언트에 대한 공격을 하고, 세션이 없어도 공격을 할 수 있으며 스크립트를 실행 시키는 공격이다.

CSRF는 요청을 위조하여 사용자의 권한을 이용해 서버에 대한 악성 공격을 하고, 인증을 악용하여 희생자에게 특정 요청을 시키는 공격이다.