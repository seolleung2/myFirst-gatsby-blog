---
title: 🐤Redux - Part 2. React + Redux (3)
date: 2021-01-12 23:30:00
category: development
draft: false
---

## 1. store 에서 state 를 받아오게 하기.

어제 Vanilla JS + Redux 로 TODO 앱을 만들어 보았을 때, store 에서 현재의 state 를 전달해주는 메소드가 있었다.

```js
store.getState()
```

이제 Home.js 컴포넌트에서 리턴해 주는 부분에서 ul 태그 안에다 store 로부터 state 를 받아와 렌더할 수 있게 해주어야 한다.

그러려면 먼저 현재 내 컴포넌트들을 store 에 연결해야 한다.

## 2. connect

그게 바로 connect 라는 것인데, 나의 components 들을 store 에 연결하게 해 준다.

connect 는 두개의 인자 (state, dispatch) 를 가진다. 둘 중에 고를 수 있어서 이다.

연결을 위해 store 로부터 state 를 가져오게 하는 (getCurrentState) 함수를 만든다.

함수 이름은 "mapStateToProps" 로 하는게 국룰이라 한다.

```js
const mapStateToProps = (state, ownProps) => {}
```

Redux state 로부터 Component 에 props 로써 전달한다는 의미라 한다.

그리고 아래의 export default Home 을 아래와 같이 고친다.

```js
export default connect(mapStateToProps)(Home)
```

이제 Home 컴포넌트는 store 와 연결 되었다.

```js
import { connect } from 'react-redux'
```

Home.js 상위에 import 해오는 것을 잊지 말자.

이제 store 에서 현재 state 를 가져오는 mapStateToProps 를 마저 작성해본다.

## 3. mapStateToProps, Redux store 로부터 뭔가를 가지고 오고 싶을 때

store 의 reducer 에 정의한 초기 state 를 빈 배열이 아닌 state = ["initVal"] 로 지정해 두고

콘솔로그를 찍어 보았다.

```js
const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps)
}
```

개발자 도구에서는,

```js
["initVal"] {history: {…}, location: {…}, match: {…}, staticContext: undefined}

mapStateToProps() in Connect(Home) must return a plain object. Instead received undefined.
```

이런 게 뜬다.

첫 줄에서 보면 firstArgument 는 redux store 에서 온 디폴트 state 이다. (initVal)

두 번째 Argument 는 내 컴포넌트의 props 를 의미한다.

(App.js 의 react-router 에서 내려준 props)

그렇다는 뜻은 Home Component 에서 props 로 받아 올 수 있음을 의미하므로,

아래와 같이 props 를 Home 컴포넌트에 인자로 받아올 수 있게 해주고,

console.log 를 찍을 수 있게 해보았다.

```js
const Home = (props) => {
  console.log(props);
  // ! 여기서 props 로 받아왔다. App.js 의 react-router 로부터!
  ... 이하 중략 ...
```

맨 아래의 must return a plain object. 는 아직 함수 내에서 객체를 리턴하지 않아 생기는 오류이다.

그래서,

```js
const mapStateToProps = (state, ownProps) => {
  return { happy: true }
}
```

를 해보니, 위의 콘솔로그에서 아래와 같은 props 를 찍는다.

```js
{history: {…}, location: {…}, match: {…}, staticContext: undefined, happy: true, …}
```

{ happy: true } 가 props 로 추가 되어 있다.

why? connect() 는 Home 으로 보내는 props 에 추가 될 수 있도록 허용해 주기 때문이다.

무엇을 리턴하게 하든 나의 Home component 의 props 에 추가 될 것이다.

이제 store 의 state 를 받아오기 위해 mapStateToProps 가 리턴하는 객체를 아래와 같이 수정했다.

```js
const getCurrentState = state => {
  return { toDos: state } // 여기서 ownProps 는 필요없어서 지웠다.
}
```

이제, store 의 state 를 받아오고 있다.. 와아..

![](https://res.cloudinary.com/practicaldev/image/fetch/s--VtRaY29J--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/fewc8ez6r2e2agah717y.png)
