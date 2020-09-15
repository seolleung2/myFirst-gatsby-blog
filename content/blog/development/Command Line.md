---
title: Command Line (CLI)
date: 2020-09-15 10:10:00
category: development
draft: false
---

## 1. 개발자 도구 설치

- vscode 설치 및 git 설치

- git 설치는 macos 터미널 bash 에서 git 이라 입력하고 엔터

## 2. Lesson : Command Line (CLI)

Graphic User Interface (GUI) 와 배치되는 의미인 듯

표준 입출력 시스템을 통한 입력과 그에 따른 출력. 빠르고 강력하며 접근성이 좋다고 함.

## 3. Useful command 1

- ls
  : list 라는 의미 (일반적 gui 환경에서는 폴더 클릭으로 접근할 수 있다)

- ls -al
  : list 의 detail 한 정보에 접근하기 (숨김 파일이나 파일의 크기, 소유자, 생성일 등)

- cd
  : 디렉토리(/) 로 이동. 가령 cd Downloads

- pwd
  : 현재 디렉토리의 경로 (full path) 가 출력됨

### 3-1. cd 에 대해서 1

- cd ~
  : 물결.. 홈 디렉토리로 이동된다.

- cd /
  : 시스템의 최상위 디렉토리 (root) 로 이동한다.

### 3-2. cd 에 대해서 2 (절대 경로와 상대 경로에 대한 내용)

- cd/Users/seolleung2/Downloads
  : 한번에 이동하기. 절대 경로를 의미하는 듯 하다. / 를 사용해서 디렉토리를 연달아 입력했다.

- cd .
  : 햔제 디렉토리 이동 (하지만 아무일도 일어나지 않는다)

- cd ..
  : 현재 디렉토리에서 바로 위 상위 디렉토리로 이동

### 3-3. cd 에 대해서 3 (공백을 포함하는 폴더에 CLI 로 접근하기)

```js
cd My documents
>> "No such file or directory" 라 뜬다.

cd My 쓰고 tab 키를 누르면 자동 완성이 된다.
>> cd My\ Documents/
```

### 3-4. 콘솔 내용 다 지우기

- clear

## 4. Useful command 2

- touch [file_name] : ex) touch newfile.txt
  : 빈 파일 생성하기, 생성 후 ls 를 치면 파일이 보인다.

- mkdir [dir_name] : ex) mkdir newdir
  : 폴더 디렉토리를 생성함

- mv [file_or_dir][target_dir] : ex) mv newfile.txt newdir/
  : 파일 및 디렉토리 옮기기

- mv [file_or_dir][target_file_or_dirname] : ex) mv newfile.txt newname.txt
  : 파일 및 디렉토리 이름 바꾸기

- code newname.txt
  : 파일의 내용을 수정하기 (Code 에디터를 통해서)

- cat newname.txt
  : 파일의 내용을 터미널에서 확인할 수가 있다.

- cp newname.txt ~/Downloads/
  : cd ~/Downloads 를 통해 다운로드 폴더에 newname.txt 파일이 복사된 것을 확인할 수 있다.

### 4-1. 삭제 하는 커맨드에 대해서

rm 명령어는 정말 삭제할 것인지 확인을 하지 않으며 한번 삭제된 파일은 휴지통에 들어가지 않으므로 정말로 굉장히 조심해서 써야 한다고 한다.

- rm newname.txt

- sudo rm -rf /
  : root directory 를 싹다 날리는 (전체 시스템 파일을 지우는) 명령어

## 5. sudo 란?

super user 가 do 한다.
관리자 권한으로 무언가를 실행할 때 사용하는 것.
관리자 권한으로 어떤 파일에 패스워드를 입력해 접근하거나 새로운 프로그램을 설치할 때 (관리자권한을 요구할 때) 사용

### 5-1. sudo 는 모든 문제의 해결책이 아니다.

- 권한 문제를 해결하는 솔루션이 아니라서 필요에 따라 현명하게 사용
  : 가능한 USER 권한으로 해결할 수 있어야 한다.

- sudo 는 한 번만 인증하면 그 이후는 생략한다.

### 5-2. ls -al 로 알아보는 소유자 권한에 대해

![](https://blog.outsider.ne.kr/attach/1/x1034663664.gif.pagespeed.ic.dGD0_gQe9G.png)

- sudo touch testfile.txt 파일 생성
  : 관리자 권한으로 만든 파일, 암호입력 후 생성이 된다. ls -al 을 통해 확인해 보면 sudo 로 만든 이 파일의 소유자는 root 로 되어 있다.

- code testfile.txt
  : 뭔가 내용을 입력하고 저장하려니 failed 창이 뜨면서 'Retry as Admin' 이라며 관리자로 다시 시도해 보라 한다. 즉 관리자 권한이 아니라서 실제 편집이 안된다.

- sudo chown seolleung2:staff testfile.txt 로 소유자 변경하기
  : ls -al 확인을 통해 소유자가 바뀌었고 이제 code testfile.txt 로 파일 내용 수정이 가능해 진다.

- 즉 ls -al 로 확인해 볼수 있듯 파일의 소유자가 누구인지 상당히 중요하다.
  : 리눅스 프로그램 설치시 꼬여서 새 프로그램 설치가 되지 않을 때 특정 폴더를 내 소유로 바꿔줌으로써 문제를 해결할 수 있다.

## 6. GUI 프로그램의 실행을 더 간편하게

- code .

- open .
  : 터미널에서 현재 경로의 폴더를 macOs Finder 에서 보기

## 7. 자주 사용하게 될 CLI 프로그램

- git : 버전 관리

- package manager : 프로그램 추가/ 삭제
  : homebrew

- 텍스트 에디터 : vim
  : 커맨드 라인 상에서 에디터를 열지 않고도 파일을 수정할 수 있다.

- 클라우드 서비스관리 AWS CLI

## 8. brew install neofetch

![](https://www.bleepstatic.com/content/posts/2018/12/14/neofetch-header.jpg)

내 캡처본은 아니지만 brew 를 설치하는 법을 찾아보고 바로 neofetch 를 설치해 봤다.
굳굳!!
