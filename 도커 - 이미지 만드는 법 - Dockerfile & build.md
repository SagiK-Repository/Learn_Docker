문서정보 : 2022.10.03.~04. 작성, 작성자 @SAgiKPJH
<br>

# 도커 : 이미지 만드는 법 - Dockerfile & build

- 사이트 [도커 : 이미지 만드는 법 - Dockerfile & build](https://www.youtube.com/watch?v=0kQC19w0gTI)를 기반으로 작성 되었습니다.

<br>

### 사전 기본 과정

- 도커에 대한 기본적인 지식은 갖고 있어야 한다. (도커가 무엇인지)

<br>

### 수업의 목표

- 도커 파일을 만들어서 이미지를 만드는 빌드 명령 사용법 안다.
- 직접 웹서버 이미지를 만든다.

<br>

## 도커에 대한 중요 개념 - 도커가 동작하는 과정 정리

- 이미지는 Run 명령어를 통해서 컨테이너를 만들고, 그 컨테이너를 수정하면서 여러 작업을 수행한다.
- 이미지를 만들 수 있는 방법은 두 가지가 있다.
  - 첫 번째 방법 : 컨테이너를 대상으로 Commit이라는 명령어로 Image를 만든다.
  - 두 번째 방법 : 도커 파일을 작성 후 Build하여 이미지 파일을 만든다.
  - 공통점 : 이미지를 만드는 명령어라는 점에서 동일하다.
  - 차이점 : Commit은 백업과 같은 느낌이고, Build는 이미지를 구체적으로 생성한다.

<br>

## 이미지 만들기 - 우분투 20.04 이미지 만들기

### 1. 우분투 20.04 버전을 기반으로 컨테이너를 만들어 실행시킨다.

- VScode 내에서 작업공간의 폴더를 열고, TERMINAL에 다음 내용을 입력한다.
- "docker run --name web-server -it ubuntu:20.04" + 엔터
  - 컨테이너 이름 : web-server
  - 쉘에서 여러가지 명령을 실행하기 위해 -it 이라고 지정하였다.
- 이후 우분투 20.04 Image를 다운 및 실행은 한다. (VScode의 도커 확장기능을 통해 Image 및 Container의 상황을 바로 확인할 수 있다.)


<br>

### 2. Commit으로 이미지 만들기 - 실행한 컨테이너를 Commit하여 이미지를 만들어본다.

- 또 한개의 Terminal에서 다음과 같이 입력한다.
  ```bash
  docker commit wev-server web-server-commit
  ```
- "docker images"를 통해 "web-server-commit"이라는 이미지가 만들어졌는지 확인한다.
  ```bash
  REPOSITORY                TAG       IMAGE ID       CREATED          SIZE    
  web-server-commit         latest    f5cf0c110c98   10 seconds ago   72.8MB  
  ubuntu                    20.04     a0ce5a295b63   4 weeks ago      72.8MB  
  ```

<br>


### 3. Build를 통해 이미지 만들기 - Dockerfile을 통해 빌드하여 이미지를 만들어본다.

- VScode에서 폴더에 접속한 뒤, Dockerfile 이라는 파일을 만든다. (도커가 자동으로 인식한다)
- 내용을 다음과 같이 작성한다.
  ```bash
  FROM ubuntu:20.04
  ```
- 이후 Terminal에서 다음과 같이 입력한다.
- ```bash
  docker build -t web-server-build .
  ```  
  - -t : 만들 이미지의 이름(Tag)
  - . : 현재 위치에 있는 Dockerfile을 사용한다는 뜻이다.
- "docker images"를 통해 이미지들을 확인한다.  
  <img src="https://user-images.githubusercontent.com/66783849/193822543-335b324d-dd10-4894-bd0d-ab47d26b28eb.png" width="70%">  
- 다음은 결과창이다.
  ```bash
  REPOSITORY                TAG       IMAGE ID       CREATED         SIZE  
  web-server-commit         latest    f5cf0c110c98   8 minutes ago   72.8MB  
  juhyung1021/test-docker   latest    ff0b6a360a33   12 days ago     120MB  
  fun-docker                latest    ff0b6a360a33   12 days ago     120MB  
  httpd                     latest    f2789344c573   2 weeks ago     145MB  
  web-server-build          latest    653dbc9875f1   4 weeks ago     72.8MB  
  ubuntu                    20.04     a0ce5a295b63   4 weeks ago     72.8MB  
  ```

<br><br>

## python3 웹 서버 이미지 만들기

### 1. 이미지를 Run하여 컨테이너를 실행하고, 접속한다.
   - "docker run --name web-server -it ubuntu:20.04"
   - 정지된 컨테이너를 재개하는 경우
     - "docker start web-server"
     - "docker exec -it web-server /bin/bash" 또는 "/bin/sh"로 실시간 접속한다. (-i : Interactive, -t : tty)

<br>

### 2. python3를 설치한다.
   - "apt update"를 통해 apt를 최신상태로 갱신한다.
   - 업데이트 후 "apt install python3"를 통해 python3를 업데이트한다. (Y를 누르면 패치를 시작한다.)
   - "mkdir -p /var/www/html"를 통해 디렉터리를 만든다.
   - "cd /var/www/html"로 폴더로 이동한다.
   - "echo "Hello, \<strong>Docker\</strong> > index.html"를 입력하여 html 파일을 만든다. ("ls"로 만들어졌는지 확인한다.)
   - "python3 -m http.server"를 통해 python3에 기본 내장되어 있는 서버 실행명령어를 진행한다. (기본 8000번 포트로 할당된다)
   - 이상태로 Commit하면 python3가 설치된 이미지가 만들어진다.
   ```bash
   Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
   ```
<br>

### 2번의 경우를 Build로 진행한다. Build의 경우는 다음과 같이 빌드한다.

- 폴더에 index.html을 만들어 "Hello, <strong>Docker</strong>"라고 채워 넣는다.
- Docker에 다음 내용을 채워넣는다.
  ```bash
  FROM ubuntu:20.04
  #RUN apt update # 매번 RUN 하는 것은 레이어가 하나 생성되는 것이기 때문에 효율적이지 못하다
  #RUN apt install python3
  # 한번에 쓴다.
  RUN apt update && apt install -y python3 # && 앞이 실행하고 성공하면 뒷 구문 실행, -y : yes/no 물을 때 y
  WORKDIR /var/www/html
  COPY ["index.html", "."]
  # RUN echo "Hello, <strong>Docker</strong>" > index.html # 이렇게도 생성 가능하다.
  CMD ["python3", "-u", "-m", "http.server"] # -u : 현재 상황에 대한 로그가 출력된다.
  ```
- Terminal에서 다음과 같이 실행한다.
- "docker build -t web-server .; docker rm --force web-server; docker run -p 8888:8000 --name web-server web-server-build;"   <img src="https://user-images.githubusercontent.com/66783849/193821751-6b16253e-5956-4e9f-b44b-06c34b75f8d0.png" width="70%">  
- 이후 인터넷 브라우저에 [http://localhost:8888/](http://localhost:8888/)를 검색하여 창이 나타남을 확인한다.  
  <img src="https://user-images.githubusercontent.com/66783849/193821639-3afbe5c9-9d8b-4a43-a7a6-aabf1423d73d.png">  
- Overriding이 가능한데, 이 경우 CMD[] 명령어를 "pwd"로 대체하여 본다. 다음과 같이 실행한다.  
- "docker build -t web-server .; docker rm --force web-server; docker run -p 8888:8000 --name web-server web-server-build pwd;"  
  <img src="https://user-images.githubusercontent.com/66783849/193822363-4731554d-aecf-49ef-8811-c974c74a2f3b.png" width="70%">  
