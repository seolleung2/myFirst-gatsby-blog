---
title: 🐬MySQL - 소크라티브로 복습하는 블로그
date: 2021-01-13 22:30:00
category: development
draft: false
---

## 🐼먼저 예제의 테이블을 모조리 만들어 보자.

### 🕹create database test;

test 라는 이름을 가진 데이터 베이스를 만들었다.

show databases; 로 모든 데이터 베이스의 목록을 확인할 수 있다.

### 🕹use test;

test 데이터 베이스 사용 하기

아직은 테이블이 없는 Empty set 이다.

### 🕹create table 하기

```sql
create table users
    (id INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    Hobby VARCHAR(100) NOT NULL,
    Age INT(10),
    PRIMARY KEY(id));
Query OK, 0 rows affected, 2 warnings (0.06 sec)
```

오 뭐가 만들어 졌을까? show tables; 로 확인해 보자.

```sql
mysql> show tables;
+----------------+
| Tables_in_test |
+----------------+
| users          |
+----------------+
1 row in set (0.00 sec)
```

users 내 테이블은 어떻게 구성되는지 좀 더 구체적으로 확인해 보자.

```sql
mysql> describe users;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int          | NO   | PRI | NULL    | auto_increment |
| name  | varchar(100) | NO   |     | NULL    |                |
| Hobby | varchar(100) | NO   |     | NULL    |                |
| Age   | int          | YES  |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
4 rows in set (0.01 sec)
```

테이블을 잘 생성한 것 같다.

하지만 users 테이블에는 아직 user 들이 없으므로 넣어본다.

### 🕹INSERT INTO 로 테이블에 값 넣기

```sql
mysql> INSERT INTO users(name,Hobby,Age) VALUES('Alice','programming',32);
Query OK, 1 row affected (0.02 sec)

mysql> INSERT INTO users(name,Hobby,Age) VALUES('Bob','gaming',16);
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO users(name,Hobby,Age) VALUES('Carl','running',8);
Query OK, 1 row affected (0.00 sec)
```

오호 소크라티브 예제와 똑같은 (id 값은 논외로 두자) 테이블을 만들었다.

```sql
mysql> select * from users;
+----+-------+-------------+------+
| id | name  | Hobby       | Age  |
+----+-------+-------------+------+
|  1 | Alice | programming |   32 |
|  2 | Bob   | gaming      |   16 |
|  3 | Carl  | running     |    8 |
+----+-------+-------------+------+
3 rows in set (0.01 sec)
```

이제 문제를 풀어보자.

## 1. SQL 데이터 베이스에 users 테이블이 있다고 가정해봅시다.

이 때, 나이가 21세 미만인 유저들의 모든 칼럼을 결과로 출력하는 SQL Query문을 작성해 주세요.

```sql
mysql> select * from users where Age < 21;
+----+------+---------+------+
| id | name | Hobby   | Age  |
+----+------+---------+------+
|  2 | Bob  | gaming  |   16 |
|  3 | Carl | running |    8 |
+----+------+---------+------+
2 rows in set (0.01 sec)
```

오케이.. 2번 문제로!

## 2. SQL 데이터 베이스에 이미지와 같이 users 테이블과 데이터가 있다고 가정해 봅시다.

이 때, users 테이블에 새로운 유저(user)인 Dog를 추가하는 SQL Query문을 작성해 주세요.

```sql
mysql> INSERT INTO users(name,Hobby,Age) VALUES('Dog','chasing cars',64);
Query OK, 1 row affected (0.00 sec)
```

이제 잘 들어갔는지 확인해 보았다.

```sql
mysql> select * from users;
+----+-------+--------------+------+
| id | name  | Hobby        | Age  |
+----+-------+--------------+------+
|  1 | Alice | programming  |   32 |
|  2 | Bob   | gaming       |   16 |
|  3 | Carl  | running      |    8 |
|  4 | Dog   | chasing cars |   64 |
+----+-------+--------------+------+
4 rows in set (0.00 sec)
```

굿굿 이제 3번 문제로다가~~ 고고씽~~

## 3. SQL 데이터 베이스에 users 테이블과 comments 테이블, 그리고 각 두 테이블에 대한 데이터가 있다고 가정해 봅시다.

유저가 여러개의 comment를 가지는 관계라고 할 때, 이 관계를 만들기 위해서는 어떤 테이블에 어떤 칼럼을 추가 해야할까요??

