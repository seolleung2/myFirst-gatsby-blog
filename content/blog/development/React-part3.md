---
title: 🤖아묻따 트위틀러 만들기 (React Starter CheetSheet Ver.1)
date: 2020-11-19 23:55:00
category: development
draft: false
---

# 👨🏻‍🚀React Starter CheetSheet

## 👨🏻‍🎨사전 준비

1. 빠른 react app 생성 (터미널 입력)

```js
npx create-react-app <프로젝트이름>
```

뭔가 신나게 깔아대고 "프로젝트이름" 으로 되어 있는 디렉토리가 하나 생긴다.

2. cd <프로젝트이름>

3. code . 로 실행

4. npm start 로 서버 돌리고 테스트 체크 : http://localhost:3000

## 👩🏻‍🦳파일 확인하기

index.js 그리고 App.js 가 있다.

일단 index.js 는 root 경로 안으로 렌더 하고자 하는 컴포넌트를 통째 render 해 주는 함수가 위치하고 있다.

생김새는 아래와 같다.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Twittler from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <Twittler />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
```

내 앱 이름은 "Twittler" 로 해줄 거라서 import 부분 및 render 부분을 Twittler 라는 이름으로 갈아 치워버렸다.

이제 여긴 건들게 없다.

App.js 로 가면 뭔가 코드가 있기는 한데, 싹 다 지워버리고

```js
import React from 'react'
import './App.css'

export default Twittler
```

요렇게 바꿔준 뒤 시작하면 된다.

세세히 따질라고 했는데 그랬다가는 한도 끝도 없다 일단 그냥 받아들이기로 했다.

## 👩🏿‍🦰Twittler Component 생성하기

컴포넌트 생성에는 함수형 과 클래스 형 두가지 생성 방법이 있다.

변할 수 있는 정보 (상태) 를 갖게 하려면 닥 클래스형 컴포넌트로 만들어야 한다.

그리구 이름은.. Twittler 로 하기루 했으니까,

```js
class Twittler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 어떤 상태를 줘야 할진 앱마다 다르겟지🍎
    }
  }
  render() {
    // 기본적 UI 를 띄우기 위한 함수.
  }
}
```

아 얼른 자러가야 겠다.. 내일 써야지 ㅠㅠ
