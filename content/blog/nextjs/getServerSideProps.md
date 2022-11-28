---
title: NextJS 의 사전 렌더링 방식 - (2) Server Side Rendering (using getServerSideProps)
date: 2022-11-28 20:28:00
category: nextjs
draft: false
---

## 1. 사전 렌더링 방식, 시점 톺아보기

- Static Generation : HTML 을 빌드 타임에 생성한다. pre-render 된 HTML 은 그 다음에 각 리퀘스트에서 재사용 된다.

  ![](./images/static-generation.png)

  > 개발 모드(development mode)에서는 Static Generation을 사용하는 페이지라도 모든 페이지가 각 리퀘스트에 pre-render된다.

   <br />

- Server-Side-Rendering : HTML 을 각 리퀘스트가 일어날 때 생성하는 방식. npm run build 이후 확인해 보면 .next 폴더에 서버 사이드 렌더링이 적용된 페이지는 사전 생성된 html 이 없다는 것을 확인할 수 있다.

  ![](./images/server-side-rendering.png)

  페이지 요청을 할 때 서버 사이드 내에서(만) 사전 페이지 생성을 하게 되므로, 정적 생성보다는 속도가 느릴 수 있다.

## 2. getServerSideProps의 기본 사용 예시

```jsx
import React from 'react'

function UserIdPage(props) {
  return <h1>{props.id}</h1>
}

export default UserIdPage

export async function getServerSideProps(context) {
  const { params, req, res } = context

  console.log('ServerSide code here!')
  const userId = params.uid
  return {
    props: {
      id: 'userid-' + userId,
    },
  }
}
```

코드를 보면 getStaticProps 와 유사하다.

다만 `revalidate` 같은 키워드는 사용하지 않으며 getServerSideProps 의 존재 이유, 특성상 사용할 필요도 없게 된다. (사용하면 오류남)

그리고 `context` 파라미터는 getStaticProps 가 받는 정보보다 더 많은 객체 (req, res) 등에 접근 및 수정이 가능하다.

또한 동적 페이지를 위해 (가령 `[uid].js` 같은) getStaticPaths 또한 사용할 필요가 없다.

getServerSideProps 는 서버에서만 작동되므로 NextJS 에서는 아무 페이지도 사전 생성할 필요가 없고, 따라서 사전 생성할 대상이 없으니 getStaticPaths 에 대한 정보가 필요하지 않다.

## 3. 언제 사용하는지.

[getServerSideProps : NextJS Documentation](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

Next.JS 에서는 가능한 Static Generation 을 권장하는데, 페이지가 한 번에 빌드될 수 있고 각 요청에 따라 페이지를 렌더하는데 속도가 빨라지기 때문이다.

매 요청마다 콘텐츠가 달라지거나 자주 데이터가 업데이트 되는 페이지 (주식 시세, 관리자 페이지 등) 같은 경우에는 사용자의 요청보다 먼저 페이지가 렌더되는 것이 좋지 않을 수 있다.

데이터가 매초마다 바뀐다면 미리 생성해 놓은 정적 페이지가 순식간에 구식이 되어버릴 테니 말이다.

바로 이런 경우에 SSR, getServerSideProps 를 사용한다고 한다.
