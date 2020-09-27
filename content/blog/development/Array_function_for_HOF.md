---
title: 10 Array Functions for HOF🍺
date: 2020-09-28 00:50:00
category: development
draft: false
---

## 1. 고차 함수🤬

구글 캘린더에 이틀 전 금요일 캘린더의 내용은 고차 함수를 가리키고 있었다.
그리고 멘탈이 탈탈 털려버렸다. 페어 프로그래밍인데 내가 페어님에게 전혀 도움을 드리지 못할 뿐더러 하나도 이해가 되지 않더라.
주말에 공부해 보자 하면서도 속상해했다.

## 2. 사전 학습 - 먼저 알아야 좋은 것들🌻

오늘 한 2시 반 부터 학습다운 학습을 시작했다.
나의 페어님께서 점심시간 때쯤 '드림코딩 엘리' 라는 유튜버님의 강의를 들을 것을 추천해 주셨다.

https://www.youtube.com/watch?v=3CUjtKJ7PJg&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=9

유용한 10가지 배열 함수들에 관하여 배운다는 제목을 가지고 있었는데 웬지 느낌상 처음부터 봐야 영상을 제대로 이해할 수 있겠다 싶어 앞전의 8개 강의를 모조리 들어버렸다.
![](./images/arr_func/dream_coding.jpeg)

결론은 모조리 들어버린게 복습 뿐만 아니라 본게임을 더 제대로 잘 이해할 수 있게 되어버렸다. 그러면서 알게 된 사항을 남겨봤다.

1. Rest Paramenters

마침 Koans-08 주제가 Rest Paramenters 관한 거이기도 했고 복습하는 과정에서 딱 그거만 남겨둔 상태였다. 그래서 다시 풀어봤다. 매우 도움이 되었다.

2. 함수 표현식과 함수 선언식의 차이

- 함수 표현식은 익명 함수를 변수에 할당한다. 그리고 나서 다음 줄에 호출이 가능하다.
- 함수 선언식은 함수를 선언하기 이전에서 호출이 가능하다. (함수 호이스팅이 가능하다)
- 콜백 함수는 함수 표현식을 사용하고 익명함수가 변수에 할당되는데 네임드 펑션은 디버깅 또는 함수 내에서 자신 스스로를 호출할 때 사용 (이건아직 ㅠ)

함수 선언식을 사용하는데만 익숙해져 있는데 표현식을 조금 더 적극적으로 콘솔에 테스트하기 시작했다.

3. Arrow Function

금요일날 페어님에게 듣기는 했는데 이게 뭔가 싶었는데 오늘 알게 되고나니 정말 편리한 거였구나 싶다.

```js
const simplePrint = function() {
  console.log('simplePrint')
}
```

이 함수 표현식을 한 줄로 표현이 가능하다. Arrow Function 으로..
쉽게! 말하면 function 글자하고 curly bracket 부분만을 날려 버리는 거다. 대신 => 요런 기호를 써주는데,

```js
const simplePrint = () => console.log('simplePrint')
```

=> 이 화살표 다음에 오는 거는 리턴 값이 거의 유력하다.

한번 더 예를 들어보면,

```js
const add = function(a, b) {
  return a + b
}
```

이 함수 표현식을, 화살표 함수를 적용하면

```js
const add = (a, b) => a + b
```

이렇듯 간결하게 쓸 수 있고 함수형 프로그래밍 작성 시 더 빛을 발한다고 한다.
물론 이거 알게 된 시점에는 진짜 본론인 배열 함수를 아는데 뭐 중요하냐 대수롭지 않게 여겼다.

무튼 함수 안에서 더 많은 작업을 처리하고자 할 때 bracket 을 넣어 arrow 와 같이 쓸 수도 있다.
이때는 bracket 과 return 을 표기해 줘야 한다.

```js
const simpleMultiply = (a, b) => {
  // do something more
  return a * b
}
```

내 생각엔 화살표 함수를 알고 넘어가면 효과가 백만점이다.

4. 반복문의 세 가지 형태

일반적인 반복문의 형태는 공부하는 입장에서 너무나 잘 알고 있다. 그럼 나머지 두개는 뭘까?

```js
let fruits = ['🍎', '🍇', '🍌', '🍉', '🍋']

// for of 구문
for (let fruit of fruits) {
  console.log(fruit)
}

// 대망의 forEach, 배열 내 값마다 정해진 action (콜백함수)을 수행하는 함수
fruits.forEach(function(fruit, index, array) {
  console.log(fruit, index, array) // array 는 보통 안받아온다.
})

// 익명함수는 arrow function 을 쓸 수 있다고 배웠다!
fruits.forEach(fruit => console.log(fruit)) // 배열 내 value 들 마다 내가 전달한 함수를 출력하는구나!
```

앞선 강의를 들으면서 삼항 연산자 에 대해서도 좀 더 정확히 알게 되었는데 이거는 Array Function 을 알기 위해서 필수는 아니다.

