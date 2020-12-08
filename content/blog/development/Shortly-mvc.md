---
title: Shortly MVC pattern(1)
date: 2020-12-08 17:00:00
category: development
draft: false
---

## 1. Sequelize 설치

https://sequelize.org/

```js
npm install --save sequelize
```

## 2. Sequelize CLI 설치

마이그레이션을 할 수 있도록 돕는 툴이고 CLI 에서 모델을 생성해주거나, 스키마 적용을 할 수 있도록 돕는다고 한다.

```js
npm install --save-dev sequelize-cli
```

## 3. 프로젝트 초기 단계를 자동으로 설정하는 bootstraping

```js
npx sequelize-cli init
```

이 명령어를 통해 아래와 같은 폴더들이 생성된다.

- config, contains config file, which tells CLI how to connect with database

- models, contains all models for your project

- migrations, contains all migration files

- seeders, contains all seed files

https://sequelize.org/master/manual/migrations.html

## 4. MySQL 접속 설정하기

config/config.json 을 확인해보면 아래 코드와 같다.

그중 development 의 password 와 database 를 수정해 주었다.

database 는 스프린트에 쓰일 새로운 데이터 베이스를 생성해 주면 된다.

```js
{
  "development": {
    "username": "root",
    "password": "****",
    "database": "prac_mvc",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

개발 환경, 테스트 환경, 각각의 환경에 따라 다른 host 와 패스워드 등을 사용하기 때문에 환경을 세가지로 나눈다고 한다.

models/index.js 에서만 보더라도

```js
const env = process.env.NODE_ENV || 'development'
```

'development' 가 기본 환경으로 설정되어 있음을 확인할 수 있다.

## 5. 모델 생성하기

```js
npx sequelize-cli model:generate --name url --attributes url:string,title:string,visits:integer
```

모델 (테이블의 이름) 이름은 url 로 지었는데 이렇게 하면 자동적으로 s 를 붙여 복수형으로 바꿔 준다.

그리고 attributes 에 들어가야 할 칼럼인 url, title, visits 와 해당 컬럼의 타입을 적어주고 생성한다.

## 6. 컬럼의 기본값 설정하기

visits 의 기본값을 0으로 설정하고 싶다.

첫번째로 url.js 내에서는

```js
url.init(
  {
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    visits: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: 'url',
  }
)
```

두번째로 migrations/20201208XXXXXXXX-create-url.js 에서는

```js
visits: {
  type: Sequelize.INTEGER,
  defaultValue: 0,
},
```

이렇게 하면 ORM 과 SCHEMA 모두에 visits 의 기본값이 0으로 반영된다.

## 7. 마이그레이션 하기

수정사항을 반영하기 위해서는 마이그레이션을 해줘야 한다.

```js
npx sequelize-cli db:migrate
```

이제 MySQL 데이터 베이스에서 describe urls 를 통해 컬럼들이 제대로 들어왔는지 확인할 수 있다.

그런데 마이그레이션을 다 해놓고서 뭔가 수정을 해야 할 때가 있다.

코드를 수정하고 저장하면 되지 않을까 싶은데 반영이 되지 않았다.

이때는

마이그레이션 취소 - (코드)수정하기 - 마이그레이션 하기

의 과정을 거쳐야 한다.

## 8. 마이그레이션 취소하기

You can use db:migrate:undo, this command will revert most recent migration.

```js
npx sequelize-cli db:migrate:undo
```

You can revert back to initial state by undoing all migrations with

```js
db: migrate: undo: all
```

command.

You can also revert back to a specific migration by passing its name in --to option.

```js
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```
