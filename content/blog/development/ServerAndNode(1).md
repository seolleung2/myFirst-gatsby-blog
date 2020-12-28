---
title: 🐼Before Start Mini Node Server (1)
date: 2020-12-28 21:30:00
category: development
draft: false
---

## 🐳Node.js?

### 정의 1. V8 엔진으로 빌드된 Javascript 런타임

V8 엔진으로 빌드된 Javascript 런타임 입니다 라고 정의하고 있다.

여기서 V8 이 의미하는 것은 엔진 이라고 하는 것 같은데 자바스크립트를 기계 (컴퓨터) 가 알아들을 수 있게 컴파일 해주는 역할을 한다.

한 줄로 다시 정의하면,

즉, 자바스크립트를 기계어로 컴파일 해주는 엔진으로 빌드 된 자바스크립트가 구동중인 환경이다.

### 정의 2. 이벤트 기반 및 논블로킹 I/O 모델

이벤트 기반 및 논블로킹 I/O 모델 이라고도 하는데, 여기서 이벤트는

🍎이벤트 - 유저의 버튼 클릭이나 네트워크에 리소스를 요청하는 것 등

🍎블로킹 - 다음 함수의 실행이 현재 함수의 종료 이후에 이루어지는 것. (동기)

🍎논블로킹 - 다음 함수의 실행이 현재 함수의 종료를 기다리지 않음. (비동기)

저번에 배웠던 커피 주문받는 과정 (주문받기 - 샷 추출 - 커피 제조 - 전달 - 새 주문받기) 을 동기, 비동기로 그림을 그려 볼 수 있었다.

🍎I/O 모델 - 인풋을 주면 아웃풋을 주는 모델

즉, 이벤트 기반 및 논블로킹 I/O 모델 의 의미는,

유저의 클릭이나 네트워크에 리소스를 요청하는 이벤트가 논블로킹으로 이루어지는 Input Output model 을 의미! 한다!

그래서 Node.js 는 js 를 컴파일 해서 구동하고 이벤트 기반의 논블로킹 모델로 속도가 빠르다.

## 🐳Node Core modules (Built-in Module)

노드를 설치를 했다면 이제 다른 곳에서 받아오지 않아도 쓸 수 있는 코어 모듈들이 있다.

node 와 함께 번들링되어 있는 모듈을 의미하며, require(“”) 방식으로 사용 할 수 있다.

예시 - fs, http, url, path 등의 모듈은, node.js 가 설치되었다면 package manager 에서 별도 설치가 필요 없다.

## 🐳Core modules 중에 http module ?

아 이 http 모듈을 사용해서 서버 애플리케이션을 구축하는데 쓰는구나.

즉, Node.js가 HTTP(Hypter Text Transfer Protocol)로 데이터를 보내도록 하는 빌트인 모듈 이면서

HTTP 모듈은 서버 포트를 알아보고 클라이언트에게 response를 주는 HTTP 서버를 만들 수 있다.

## 🐳NPM - Node Package Manager

![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png)

세계에서 가장 큰 오픈소스 라이브러리 생태계 중 하나. (Node Package Manager)

나는 Yarn 도 동시에 설치해서 사용하고 있다.

예로 Jquery source 를 script 에 박아놓고 사용 했다면, 이제는 npm install 로 설치해서 사용이 가능해 졌다.

설치가 되면 package.json 의 dependency 에 담기게 된다.

## 🐳Detail of Package.json

### 1. run script?

start, build, test 같은게 설정되어 있네?: cli (터미널 등) 에서 해당 코드를 실행시킨다.

### 2. dev-dependencies

production 과 관계 없는 개발만을 위한 dependency 이다.

yarn add @babel/core —dev 또는 npm install @babel/core —save-dev 이런 식으로 -dev 즉, 개발용도로 사용하겠다 해서 —dev 옵션을 줘서 등록한다.

### 3. dependencies

직접 production 과 관련 있는 라이브러리 들이 담겨 있다.

이러한 라이브러리를 설치 할 때는 yarn add react 혹은 npm install —save react (npm 에서는 —save 옵션을 줘야 한다)

### 4. why save?

우리가 흔히 하는 npm install 은 package.json 에 있는 dependency 를 바탕으로 설치가 된다.

그런데 만약 dependency 에 등록되어 있지 않다면, 코드에서는 해당 모듈을 쓰고 있지만 npm install 로는 설치되지 않는다.

그래서 모듈이 없다는 에러가 뜨고, 팀원간의 불화가 싹트게 된다.

### 5. npm start

package.json 에 정의되어 있다. 보통 node index.js 라 정의되어 있다.

서버를 실행시킨다 하면 한번 켜지고 저장사항을 반영하지는 못해서 껐다가 켜야 하는 단점이 있다.

### 5-1. nodemon

1. 위의 npm start 시 생기는 단점을 없애주고 반영사항을 즉각적으로 반영해 주는 역할이다!

2. 빈 폴더에서 npm init 을 통해 description 등을 써주는데 보통 다 엔터치고 만든다.

3. root 경로에서 index.js 를 만들어서 console.log 아무거나 적어 본다.

4. cli 에서는 node index.js 라 해서 실행하겠지?

5. package.json 에서는 “start”: “node index.js” 로 써주고 cli 에 npm start 쳐보면 실행된다.

6. npm install —save nodemon 설치한다. 그리고 “start” : nodemon index.js

nodemon 은 매번 서버를 켜고 끔이 없이 한 번 cli 에 서버를 켜놓으면, 우리의 수정사항을 즉각적으로 반영시켜 준다.
