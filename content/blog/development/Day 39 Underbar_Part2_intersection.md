---
title: Day 39 UnderBar_Part2 (Intersection)
date: 2020-10-15 23:55:00
category: development
draft: false
---

## 😭아직 결론이 나지 않은 Intersection

풀이법을 이해하고 넘어가고 싶지만, 내가 푸는 방식에서 작동이 되게 만드는 코드를 작성하고 싶었다. (사실 풀이법이 이해가 되지 않아서 이기도 하다.)

코드를 블로그에 올리는 것은 가급적 지양하고 싶지만 나는 그렇게 생각한다.

이 코드를 베껴 복붙해 넣어 통과해서 대통령 표창장 받는 거 아니지 않는가 싶다.
코드 베껴 넣어서 통과되었다고 그게 자기꺼 되는 건 아닐테니 본인이 더 잘 알겠지 싶다.

여튼 각설하고 언더바 \_.intersection 은 다음과 같은 역할을 하고 있다.

```js
// _.intersection은 여러 개의 배열을 입력받아, 교집합 배열을 리턴합니다.
// 교집합 배열은 모든 배열에 공통으로 등장하는 요소들만을 요소로 갖는 배열입니다.
// 교집합 배열의 요소들은 첫 번째 입력인 배열을 기준으로 합니다.
// 교집합이 없는 경우 빈 배열을 리턴합니다.
// 아래 예제를 참고하시기 바랍니다.
// const set1 = ['a', 'e', 'b', 'c'];
// const set2 = ['c', 'd', 'e'];
// const result = _.intersection(set1, set2);
// console.log(result) // --> ['e', 'c']
// // 첫 번째 배열에 'e'가 먼저 등장
```

## 👹나의 문제 풀이법

```js
_.intersection = function(...arrays) {
  let lumpOfArrays = []
  let arrNum = arrays.length
  console.log(arrNum)
  _.each(arrays, function(arr) {
    lumpOfArrays.push(...arr)
  })
  let transObj = {}
  for (let i = 0; i < lumpOfArrays.length; i++) {
    if (!_.includes(Object.keys(transObj), lumpOfArrays[i])) {
      transObj[lumpOfArrays[i]] = 1
    } else {
      transObj[lumpOfArrays[i]] = transObj[lumpOfArrays[i]] + 1
    }
  }
  let result = []
  for (let key in transObj) {
    if (transObj[key] === arrNum) {
      result.push(key)
    }
  }
  return result
}
```

마지막 케이스를 제외하고는 통과가 된다,
마지막 케이스를 통과하지 못하는 이유는 Object.keys(transObj) 여기에 들어가는 즉, 객체에 들어가는 키는 모두 문자열로 변환되기 때문인듯 싶다.
그래서 숫자도 문자열로 바뀌어 키가 들어가는데, 헬프데스크에 좀전 답변을 받은 상황에서 내일 다시 트라이 해보려 한다.
