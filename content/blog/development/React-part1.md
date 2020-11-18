---
title: ⚛React 공식문서 뽀개기 (1)
date: 2020-11-18 23:50:00
category: development
draft: false
---

## 💄React 학습 이유

<p align="center"><img src="https://media.vlpt.us/images/daybreak/post/fb73866e-dd71-4c0b-ab78-b2cb19c3d359/react.jpeg"></p>

로고를 보고 나는 아인슈타인과 원자폭탄 생각이 났다.

HTML, CSS, JS 를 익혀왔는데 이 세가지만으로도 웹 어플리케이션을 만들 수 있지만,

유저와의 수많은 인터렉션은 그만큼 수많은 상태관리가 필요하다고 한다.

예로 배경 이미지를 바꾸도록 하는 버튼을 눌렀을 떄,

1. 바꿀 이미지 DOM 을 찾는다.

2. 이미지 DOM 의 소스를 바꿀 이미지로 바꿔준다.

3. 바뀐 이미지를 화면에 다시 띄워 준다.

라는 세 가지 과정을 거치게 된다.

그런데 앞서 말했듯 관리해야 할 DOM (인터렉션) 이 많아질 수록 상태관리가 어려워 진다.

그래서 페이스북에서 개발자들아 기능 개발에만 쏟아 부어라 하고

<p align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1jbXe6-tjF8gvnO6KkWn4fY_HHW0Bq0Keg&usqp=CAU"></p>

React 라는 웹 프레임 워크를 만들어 낸다.

## ⚛️리액트 공식 문서를 실험하기 전에..

리액트는 Component 단위로 구성 되어 있다고 한다.

Component 는 하나의 의미를 가진 독립적인 단위 모듈, 쉽게 말해 나만의 커스텀 html 태그 같은 거인데 이대로 읽고 고개를 끄덕일 초심자는 아무도 없을 거다.

여튼 그래서 이 컴포넌트 (하나의 의미를 가진 태그 같은) 를 만들어 사용함으로써 직관적이고 재사용성이 올라간다고 한다.

## ⚛️React ES6

반드시 알아야 할 ES6 일곱가지 문법

- Destructuring

- Spread Operator

- Rest Parameters

- Default Parameters (200JH 님 감사합니다)

- Template literals

- Arrow Function

- for ~ of loop

## ⚛️JSX

자바스크립트 확장 문법이라고 한다. html 같이 생겼는데?

화면에 보여주기 위해 사용하며 복잡도 가 줄어들고 가독성이 올라간다고 한다. 리액트 element 를 생성한다.

사용 및 작성을 하면 Babel 이라는 것을 통해 알아서 컴파일 된다고 한다.

JSX 의 사용 조건은

1. 반드시 하나의 엘리먼트로 감싸야 한다. 덩어리는 하나!

2. Javascript 코드를 적용할 땐 { } curly bracket 안에 작성한다.

3. JSX 내부에서는 if 문을 사용할 수 없다. IIFE or 삼항 연산자를 사용한다.

4. 엘리먼트의 클래스 이름을 적용할 때, class 가 아닌 className 을 사용한다.

## ⚛️render() 라는 메서드를 구현하는 React Component

render() 라는 메서드 는 데이터를 입력받아 화면에 표시할 내용을 반환하는 역할을 한다.

그리고 JSX 라는 문법을 써서 자바스크립트 문법을 쓸 때 { } 로 감싸는 구나. 정도

## ⚛️마크업과 로직을 둘 다 포함하는 React Component
