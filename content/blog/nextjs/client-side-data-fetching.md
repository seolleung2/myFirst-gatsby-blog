---
title: 클라이언트 사이드 데이터 페칭 구현하기 (feat. SWR)
date: 2022-11-29 01:08:00
category: nextjs
draft: false
---

## 일반적인 리액트 방식의 클라이언트 사이드 데이터 페칭

상술하지 않겠지만, useEffect hook 을 통해 그 안에서 fetch, axios 등으로 데이터 페칭을 하여 나온 응답 데이터를 임의의 상태 (useState) 에 담아준다.

이후 컴포넌트가 리턴하는 jsx 코드에서 데이터 페칭 로딩 여부 등을 분기 처리하여 화면에 보여주는 아래와 같이 일반적인 방식의 코드일 것이다.

```jsx
import React, { useState, useEffect } from 'react'

function LastSalesPage() {
  const [sales, setSales] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch('https://nextjs-course-0000-default-0000.firebaseio.com/sales.json')
      .then(response => response.json())
      .then(data => {
        const dataSet = []
        for (const key in data) {
          dataSet.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          })
        }
        console.log('dataSet', dataSet)
        setSales(dataSet)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <h2>Loading....</h2>
  }

  if (!sales) {
    return <p>No data found.</p>
  }
  return (
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>
          {sale.username}-${sale.volume}
        </li>
      ))}
    </ul>
  )
}

export default LastSalesPage
```

## 위의 코드를 간단하게 해주는 useSWR hooks

[SWR : Documentation Link](https://swr.vercel.app/ko/docs/getting-started)

![](https://swr-card.vercel.app/)

> 데이터 가져오기를 위한 React Hooks

> "SWR"이라는 이름은 HTTP RFC 5861에 의해 알려진 HTTP 캐시 무효 전략인 stale-while-revalidate에서 유래되었습니다. SWR은 먼저 캐시(스태일)로부터 데이터를 반환한 후, fetch 요청(재검증)을 하고, 최종적으로 최신화된 데이터를 가져오는 전략입니다.

데이터 캐싱 및 최신 데이터를 제공하기 위한 자동 유효성 재검사, 에러 시 요청 재시도 등의 주요한 기능들이 있다고 한다. 이를 통해 코드를 훨씬 간단하게 작성할 수 있다.

useSWR 훅의 두번째 인자에 넣어주는 fetcher 함수가 필수 인자가 아닐거라 생각했는데 넣어주어야 요청이 진행되는 거 같았다.

```jsx
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

function LastSalesPage() {
  const [sales, setSales] = useState()

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR(
    'https://nextjs-course-00000-default-0000.firebaseio.com/sales.json',
    fetcher
  )

  useEffect(() => {
    if (data) {
      const dataSet = []
      for (const key in data) {
        dataSet.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        })
      }

      setSales(dataSet)
    }
  }, [data])

  if (error) {
    return <p>Failed to fetch data.</p>
  }

  if (!data || !sales) {
    return <h2>Loading....</h2>
  }

  return (
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>
          {sale.username}-${sale.volume}
        </li>
      ))}
    </ul>
  )
}

export default LastSalesPage
```

## 어떤 경우에 클라이언트 사이드 데이터 페칭을 할까?

개발 과정에서 서버 측에서 데이터를 fetching 하고 준비하는 개념과 반대의 경우에 해당한다.

- 어떤 데이터는 사전 렌더링을 할 필요가 없거나

- 사전 렌더링을 할 수 없는 데이터를 다루게 될 때

사용하는데, 자세히 풀어보면 다음과 같다.

<br/>

> Data changing with high frequency (e.g. stock data)

- 매초마다 데이터가 바뀌어 prefetching, pre-render 가 쓸모없다. 이런 경우에 위의 고드 처럼 로딩 스피너를 띄웠다가 가져오는 편이 낫다고 여겨진다.

<br/>

> Highly user-specific data <br/>(e.g. last orders in an online shop, user profile page)

- 검색엔진 구글봇이 개인 프로필 정보를 긁어다가 SEO 에 반영할 것도 아니고, 프로필 페이지에서 데이터를 좀 기다린다고 사용성에 크게 영향을 주는 것은 아니므로

- 이런 경우는 데이터가 바로 보이기 보다는 페이지 간의 탐색이 더 빠른 것이 좋을 것이다.

<br/>

> Partial data (e.g. data that's only used on a part of an page)

- 페이지 내 데이터의 일부분만 표시하는 경우

- 대시보드에서 다양한 데이터를 서버에 한번에 요청 시 처리하는 데 시간이 많이 걸릴 수 있을 것이다.

- 앞서 언급한 대로 페이지 자체가 개인적이거나 변동이 잦다.

<br/>

고로 페이지 생성을 위한 데이터 프리페칭은 필수가 아니며 위와 같은 상황에 따라 클라이언트 사이드 페칭을 사용해야 하는 순간도 많다는 점을 이해하면 좋을 거 같다.
