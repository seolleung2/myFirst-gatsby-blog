---
title: 🐬My SQL Commands
date: 2020-12-03 19:30:00
category: development
draft: false
---

## 1. 데이터 베이스 전체 목록 확인하기

```js
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| noticeboard        |
| performance_schema |
| sys                |
+--------------------+
```

## 2. 데이터 베이스 만들기

```js
mysql> CREATE DATABASE AmongUS;
Query OK, 1 row affected (0.02 sec)

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| AmongUS            |
| information_schema |
| mysql              |
| noticeboard        |
| performance_schema |
| sys                |
+--------------------+
```

## 3. AmongUs 데이터 베이스 사용하기

```js
mysql> USE AmongUS;
Database changed
mysql> SHOW TABLES;
Empty set (0.00 sec)
```

AmongUs 데이터 베이스에는 아직 테이블이 없다.

AmongUs 게임을 즐기는 사용자들의 정보를 담은 테이블을 만들어 보자.

![](https://www.somagnews.com/wp-content/uploads/2020/09/1599647767_244123_1599647831_noticia_normal.jpg)

## 4. 데이터베이스 내 테이블 만들기 (CREATE)

CREATE TABLE 테이블명 (column1 - property, col2, col3, .....)

```js
mysql> CREATE TABLE user(
    -> id INT(11) NOT NULL AUTO_INCREMENT,
    -> username VARCHAR(100) NOT NULL,
    -> color VARCHAR(100) NOT NULL,
    -> description TEXT NULL,
    -> PRIMARY KEY(id));
Query OK, 0 rows affected, 1 warning (0.04 sec)
```

id, username, color, description 그리고 id 를 Pm 키로 하는 컬럼 들을 생성해 주었다.

## 5. 데이터베이스 내 테이블 목록을 확인하기

SHOW TABLES; 라는 커맨드를 입력한다.

```js
mysql> SHOW TABLES;
+-------------------+
| Tables_in_amongus |
+-------------------+
| user              |
+-------------------+
1 row in set (0.01 sec)
```

## 6. 테이블에 값 넣어보기.

아직 빈 테이블이므로 값을 넣어보자.

```js
mysql> INSERT INTO user (id, username, color, description)
    -> VALUES(1, 'mooks', 'rainbow', 'AmongUS Love');
Query OK, 1 row affected (0.01 sec)
```

오호.. 이제 user 라는 테이블을 확인해 보자.

## 7. 테이블 조회하기 (READ)

6번 과정을 2번 더 진행했다.

```js
mysql> SELECT * FROM user;
+----+--------------------+---------+-----------------------+
| id | username           | color   | description           |
+----+--------------------+---------+-----------------------+
|  1 | mooks              | rainbow | AmongUS Love          |
|  2 | younJi             | blue    | Learning SQL is Happy |
|  3 | ANONYMOUS CREWMATE | RED     | CATCH ME IF U CAN     |
+----+--------------------+---------+-----------------------+
3 rows in set (0.00 sec)
```

## 8. 테이블 명 바꾸기

user 라는 테이블명이 명확하지 않아 보인다.

ALTER TABLE user RENAME AmongUsUser; 명령어로

테이블명을 user 에서 AmongUsUser 로 바꾼다.

```js
mysql> ALTER TABLE user RENAME AmongUsUser;
Query OK, 0 rows affected (0.02 sec)

mysql> SELECT * FROM user;
ERROR 1146 (42S02): Table 'amongus.user' doesn't exist
mysql> SELECT * FROM AmongUsUser;
+----+--------------------+---------+-----------------------+
| id | username           | color   | description           |
+----+--------------------+---------+-----------------------+
|  1 | mooks              | rainbow | AmongUS Love          |
|  2 | younJi             | blue    | Learning SQL is Happy |
|  3 | ANONYMOUS CREWMATE | RED     | CATCH ME IF U CAN     |
+----+--------------------+---------+-----------------------+
3 rows in set (0.00 sec)
```

이제 그러면 더 이상 user 라는 테이블 명은 사용했다간 위처럼 에러 메시지를 보여준다.

테이블에 '좋아하는 음식' 에 대한 컬럼을 넣어주고 싶어졌다.

## 9. 기존 테이블에 컬럼 추가하기

```js
mysql> ALTER TABLE AmongUsUser ADD favourite_food varchar(300);
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM AmongUsUser;
+----+--------------------+---------+-----------------------+----------------+
| id | username           | color   | description           | favourite_food |
+----+--------------------+---------+-----------------------+----------------+
|  1 | mooks              | rainbow | AmongUS Love          | NULL           |
|  2 | younJi             | blue    | Learning SQL is Happy | NULL           |
|  3 | ANONYMOUS CREWMATE | RED     | CATCH ME IF U CAN     | NULL           |
+----+--------------------+---------+-----------------------+----------------+
3 rows in set (0.00 sec)
```

## 10. 테이블 내 값 UPDATE 하기

color 를 GREEN 으로 업데이트 한다. WHERE 하위에 조건을 만족하는 row 를.

```js
mysql> UPDATE AmongUsUser SET color="GREEN" WHERE id=1;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM AmongUsUser;
+----+--------------------+-------+-----------------------+----------------+
| id | username           | color | description           | favourite_food |
+----+--------------------+-------+-----------------------+----------------+
|  1 | mooks              | GREEN | AmongUS Love          | NULL           |
|  2 | younJi             | blue  | Learning SQL is Happy | NULL           |
|  3 | ANONYMOUS CREWMATE | RED   | CATCH ME IF U CAN     | NULL           |
+----+--------------------+-------+-----------------------+----------------+
3 rows in set (0.00 sec)
```

확인해보니 정말 id 가 1인 row 의 color 가 rainbow 에서 "GREEN" 으로 바뀌어져 있다.

## 11. 원하는 조건의 row 를 지우기 (DELETE)

```js
mysql> SELECT * FROM AmongUsUser;
+----+--------------------+--------+-------------------------+---------------------+
| id | username           | color  | description             | favourite_food      |
+----+--------------------+--------+-------------------------+---------------------+
|  1 | mooks              | GREEN  | AmongUS Love            | NULL                |
|  2 | younJi             | blue   | Learning SQL is Happy   | NULL                |
|  3 | ANONYMOUS CREWMATE | RED    | CATCH ME IF U CAN       | NULL                |
|  4 | ANONYMOUS Hacker   | Orange | 코딩마렵다              | 오뚜기 신라면       |
|  5 | Nomad Coder        | BLACK  | Welcome to Nomad Coder! | Kimchi              |
+----+--------------------+--------+-------------------------+---------------------+
5 rows in set (0.00 sec)
```

id 가 1인 row 를 지우기로 마음먹었다.

```js
mysql> DELETE FROM AmongUsUser WHERE id=1;
Query OK, 1 row affected (0.00 sec)

mysql> SELECT * FROM AmongUsUser;
+----+--------------------+--------+-------------------------+---------------------+
| id | username           | color  | description             | favourite_food      |
+----+--------------------+--------+-------------------------+---------------------+
|  2 | younJi             | blue   | Learning SQL is Happy   | NULL                |
|  3 | ANONYMOUS CREWMATE | RED    | CATCH ME IF U CAN       | NULL                |
|  4 | ANONYMOUS Hacker   | Orange | 코딩마렵다              | 오뚜기 신라면       |
|  5 | Nomad Coder        | BLACK  | Welcome to Nomad Coder! | Kimchi              |
+----+--------------------+--------+-------------------------+---------------------+
4 rows in set (0.00 sec)
```

id 는 고유한 값이기 때문에 id = 1 인 row 가 지워졌다 해서 위로 당겨 올라가지 않고 위와 같은 상태라는 점을 유의해야 할 것 같다.
