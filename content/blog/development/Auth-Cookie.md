---
title: Auth, Cookie Sprint Summary(1)
date: 2020-12-09 23:55:00
category: development
draft: false
---

## 🍪 cookie / session

<서버>
• https 쿠키를 이용해서 로그인 기능을 구현하라
1단계 : 인증서 연결하기
2단계 : 로그인 로직 구현하기
3단계 : 로그아웃 로직 구현
4단계 : 유저인포
(요청에 대해 응답하는 flow)
• 'users/login'으로 post 요청
∘ 데이터베이스의 userId와 요청에 담긴 userId 비교, 같은 방식으로 password 비교
∘ 없으면 없다고 응답
∘ 있으면 '쿠키설정'을 하고 ok 응답
• 'users/logout'으로 post 요청
∘ 요청 객체의 쿠키에 인증정보(id) 담겨있는지 확인
∘ 인증정보 없으면 없다고 응답
∘ 있으면 '쿠키를 삭제하고' ok 응답
• 'users/userinfo'로 get 요청
∘ 유저의 요청의 쿠키에 id값이 있는지 확인
∘ 없으면 not authorized
∘ 있으면 데이터베이스에서 해당하는 id를 가진 데이터를 찾아서 응답

---

<클라이언트>
• HINT: 서버에 로그인, 유저정보, 로그아웃 요청을 하는 함수의 프롭스가 비어있다.
• 컴포넌트 구조 파악
∘ 컴포넌트 구조도 그리기
• 각 컴포넌트 파일의 코드 작성하기
∘ 1단계 : mypage.js()
∘ 2단계 : Login.js()
∘ 3단계 : App.js()
• 클라이언트에서 필요한 api 요청들
∘ 아이디/비번 입력해서 login 버튼 -> users/login에 post 요청, body는 userId / password 정보
∘ logout 버튼 -> users/logout에 post 요청들어오고 응답으로 body는 필요없다?
∘ userInfo 버튼? -> users/userinfo에 get 요청, 응답객체의 data에 userInfo가 담겨있다