A : comments 테이블에 user_id 컬럼을 추가합니다.

B : users 테이블에 comment_ids 컬럼을 추가합니다.

C : users와 comments의 join 테이블에 user_id와 comment_id 컬럼을 추가합니다.

해설쓰 - 유저가 여러개의 comment 를 가지는 관계, 즉 유저가 1 이고 comment 입장에서는 M 의 관계, One to Many 의 관계 이다.

그러면 Many 쪽인 comment 에서 각각의 comment 들이 users 테이블로 화살표를 날리므로,

comment 테이블에 users 의 id 를 참조할 수 있도록 user_id 컬럼을 추가해 준다!

4번 문제를 풀기 전에 또 사전 프렙을 해줘야 한다.

### 🕹pets 테이블 만들기 (CREATE TABLE PETS)

```sql
mysql> create table pets (
          id INT(10) NOT NULL AUTO_INCREMENT,
          name VARCHAR(100) NOT NULL,
          PRIMARY KEY(id),
          owner_id int,
          FOREIGN KEY(owner_id) REFERENCES users(id)
       );

Query OK, 0 rows affected, 1 warning (0.03 sec)
```

여차저차 찾아봐서 테이블을 만들면서 유저 입장에서는 펫을 여러 마리? 를 가질 수 있고, 펫 입장에서는 하나의 주인을 바라보므로 유저 1: 펫:M 의 관계라 여겼다.

pets 테이블에 Foreign key 를 물리는 방법을 찾아서 시도해 보았다.

```sql
mysql> describe pets;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| name     | varchar(100) | NO   |     | NULL    |                |
| owner_id | int          | YES  | MUL | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)
```

어? 나는 Foreign Key 를 먹였는데 MUL 은 무슨 뜻일까?

Key가 MUL 인 경우, 열은 주어진 값의 여러 항목이 열 내에서 허용되는 고유하지 않은 인덱스의 첫 번째 열입니다.

Foreign Key 로 잘 연결되었다는 뜻인 걸까?

### 🕹pets 테이블 에 값 넣기 (INSERT INTO)

```sql
mysql> insert into pets(name, owner_id) values('Henry',1);
Query OK, 1 row affected (0.01 sec)

mysql> insert into pets(name, owner_id) values('Fido',2);
Query OK, 1 row affected (0.01 sec)

mysql> insert into pets(name, owner_id) values('Tofu',1);
Query OK, 1 row affected (0.00 sec)

mysql> insert into pets(name) values('Muggles');
Query OK, 1 row affected (0.00 sec)
```

이제 pets 테이블을 만들었고 문제를 풀 준비를 모두 마쳤다.

```sql
mysql> select * from pets;
+----+---------+----------+
| id | name    | owner_id |
+----+---------+----------+
|  1 | Henry   |        1 |
|  2 | Fido    |        2 |
|  3 | Tofu    |        1 |
|  4 | Muggles |     NULL |
+----+---------+----------+
4 rows in set (0.00 sec)
```

## 4. SQL 데이터 베이스 에 이미지와 같이 users 테이블과 pets 테이블, 그리고 각 두 테이블에 대한 데이터가 있다고 가정해봅시다.(여기서 owner_id는 pets 테이블의 Foreign Key 입니다.)

이 때, 최소 하나 이상의 pet을 가진 모든 owner를 선택하는 SQL Query문을 작성해 주세요.

(단, users와 pets 테이블의 모든 칼럼을 선택해야합니다.)

교집합, 즉 INNER JOIN 을 떠올리기가 힘들었던 것 같다.

나는 사실 user LEFT JOIN pets 으로 한 뒤에 WHERE 절로 pets 의 id, name, owner_id 가 NULL 인 것을 제외하려고 했다.

(뭔가 더 어렵게 돌아간 느낌이긴 했다.)

```sql
mysql> select * from users as u inner join pets as p on u.id=p.owner_id;
+----+-------+-------------+------+----+-------+----------+
| id | name  | Hobby       | Age  | id | name  | owner_id |
+----+-------+-------------+------+----+-------+----------+
|  1 | Alice | programming |   32 |  1 | Henry |        1 |
|  1 | Alice | programming |   32 |  3 | Tofu  |        1 |
|  2 | Bob   | gaming      |   16 |  2 | Fido  |        2 |
+----+-------+-------------+------+----+-------+----------+
3 rows in set (0.01 sec)
```

