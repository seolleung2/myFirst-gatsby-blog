---
title: 🐤Redux - Part 2. React + Redux (2)
date: 2021-01-12 21:30:00
category: development
draft: false
---

## 1. Store, 가게 차리기

좀 아까 handleSubmit 내의 DOM 요소들을 주석처리하고 store.js 를 만들었다.

프로젝트 경로 내 src 디렉토리 상단에서 생성했다.

![](https://이듬.run/react-master/images/why-using-redux.jpg)

## 2. store.js 코드

```js
import { createStore } from 'redux'

const ADD = 'ADD'
const DELETE = 'DELETE'

export const addToDo = text => {
  return {
    type: ADD,
    text,
  }
}

export const deleteToDo = id => {
  return {
    type: DELETE,
    id,
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, { text: action.text, id: Date.now() }]
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id)
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
```

그런데 store.subscribe() 는 어디로?

state 에 변화가 생길 때마다 App 을 리렌더 하게끔 변경사항을 알려줬던 아이가 subscribe 이다.

그렇게 하려면 코드를 작성해야 하는데, 어제 진행했던 Vanilla.js-Redux 와 달리

React-Redux 는 store 의 변동사항에 대해 subscribe 하는 방식이 다르다.

## 3. index.js 그리고 Provider

현재 App 을 방금 만든 store 와 연결하는 작업을 하게 된다.

```js
import { Provider } from 'react-redux'
import store from './store'
```

아.. store 는 여기서 불러올려고 exports default store 를 선언했구나?!

이제 ReactDOM 내 코드를 아래와 같이 수정했다.

```js
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

App 과 store 를 연결하기 위한 두 번째는 < App/ > 을 Provider 로 감싸주는 것이다.

세 번째로는 Provider 는 store 가 필요해서 props 로 아까 만든 store 를 내려 주었다.

index.js 에 Provider 를 불러와 내 앱을 연결함으로써 얻는 이점이 무엇이 있을까?