근데 다시 한번 말하지만 화살표 함수가 대박이다. 이런게 있었나..

## 3. 10 Array Functions for HOF🍺

부제는 모르면 후회하는 배열 함수 10가지 인데, 영상을 멈춰 놓고 스스로 찾아서 먼저 풀고 영상을 보면서 공부해보니
금요일날 멘탈이 털렸던 이유를 절실히 깨닫게 해주었다.

문제를 아이패드 노타빌리티로 옮긴다음, 빈 콘솔 창을 하나 열고 하나씩 풀었다.
필기도 하면 손에서 적는 내용이 뇌로 전달되는거 같아서 (뇌이징).. 필기도..

![](./images/arr_func/writeonipad.jpeg)

#### ⚠️주의! 아래 내용을 직접 해보고 싶은 분들은 너무 유심히 보면 안된다!

https://youtu.be/3CUjtKJ7PJg
링크는 위에~

### 3-1. make a string out of an array

주어진 배열을 string 으로 변환한다. 배열.join() 함수를 사용한다.

```js
{
  const fruits = ['apple', 'banana', 'orange']
  fruits.join('. ')
  ;('apple, banana, orange')
}
```

join api 를 사용하면 배열 형태를 문자열로 바꿔 주는데 주의할 점은 fruits 의 배열 형태는 그대로 라는 것이다.

### 3-2. make an array out of a string

이번엔 문자열을 배열로 변환해 본다.

```js
{
  const fruits = '🍎, 🥝, 🍌, 🍒'
  fruits.split(',') // fruits.split() 하면 따옴표가 붙지만 요소가 전체 하나로 취급된다.
  ;['🍎', ' 🥝', ' 🍌', ' 🍒']
  fruits.split(',', 2)
  ;['🍎', ' 🥝'] // limit 인자를 2로 넣어주니 앞에 2개만 반환된다. (optional)
}
```

### 3-3. make this array look like this: [5, 4, 3, 2, 1]

배열을 로꾸거 바꾸는 방식이다. (ㅇㅈㅇㅈ)

```js
{
  const array = [1, 2, 3, 4, 5]
  array.reverse()
  console.log(array)
  ;[5, 4, 3, 2, 1]
}
```

얘는 주의해야 할 게 원본 array 가 뒤집힌 채로 바뀌어 버린다. 리턴도 바뀐 거 자체를 리턴한다.

### 3-4. make new array without the first two elements

배열의 요소 1, 2 를 제외한 나머지를 포함한 새로운 배열 만들기이다.
두가지 방식이 있다.

```js
{
  const array = [1, 2, 3, 4, 5]
  let newArr = array.splice(2)
  console.log(newArr)
  ;[3, 4, 5]
  // array 는 [1, 2] 로 원본이 바뀌어 버린다.
}
```

```js
{
  const array = [1, 2, 3, 4, 5]
  let newArr2 = array.slice(2)
  console.log(newArr)
  ;[3, 4, 5]
  // array 는 [1, 2, 3, 4, 5] 로 원본이 그대로 있다.
}
```

### 5 ~ 10 문제를 풀기 위한 class 와 object 선언

```js
class Student {
  constructor(name, age, enrolled, score) {
    this.name = name
    this.age = age
    this.enrolled = enrolled
    this.score = score
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
]
```

### 3-5. find a student with the score 90

여기서 비로소 그 이야기가 시작된다.

학생의 점수가 90점인 학생 찾기 이다. 처음에 응? 저기있는데? 멍청한 생각을 했다.
여기서 나는 문제의 원래 의도와 다르게 filter 를 검색해 보고 사용하게 되었다.

여기서 화살표 함수가 오지다는 생각을 하게 되었다.

밤이 어두워 집에 가려고 했는데 뭔가 되는 거 같애서 좋았다.

```js
const result = students.filter(student => student.score === 90);
console.log(result);
[Student]
0: Student {name: "C", age: 30, enrolled: true, score: 90}
length: 1
__proto__: Array(0)
```

이 방법도 좋았지만 영상에서 드림코딩 엘리 선생님께서 find 함수에 대해 알려 주셨다.

```js
const result = students.find(function(student) {
  return student.score === 90 // .find 의 콜백함수는 Boolean 을 리턴한다.
}) // 콜백함수를 통해 학생의 요소 하나하나를 돌면서 조건이 true 때까지 찾는다.
// 찾으면 (true 가 리턴될 때), find 함수가 멈추고 해당 조건의 student 가 리턴된다.
```

마찬가지로 화살표 함수로 한 줄로 표현이 된다!

```js
const result = students.find(student => student.score === 90)
```

화살표 함수 너무 좋다!😍

### 3-6. make an array of enrolled students

학생들 중 수업에 등록한 (enrolled) 학생들만 골라내 본다. 여기서 filter 함수를 적용했다.

