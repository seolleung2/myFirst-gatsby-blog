---
title: "Rainy day\U0001F611."
date: 2020-08-29 12:00:00
category: my_diary
thumbnail: { thumbnailSrc }
draft: false
---

## 1. 오늘의 날씨🌧

- 비가 온다. 코로나로 인해 사회적 거리두기가 2.5단계로 올라 섰다.
- 그래서 요새 어디 나가기도 무섭다.🥵

## 2. 코로나가 바꾼 일상🤦🏻‍♂️

![](https://dimg.donga.com/wps/NEWS/IMAGE/2020/08/25/102635619.1.jpg)
몇 달 전에는 마스크도 주마다 구매할 수 있는 횟수와 양이 정해져 있었다. KF94 마스크가 품귀 현상을 겪기도 했었는데, 어느 정도 감염자 수가 줄어들어 완화되면서 마스크도 약국에서 내가 원할 때마다 구매할 수 있게 바뀌었지만 이제 또 어떻게 될지 모르는 바이다.

그래서 홈쇼핑으로 마스크를 50개 구매해 놓고 건강해지기 위한 약도 꼬박꼬박 챙겨 먹고 있다.

공부를 열심히 잘 하려 한들 몸이 망가지면 더 손해이기 때문이다.🥶

## 3. 사실 블로그가 잘 써지는 지 테스트하는 글😜

벨로그의 마크다운 그대로 적용이 되는건가?
예로 장고의 모델 확장 방법을 적어 보자.

1. Proxy Model: 기존의 User 모델을 그대로 사용하되, 일부 동작을 변경하는데만 사용
2. User Profile: 하나의 새로운 모델을 정의한 후, User 모델과 1:1 관계설정(프로필 모델 참조)
3. AbstractBaseUser: 완전한 새로운 User 모델을 만들때 사용
4. AbstractUser: 기존의 User 모델을 사용하되, 추가적인 정보를 더 넣고 싶을 때 사용. 2번 방법은 추가로 클래스를 생성하지만, 이 방법의 경우 추가로 클래스를 생성하지는 않음.

여기서 네 번째 방법을 사용했다.

https://docs.djangoproject.com/en/3.0/topics/auth/customizing/

https://yonghyunlee.gitlab.io/python/user-extend/

https://tothefullest08.github.io/django/2019/06/21/Django26_relations5_ManyToMany_follow/

## 4. config/settings.py

```py
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

PROJECT_APPS = [
    "users.apps.UsersConfig",
]

INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS
```

맨 아래에 다음과 같이 입력한다.

```py
AUTH_USER_MODEL = "users.User"
```

users/models.py 내 AbstractUser를 상속받은 User 모델을 새로 만들었으므로, 이 모델을 유저모델로 사용하기 위해 settings.py 내 추가 설정함.

유저모델을 변경하였으므로, DB & migration 파일을 삭제 하여 갈아엎은 후, 마이그레이션 재설정