LEFT JOIN 으로 user 를 다 가져오면서 pet 이 없어도 다 null 로 찍히도록 할 수도 있다.

```sql
mysql> SELECT * FROM users LEFT JOIN pets ON users.id=pets.owner_id;
+----+-------+--------------+------+------+-------+----------+
| id | name  | Hobby        | Age  | id   | name  | owner_id |
+----+-------+--------------+------+------+-------+----------+
|  1 | Alice | programming  |   32 |    1 | Henry |        1 |
|  1 | Alice | programming  |   32 |    3 | Tofu  |        1 |
|  2 | Bob   | gaming       |   16 |    2 | Fido  |        2 |
|  3 | Carl  | running      |    8 | NULL | NULL  |     NULL |
|  4 | Dog   | chasing cars |   64 | NULL | NULL  |     NULL |
+----+-------+--------------+------+------+-------+----------+
5 rows in set (0.00 sec)
```

## 5. SQL 데이터베이스에 이미지와 같이 users 테이블과 pets 테이블, 그리고 각 두 테이블에 대한 데이터가 있다고 가정해봅시다.(여기서 owner_id는 pets 테이블의 Foreign Key 입니다.)

이 때, pet의 이름과 owner의 이름을 선택하는 SQL Query문을 작성 해주세요.

(만약, owner가 없더라도, pet은 결과로 출력되도록 해야합니다.)

일단 두 테이블을 띄워 놓고 생각해 본다.

```sql
users table
+----+-------+--------------+------+
| id | name  | Hobby        | Age  |
+----+-------+--------------+------+
|  1 | Alice | programming  |   32 |
|  2 | Bob   | gaming       |   16 |
|  3 | Carl  | running      |    8 |
|  4 | Dog   | chasing cars |   64 |
+----+-------+--------------+------+

pets table
+----+---------+----------+
| id | name    | owner_id |
+----+---------+----------+
|  1 | Henry   |        1 |
|  2 | Fido    |        2 |
|  3 | Tofu    |        1 |
|  4 | Muggles |     NULL |
+----+---------+----------+
```

만약, owner가 없더라도, pet은 결과로 출력되도록 해야 합니다.

이 문구가 거의 결정타 급이다.

모든 pets 를 결과로 출력되도록 하려면 일단 기준이 되어야 한다. 그 말인 즉슨 LEFT JOIN 을 한다면 왼쪽에서 pets 이 엣헴 하고 있어야 한다는 의미이다.

```sql
mysql> select p.name, u.name from pets AS p LEFT JOIN users AS u ON p.owner_id=u.id;
+---------+-------+
| name    | name  |
+---------+-------+
| Henry   | Alice |
| Fido    | Bob   |
| Tofu    | Alice |
| Muggles | NULL  |
+---------+-------+
4 rows in set (0.00 sec)
```

왼쪽에 pet 이름은 모두 출력되었고 오른쪽의 pet 이 있는 users 이름들이 출력된다.

하지만 주인이 없는 길거리(?) 펫이 있다..

## 6. users 테이블과 foods 테이블이 있다고 가정해봅시다.

유저가 좋아하는 수 만큼의 음식들을 선택할 수 있다고 할 때,

이러한 관계에 맞게 데이터를 저장하기 위해서는 어떤 테이블에 어떤 칼럼을 추가해야 할까요?

A : foods 테이블에 user_id 칼럼을 추가합니다

B : users 테이블에 food_ids 칼럼을 추가합니다

C : users 테이블과 foods 테이블의 join 테이블에 user_id, food_id 칼럼을 추가합니다.

정답은 C, many to many 의 중간 테이블에 user_id, food_id 칼럼을 추가 하는 것을 말하고 있다.

마지막 7번 문제를 위한 전처리를 시작해 본다.

### 🕹foods 테이블 만들기 & 테이블에 값 넣기

```sql
mysql> create table foods(
    -> id INT(10) NOT NULL AUTO_INCREMENT,
    -> name VARCHAR(100) NOT NULL,
    -> PRIMARY KEY(id)
    -> );

mysql> insert into foods(name) values('apple');
Query OK, 1 row affected (0.01 sec)

mysql> insert into foods(name) values('orange');
Query OK, 1 row affected (0.00 sec)

mysql> insert into foods(name) values('pear');
Query OK, 1 row affected (0.01 sec)
```