```js
const result = students.filter(student => student.enrolled === true);
console.log(result);

(3) [Student, Student, Student]
0: Student {name: "A", age: 29, enrolled: true, score: 45}
1: Student {name: "C", age: 30, enrolled: true, score: 90}
2: Student {name: "E", age: 18, enrolled: true, score: 88}
length: 3
__proto__: Array(0)
```

배열 세 개가 튀어나오고, student.enrolled 의 값이 true 인 것들을 확인할 수 있다.
const result = students.filter(student => student.enrolled);
true 를 굳이 적지 않아도 되었다.

### 3-7. make an array containing only the students' scores

// result should be: [45, 80, 90, 66, 88]

학생들의 점수만 쏙쏙 뽑아온 배열을 만드는 것이다. 여기에서 난 금요일 슬랙에서 공유된 사진 한장이 떠올랐다.

![](./images/arr_func/map_filter_reduce.jpg)

쏙쏙 뽑아온 배열을 만든다.. 만든다.. 가공한다.. 그렇다! map!

```js
const result = students.map(student => student.score);
console.log(result);
(5) [45, 80, 90, 66, 88]
0: 45
1: 80
2: 90
3: 66
4: 88
length: 5
__proto__: Array(0)
```

map 은 그러니까 배열 안에 있는 요소 한가지 한가지를 다른 것으로 변환 (mapping) 시켜 준다.
즉 콜백함수를 통해 가공되는 것이다.

### 3-8. check if there is a student with the score lower than 50

학생들의 점수가 50점 보다 아래인 학생이 있는지, 있으면 true 를 리턴하게 하기 이다.

나는 아까 했던 .find 를 써서,

```js
let result = students.find(student => student.score < 50)
console.log(result);
Student {name: "A", age: 29, enrolled: true, score: 45}
```

드림코딩엘리 선생님은 some 이란 새로운 함수를 알려주셨다.

```js
let result = students.some(student => student.score < 50)
console.log(result)
true
```

위처럼 .some 을 사용하면 student 요소를 하나씩 돌면서 하나라도 조건에 만족하는 요소가 있으면 true 를 리턴한다.

반대는 .every 가 있다.

```js
let result = students.every(student => student.score < 50)
console.log(result)
false
```

위의 every 는 모든 student 요소가 조건에 만족해야 true 를 리턴한다.

### 3-9. compute students' average score

학생들의 점수를 가져와 평균 점수 구해오기 이다.
이건 첫번째로 점수만을 쏙쏙 뽑아 '재가공' 된 배열을 가져오는게 먼저이다.

```js
let scoreOfStudents = students.map(student => student.score)
// 학생들의 점수만 뽑아온 요소가 배열에 실려 scoreOfStudents 변수에 담겼다.
```

이제 reduce() 함수를 사용할 차례다.
영상을 멈춰 놓고 찾아봤는데 mdn 의 사용법이 약간 어렵게 느껴져서 예시를 참고할 만한 블로그를 찾아보고 그거대로 콘솔에 옮겨봤다.

```js
let scoreOfStudents = students.map(student => student.score)
let result = scoreOfStudents.reduce((acc, curr) => acc + curr) / students.length
console.log(result)
// acc 는 이전의 값(축적되는 값), curr 는 반복을 도는 현재 student 의 요소, 아래처럼 시작지점을 0으로 표시해줄 수 있다.
// scoreOfStudents.reduce((acc, curr) => (acc + curr), 0) / students.length
73.8
```

배열의 요소들을 모아 누적해 놓을 때 사용한다고 한다.

### 3-10. make a string containing all the scores

// result should be: '45, 80, 90, 66, 88'
학생들의 모든 점수를 문자열로 변환하기 이다.

```js
let scoreOfStudents = students.map(student => student.score)
// map 과 join 사이에 filter 를 써서 점수가 50점 이상인 애들만 추려낼 수도 있다.
let result = scoreOfStudents.join(', ')
```

### 3-11. Bonus Q10 sorted in ascending order

// result should be: '45, 66, 80, 88, 90'
학생들의 점수를 낮은 순서대로 정렬한 뒤, 문자열로 변환하기 이다.

```js
let scoreOfStudents = students.map(student => student.score)
let sortBy = scoreOfStudents.sort((a, b) => a - b)
console.log(sortBy)
;(5)[(45, 66, 80, 88, 90)]

sortBy.join(', ')
;('45, 66, 80, 88, 90')
```

## 4. 느낀 점

![](./images/arr_func/arr.func1.jpeg)
![](./images/arr_func/arr.func2.jpeg)

손으로 아이패드에 필기도 해보고, 콘솔창에 찍어 보기도 하면서 유튜브에서 강의를 듣게 되기 전과 많이 달라진 거 같다.
일단 이러한 영상을 볼 수 있게 도와준 나의 페어님 (재홍님) 에게 진심 감사하다.

그리고 드림코딩 엘리 님의 팬이 되어 버렸다.

아직 코플잇 문제는 풀지 못했지만 추석 때 뭔가 해볼 수 있을 거 같다는 자신감이 생겼다.
