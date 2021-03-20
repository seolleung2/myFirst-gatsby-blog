---
title: 🐤Next.js
date: 2021-03-20 13:20:00
category: Next.js
draft: false
---

## 🎮Next.js 가 뭘까?

![](https://blog.logrocket.com/wp-content/uploads/2020/02/introducing-create-next-app.jpeg)

Next. 리액트 기반의 프레임워크.

리액트는 '컴포넌트' 를 사용하여 UI 를 효율적으로 만들기 위한 프레임워크 이다. 리액트 만으로도 프론트개발을 할 수 있는데, 왜 굳이

Next 니 서버 사이드 렌더링이라느니 하는 것을 알려고 하는 걸까?

먼저 렌더링이란 서버의 응답을 받아 화면에 (브라우저에) 띄운다는 것을 생각하면 쉽다.

## 🎮React (SPA) 의 장단점 - CSR (클라이언트 사이드 렌더링)

리액트 에서는 페이지를 불러올 때 필요한 모든 자바스크립트 파일을 한번에 불러온다.

페이지 이동을 통해 받아온 파일을 이용하여 UI 를 변화시키며 필요한 데이터는 서버에서 JSON 형태로 받아 UI 를 빠르게 변화시킬 수 있다.

그런데 하나의 페이지를 불러 올 때마다 모든 자바스크립트 코드를 불러와야 하기 때문에 처음 페이지를 불러올 때 시간이 오래 걸리게 된다고 한다.

https://d2.naver.com/helloworld/7804182

위 링크에 좋은 내용들이 있었다. 더불어 링크에 있는 사진도 첨부해 본다.

![](https://d2.naver.com/content/images/2020/06/csr.png)

그리고 SPA 는 (클라이언트 사이드 렌더링은) 검색 엔진 최적화 (SEO) 에 좋지 않다고 한다.

검색 엔진 최적화(영어: search engine optimization, SEO)는 웹 페이지 검색엔진이 자료를 수집하고 순위를 매기는 방식에 맞게 웹 페이지를 구성해서 검색 결과의 상위에 나올 수 있도록 하는 작업을 말한다.

쉽게 말하면 위의 클라이언트 사이드 렌더링의 예시를 보여주는 이미지를 봤을 때, 검색 엔진 봇이 사이트에 방문했을 때 로딩중인 상태라서 콘텐츠를 제공하지 못하게 되어,

사이트를 파악하는 데 어려움이 생기고 <strong>일껏 공들여 만들어 놓은 내 페이지가 검색 순위에 혹은 아예 안보이게 된다면</strong> 마음이 아프지 않겠는가?

이러한 문제점을 서버 사이드 렌더링 (SSR) 을 사용함으로써 해결할 수 있다고 한다.

## 🎮SSR (서버 사이드 렌더링) 의 장단점

서버 사이드 렌더링은 사이트에 접속할 때 렌더링된 html 을 불러오게 된다.

필요한 자바스크립트 파일을 불러올 때까지 반응은 하지 않지만, 빠르게 화면을 보일 수 있기에 속도가 빨라 보이게 된다고 한다.

![](https://d2.naver.com/content/images/2020/06/ssr.png)

검색 엔진 봇에 렌더링 된 html 을 제공하여 검색 엔진 최적화에도 좋다.

하지만 서버 사이드 렌더링은 페이지 이동 시 새로운 페이지를 요청하기 때문에 페이지 이동시에 깜박임이 존재한다.

또한 페이지 이동 시 템플릿을 중복해서 로딩하고 SSR 을 하는 것이 서버에 부담을 주기 때문에 성능상 좋지 않다는 단점을 가지고 있다 한다.

## 🎮그래서 Next

넥스트는 SPA 와 SSR 의 단점을 해결하기 위해서 리액트 에 서버 사이드 렌더링 기능을 더하여 SPA 와 SSR 의 장점을 가질 수 있게 된다.

리액트 자체에서 SSR 을 추가하려면 복잡한 과정을 필요로 하지만 넥스트 에서는 복잡한 과정을 설정하지 않고 사용할 수 있어 개발 환경을 설정하는 시간을 줄일 수 있다.

## 🎮Next.js 의 특징

1. 사전 렌더링 및 서버 사이드 렌더링

- 넥스트는 기본적으로 빌드 시에 만든 모든 페이지를 미리 렌더링 한다.

- 서버의 데이터를 필요로 하는 페이지는 요청 시에 서버 사이드 렌더링을 통해 HTML 을 생성한다.

2. Hot Code Reloading 을 지원하는 개발 환경

- 코드 변경 사항이 저장되면 응용 프로그램을 자동으로 다시 로드

3. 자동 코드 분할

- 코드의 모든 가져오기가 번들로 묶여 각 페이지와 함께 제공된다고 한다.

- 불필요한 코드가 페이지에 로드되지 않게 함

4. 웹팩과 바벨을 사용하는 넥스트

- SSR 렌더링 및 개발에 필요한 설정이 이미 되어 있음

- 플러그인을 손쉽게 추가 사용이 가능

5. 타입스크립트 내장

6. 파일기반 내비게이션 기능

- 리액트의 'react-router' 를 통한 라우팅 설정을 페이지 경로에 대해 직접 해줘야 했다.

- 넥스트는 파일 시스템 기반 라우팅을 사용하므로 폴더 경로에 따라 페이지의 경로가 설정되어 구축이 빠르고 관리가 편하다.

7. styled-jsx 지원

- 자체 CSS-in-JS 인 styled-jsx 를 지원

## 🎮Next.js 프로젝트 설치

### 1. CNA (Create-Next-App) 을 사용한 설치

node 와 npm 그리고 에디터 등의 설치가 되었다는 가정하에 아래의 명령어를 CLI 에 입력한다.

    ```js
    npx create-next-app
    ```

프로젝트 이름 등을 입력하고 폴더로 이동하면 여러 파일 트리들이 보인다.

그 중 package.json 에 있는 "script" 객체 부분을 보자면,

    ```js
    "scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
    },
    ```

- yarn (npm) dev : 개발 환경의 넥스트를 실행한다. 리액트의 npm run start 와 비슷하다.

- yarn (npm) build : 넥스트 애플리케이션 번들을 만든다.

- yarn (npm) start : 빌드된 넥스트 애플리케이션을 실행한다.

yarn dev 를 통해 서버가 localhost 의 3000번 포트에서 실행된다는 정보가 CLI 에 출력된다.

![](https://blog.logrocket.com/wp-content/uploads/2021/03/generic-welcome-page-localhost.png)

### 2. 수동으로 설치하기

1. mkdir next-app

2. cd next-app

3. yarn init -y (모두 yes 로 대화식 세션 건너뜀)

4. yarn add next react react-dom

5. package.json 에 넥스트를 실행할 script 명령어 추가하기

    ```js
    "scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
    },
    ```
6. 프로젝트 루트 경로에 pages 폴더 (라우팅을 담당 : 이름 정확해야 함) 를 생성

7. 그 안에 index.jsx 파일 생성, 간단한 컴포넌트 만들고 yarn dev 로 확인

넥스트는 리액트를 import 하지 않더라도 암시적으로 import 해준다.

## 🎮Eslint 설치, prettier 설정

1. 먼저 npm install -g eslint 로 글로벌 설치 한다.

2. 그리고 vscode 에서 eslint 를 검색해 확장 프로그램을 설치한다.

3. 프로젝트 폴더 경로에서 eslint --init 으로 .eslintrc 파일 생성

4. .eslintrc 파일 내 추가적으로 개발하면서 필요한 규칙들 추가하기

    ```js
    module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ["airbnb"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
        jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        quotes: ["error", "double"], //더블 쿼터 사용
        "@typescript-eslint/quotes": ["error", "double"], //더블 쿼터 사용
        "no-unused-vars": "off", //사용안한 변수 경고 중복
        "spaced-comment": "off", //주석을 뒤에 쓰지 말라는 경고
        "@typescript-eslint/no-unused-vars": "warn", //사용안한 변수는 경고
        "jsx-a11y/control-has-associated-label": "off", // 상호작용하는 엘리먼트에 label을 넣는다
        "react/no-array-index-key": "off", // key값으로 index를 사용할수 있다.
        "comma-dangle": "off", // 마지막에 , 을 넣어주지 않는다.
        "arrow-body-style": "off", //화살표 함수 안에 return을 사용 할 수 있다.
        "react/no-unescaped-entities": "off", //문자열 내에서 " ' > } 허용
        "react/prop-types": "off", //proptypes를 사용하지 않는다.
        "object-curly-newline": "off", // { 다음 줄 바꿈을 강제로 사용하지 않는다.
        "react/jsx-one-expression-per-line": "off", //한라인에 여러개의 JSX를 사용 할 수 있다.
        "implicit-arrow-linebreak": "off", // 화살표 함수 다음에 줄 바꿈을 사용할 수 있다.
        "no-shadow": "off", //파일 내에서 중복 이름을 사용 할 수 있다.
        "operator-linebreak": "off", //연산자 다음 줄 바꿈을 사용 할 수 있다.
        "react/react-in-jsx-scope": "off", // jsx를 사용하여도 React를 꼭 import 하지 않아도 된다.
        "react/jsx-props-no-spreading": "off", //props를 스프래드 할 수 있다.
        "jsx-a11y/anchor-is-valid": "off", // next js에서는 a에 href없이 사용
        "global-require": "off", //함수 내에서 require 사용가능
        "no-use-before-define": "off", // 선언전에 사용하지 말라,
        "import/prefer-default-export": "off", //export default 권장
        "no-param-reassign": "off", //param assign 하지 않기
        "jsx-a11y/label-has-associated-control": "off",
        "no-invalid-css": "off",
        "no-confusing-arrow": "off",
        "react/jsx-curly-newline": "off",
        indent: "off",
        "react/jsx-filename-extension": [
        1,
        { extensions: [".js", ".jsx", ".tsx"] }, //jsx사용가능한 확장자 설정
        ],
        "import/extensions": [
        "error",
        "ignorePackages",
        {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
        }, //import 시 확장자명은 사용하지 않는다.
        ],
    },
    settings: {
        "import/resolver": {
        node: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
        },
        },
    },
    };

    ```

    이렇게나 많은 규칙들이 있다는 데 놀랐고 생각보다 자유도가 높다고 느꼈다.