음 이제 foods 테이블이 완성되었다.

```sql
mysql> select * from foods;
+----+--------+
| id | name   |
+----+--------+
|  1 | apple  |
|  2 | orange |
|  3 | pear   |
+----+--------+
3 rows in set (0.00 sec)
```

### 🕹users 와 foods 의 중간 테이블 만들기

중간 테이블 만드는 방법을 찾아 보았다.

https://medium.com/@emekadc/how-to-implement-one-to-one-one-to-many-and-many-to-many-relationships-when-designing-a-database-9da2de684710

```sql
mysql> create table favorite_foods(
    -> usersID INT(10) NOT NULL,
    -> foodsID INT(10) NOT NULL,
    -> FOREIGN KEY(usersID) REFERENCES users(id),
    -> FOREIGN KEY(foodsID) REFERENCES foods(id),
    -> UNIQUE(usersID, foodsID)
    -> );
Query OK, 0 rows affected, 2 warnings (0.06 sec)
```

중간 테이블에서 각각의 테이블을 바라볼 usersID, foodsID 를 만들고 FOREIGN KEY 로 users 의 id 와 foods 의 id 를 참조하게 했다.

```sql
mysql> insert into favorite_foods(usersID, foodsID) values(1, 2);
Query OK, 1 row affected (0.00 sec)

mysql> insert into favorite_foods(usersID, foodsID) values(2, 2);
Query OK, 1 row affected (0.01 sec)

mysql> insert into favorite_foods(usersID, foodsID) values(2, 3);
Query OK, 1 row affected (0.01 sec)

mysql> insert into favorite_foods(usersID, foodsID) values(2, 1);
Query OK, 1 row affected (0.00 sec)

mysql> select * from favorite_foods;
+---------+---------+
| usersID | foodsID |
+---------+---------+
|       2 |       1 |
|       1 |       2 |
|       2 |       2 |
|       2 |       3 |
+---------+---------+
4 rows in set (0.00 sec)
```

이제 문제를 풀러 가보자.

## 7. SQL 데이터 베이스에 이미지와 같이 users 테이블과 foods 테이블과 favorite_foods 테이블, 그리고 각 테이블에 대한 데이터가 있다고 가정해 봅시다.

이 때, 모든 유저와 그들이 좋아하는 음식들을 선택하는 SQL Query문을 작성하세요.

(만약, 유저가 좋아하는 음식이 없더라도, 결과에 나타나야합니다.)

모든 테이블을 다 꺼내놓고 생각한다.

```sql
mysql> select * from users;
+----+-------+--------------+------+
| id | name  | Hobby        | Age  |
+----+-------+--------------+------+
|  1 | Alice | programming  |   32 |
|  2 | Bob   | gaming       |   16 |
|  3 | Carl  | running      |    8 |
|  4 | Dog   | chasing cars |   64 |
+----+-------+--------------+------+

mysql> select * from favorite_foods;
+---------+---------+
| usersID | foodsID |
+---------+---------+
|       2 |       1 |
|       1 |       2 |
|       2 |       2 |
|       2 |       3 |
+---------+---------+

mysql> select * from foods;
+----+--------+
| id | name   |
+----+--------+
|  1 | apple  |
|  2 | orange |
|  3 | pear   |
+----+--------+
```

SELECT 부분에 결과적으로 내가 얻고자 하는 값들을 (컬럼) 나열해주고 FROM 오른쪽 부터 기준이 되는 users 부터 LEFT JOIN 해서

중간 테이블이 말그대로 중간 다리가 되어서 JOIN 이 된 결과에 foods 를 다시 LEFT JOIN 을 하는 그림이다.

```sql
mysql> select u.id, u.name, f.name FROM users AS u LEFT JOIN favorite_foods AS ff
ON u.id=ff.usersID LEFT JOIN foods AS f ON ff.foodsID = f.id;

+----+-------+--------+
| id | name  | name   |
+----+-------+--------+
|  1 | Alice | orange |
|  2 | Bob   | apple  |
|  2 | Bob   | orange |
|  2 | Bob   | pear   |
|  3 | Carl  | NULL   |
|  4 | Dog   | NULL   |
+----+-------+--------+

6 rows in set (0.00 sec)
```
