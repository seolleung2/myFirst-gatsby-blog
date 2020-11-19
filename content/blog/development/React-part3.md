---
title: 아묻따 트위틀러 만들기
date: 2020-11-19 23:55:00
category: development
draft: false
---

## 👨🏻‍🚀일단 코드부터 붙여 넣자

일일 커밋을 위해 호다닥..

```js
import React from 'react'
import './App.css'

// function Twittler() {
//   return <div>i am twitter</div>;
// }
// 1. Twittler 컴포넌트는 상태를 갖는다 >>> 함수형과 클래스형 중에 클래스 형으로 써야 한다.

class Twittler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 2. state 상태, 변할 수 있는 정보들을 입력한다 (직접수정 불가, 배열 push 불가, setState 사용해야 함)
      tweets: [
        {
          uuid: 1,
          writer: '애플이🍎',
          date: '2020-11-19',
          content: '리액트는 어때?',
        },
        {
          uuid: 2,
          writer: '건마짜응👨🏻‍',
          date: '2020-11-19',
          content: 'Not easy for me..😭',
        },
      ],
      value: '', // 7. state 객체에 value 라는 key 를 하나 더 만들었고 빈 배열이다.
    }
    this.handleChange = this.handleChange.bind(this) // 10. ?? 이유는 정확히 모르겠음. 일단 넣었다. 이제 리액트 확장 프로그램으로 state 를 확인해보면 된다.
    this.handleClick = this.handleClick.bind(this) // 13. 이제 버튼 JSX 가서 onClick 등록하러 가자.
  }
  // 6. textarea 에 글자를 하나씩 입력할 때마다 값이 들어가게 해야 한다. 어디에 넣나?

  // 8. handleChange 함수는 상태 변경을 위한 함수. setState 사용, this.state.value 의 값을 내가 입력한 값으로 바꿔버림.
  handleChange(event) {
    this.setState({ value: event.target.value }) // 9. this.state.value 의 값만을 바꾼다. JSX textarea 속성 수정.
  }

  // 11. 그래 React Dev Tools 를 써서 지정한 value 에 내가 써넣은 메시지가 들어가는건 알겠어. 근데 실제 들어가야지 않겠어?
  // 12. 그래서 handleClick 이라는 함수를 만들고 버튼에다 이 함수를 onClick 이벤타도르로 건다.
  handleClick(val) {
    // val 은 9에서 넣은 실제 타자 친 그 값이 들어가는 거다.
    // mockdata 의 형태와 같아야 하니까 베껴오자, 쓰기 쉽게 변수에 담고!
    let newTweet = {
      uuid: this.state.tweets.length + 1, // 배열의길이 + 1
      writer: 'CodeTasteJung',
      date: new Date().toLocaleDateString,
      content: val,
    }
    this.setState({ tweets: [...this.state.tweets, newTweet] })
    this.setState({ value: '' })
  }
  render() {
    // 3. 일단 기본적 UI 를 띄우는 render() 구현, 아래 ul 이하에 mockup data 불러다 넣어야 함.
    return (
      <div>
        <div>작성자: 👨🏻‍🚀Dev-Seolleung2👨🏻‍🚀</div>
        <div id="writing-area">
          <textarea
            id="new-tweet-content"
            cols="30"
            rows="3"
            onChange={this.handleChange}
            value={this.state.value} // 얘는 안써줘도 될거같은데 정확히는 모르겠도다.
          ></textarea>
          <button
            id="submit-new-tweet"
            onClick={() => {
              this.handleClick(this.state.value)
            }}
          >
            새 글 쓰기
          </button>
        </div>
        <div>
          <ul id="tweets">
            {this.state.tweets.map(tweet => {
              return (
                <SingleTweet
                  writer={tweet.writer}
                  date={tweet.date}
                  content={tweet.content}
                />
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
// 4. ul 태그 아래에 {} 를 넣어 그 안에 JSX 표현식을 넣었다. map 반복을 돌려서 SingleTweet 이란 컴포넌트를 리턴하게 한다.

// 5. 그런데 그 SingleTweet 이란 컴포넌트는 아래 함수형으로 만들어 놓았다. 이제 댓글 하나 당 아래와 같은 형태로 리턴된다.
function SingleTweet(props) {
  return (
    <li>
      <div>{props.writer}</div>
      <div>{props.date}</div>
      <div>{props.content}</div>
    </li>
  )
}

export default Twittler
```
