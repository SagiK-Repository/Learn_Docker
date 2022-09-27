# Docker 입문 수업

## 과정

- [ ] : 1. 수업소개
- [ ] : 2. 설치
- [ ] : 3. 이미지 PULL
- [ ] : 4. 컨테이너 RUN
- [ ] : 5. 네트워크
- [ ] : 6. 명령어 실행
- [ ] : 7. 호스트와 컨테이너의 파일시스템 연결
- [ ] : 8. 수업을 마치며

<br><br>


## 1. 수업 소개

- 운영체제에 여러 소프트 웨어를 설치해야 한다.
  - 예) 웹디자인의 경우, 웹서버 데이터베이스 등등
- 이를 통해 나의 [-앱-]을 만든다.
- 하지만 소프트웨어를 설치하는 과정이 너무 까다롭고 귀찮다.
- 이를 해결하기 위해, 하나의 컴퓨터에 가상의 컴퓨터를 만들고 소프트웨어처럼 활용한다.
  - 예) 웹서버 하나, 데이터 베이스 하나, ....
  - 이를 활용하면 별도의 컴퓨터를 장만하지 않아도 된다.
  - 이는 Vmware, Virtual Box의 일종이다.
- 하지만 가상머신을 돌리기에는 OS가 너무 용량이 크다.
- 또한 운영체제 위에 운영체제다 보니 속도도 느려진다.
- 따라서 소프트웨어를 실행하는데 필요한 라이브러리나 실행파일만 포함시킨다.
- 이를 통해 시간과 용량 문제를 해결한다.
- 이를 실행하기 위해 필요한 운영체제는 공유한다. (가벼운 리눅스)
- 이것을 컨테이너라고 하고, 현재 가장 잘 나가는 제품이 Docker🐳이다.

<br>

### 수업의 목표 : 도커의 이용자가 되는 것

- 도커의 이용자가 되기 위해서 필요한 최소 필요한 개념과 원리를 살펴본다.
- 이 과정이 끝나면, 도커로 하고 싶어하는 것이 많을 것이다.

<br><br>

## 2. 설치

- Docker를 설치하는 방법에 대해서 알아본다.
- 알아야할 사전지식
  - Docker와 같은 기술은 Linux 운영체제의 기술이다.
  - Container 안에 진행되는 소프트웨어는 Linux기반으로 돌아간다. 
  - 리눅스 OS 환경에서는 바로 실행하기 때문에 성능저하가 없다.
  - 윈도우나 MacOS등 리눅스 OS가 아니라면 가상머신을 돌리기 때문에 어느정도 속도와 효율성이 감소한다.
  - 하지만 Docker에서 오는 장점이 너무나도 크다.
- [도커 사이트](https://www.docker.com/)에 접속 > GetStarted > Docker Desktop > 운영체제에 맞는 것을 다운로드 받는다.
- Docker 사이트 > Developers > Docs > Download and Install 을 통해 운영체제별로 Docker를 설치하는 방법이 안내되어 있다. 리눅스의 경우 다양한 버전별로 설치방법이 명시되어 있다..
- 설치한 후 도커 어플리케이션이 실행됨을 확인한다.
- cmd에서 "docker images"를 입력해 로컬에 만들어진 이미지들을 확인할 수 있다. 정상 동작됨을 확인한다. (리눅스의 경우 "sudo docker image")


<br><br>

## 3. 이미지 PULL

- 앱스토어에서 앱을 받아오는 것처럼, docker hub를 통해 이미지를 받아온다.
- 앱을 실행할 때 프로세스로 실행이 된다면, 이미지를 실행할 때 Container를 통해 실행이 된다.
  ```mermaid
  flowchart LR
  A["docker hub"]--pull-->B["image"]--run-->C["container"]
  ```
- [Docker Hub 사이트](https://hub.docker.com/) > Explore > Containers에 접속하여 다양한 컨테이너들을 획득할 수 있다.

<br>

### 실습

- 웹서버 Apache를 설치해본다.
  - Docker Hub > Explore에서 httpd를 검색 > httpd 이미지가 나타난다.
  - 이때, OFFICIAL IMAGE 표시는 Docker에서 공식적으로 관리하는 이미지라는 뜻이다.
  - httpd를 클릭한 후, 이미지 PULL을 위한 명령어가 명시되어 있는 부분을 확인한다. "docker pull httpd"
    - 명령어에 대한 자세한 설명은 Docker > Developers > Docs > Reference > Reference documentation > Command-line reference > Docker CLI(docker)에 명시되어 있다.
    - docker pull을 찾아 pull 명령어에 대해서 자세히 알아본다.
- cmd에 "docker pull httpd"를 진행하여 httpd를 pull한다.
- Docker UI를 통해 이미지들을 확인할 수 있다.


<br><br>

## 4. 컨테이너 RUN

- Image를 Container에 Run 시키는 실습을 진행한다.
- docker-desktop의 경우
  - Image > httpd Image를 선택 후 RUN 버튼을 누른다.
  - 이미지를 컨테이너로 만드는 대화상자가 나타난다.
  - Optional setting을 통해 이름을 설정한다.
  - 이후 RUN을 클릭한다.
  - Container 에서 생성한 컨테이너가 동작하고 있음을 확인한다.
  - 실행한 컨테이너를 클릭하면, 실행화면, 상태 등을 볼 수 있다.
  - Stop을 통해 컨테이너를 종료한다.
  - Delete를 통해 컨테이너를 삭제한다.
  - Image 삭제는 Image 탭에 있는 Run 버튼 왼쪽 [...]안에 Remove를 클릭한다.
- cmd의 경우
  - "docker run httpd"을 통해 httpd 컨테이너를 만든다.
  - "docker ps"를 통해 컨테이너의 정보를 확인할 수 있다.
  - "docker run --name WS2 httpd"를 통해 이름이 다른 두 번째 컨테이너를 만든다.
  - "docker stop WS2"를 통해 컨테이너를 종료한다.
  - "docker ps -a"를 통해 Stop된 컨테이너들을 확인할 수 있다.
  - "docker start WS2"를 통해 중지된 컨테이너가 재개된다.
  - "docker logs"를 통해 로그를 확인할 수 있다.
  - "docker logs -f WS2"를 통해 실시간으로 log를 확인한다.
  - "docker rm WS2"를 통해 컨테이너를 종료한다. (Stop상태여야 한다.)
  - "docker rm --force WS2"를 통해 실행중인 컨테이너도 강제 종료된다.
  - Image 삭제는 "docker images"를 통해 name을 확인한 후, "docker rmi httpd"를 통해 이미지를 삭제한다.


## 5. 네트워크

- Docker를 사용하기 위해서는 네트워크에 대해서 알아야 하는 부분이 있다.
- 웹 앱을 만드는 방법에 대한 기본적인 내용인 WEB1을 공부해보자.
- 네트워크에 대해서 깊게 공부하려면 HomeServer에 대해서 공부해야 한다.
- 웹 서버를 구성하는데는 2대의 컴퓨터가 존재한다.
  - Web browser
  - Web server
    - 웹 페이지를 파일로 만들어서 특정 디렉터리에 저장한다.
    - 이러한 공간을 FileSystem이라고 해보자.
    - 컴퓨터에는 65535개의 포트가 존재한다.
    - 웹서버에서는 80번 포트에서 접속을 대기하고 있도록 설정되어 있다.
    - 웹서버가 설치된 주소는 example.com이라고 하자.
  - 웹브라우저에서 https://example.com:80/index.html
  - 이를 통해 웹서버가 FileSystem 안에 저장된 index.html을 전달하면 과정이 완료된다.
- Docker를 이용하면 Web Server 자체가 하나의 Container로써 작용한다.
- 이러한 Docker Web Server가 저장된 컴퓨터를 Host라고 한다.
- Host와 Container 각각 포트가 존재한다.
- "docker run -p 80:80 httpd"를 통해 앞 80은 Host의 포트, 뒤 80은 Container의 포트로 연결할 수 있다. (포트보디 라고 한다)
- Host의 80번 포트로 들어오면, 내부 container 80번 포트에 연결된다.
- 접속 경로가 8000번이면, "docker run -p 8000:80 httpd

<br>

### 실습

- Apache Pull : "docker pull httpd"
- Docker UI의 경우
  - Run을 누르고 Optional Setting > Container Name 및 Ports를 설정한다. Host port를 지정한다. (예시로 8080으로 설정) 이때, Container port가 80인 것을 확인한다. > Run을 누른다.
  - "docker ps"로 Ports가 정상지정(예시의 경우 8080->80)으로 됨을 확인한다.
- Cmd의 경우
  - "docker run --name ws3 -p 8081:80 httpd" (예시로 8081로 지정하였다)
  - "docker ps"로 Prots가 정상지정(예시의 경우 8081->80)으로 됨을 확인한다.
- 직접 접속됩을 확인한다.
  - Docker UI의 경우 LOG를 확인한다.
  - CMD의 경우 Run중인 cmd에서 LOG를 확인한다.
  - 인터넷에 "http://localhost:8080/index.html"이라 입력한다.
    - 인터넷 창에 "It works!" 문구가 나옴을 확인한다.
  - Docker UI의 Logs 변동사항을 확인한다.
  - 인터넷 브라우저 새로고침을 통해 로그가 추가됨을 확인한다. 
    - 예) 172.17.0.1 - - [25/Sep/2022:12:03:39 +0000] "GET /index.html HTTP/1.1" 304 -


## 6. 명령어 실행

- 컨테이너 안으로 들어가서 컨테이너를 수정할 수 있는 방법을 알아본다.
- docker hpptd를 ws2라는 이름으로 이미지를 RUN한다.
- Docker UI의 경우
  - 실행되고 있는 ws2 컨테이너 클릭 > CLI를 클릭 > ws2의 Terminal 실행
  - 리눅스 명령어를 입력하여 제어할 수 있다.
- cmd의 경우
  - "docker exec ws2 리눅스_명령어"를 진행하면 된다.
  - 예) docker exec ws2 pwd
  - 지속적인 연결을 위해서는 "/bin/sh"인 본쉘을 실행을 통해서 진행한다.
    - 쉘은 사용자에게 명령어를 받아서 운영체제에게 전달해주는 역할을 한다.
  - "docker exec ws2 /bin/sh"를 통해서 실행한다.
  - 지속적인 실행을 위해 다음과 같이 입력한다.
  - "docker exec -it ws2 /bin/sh" (-i : Interactive, -t : tty)
  - "exit" 명령어를 통해 빠져나온다.
  - 추천 : "docker exec ws2 /bin/bash"를 통해 bash쉘을 사용할 것을 추천한다.

<br>

### httpd 창 화면 바꾸기 실습

- "docker ps"를 통해 접속할 httpd 컨테이너 이름을 확인한다. "ws2"라고 하자.
- "docker exec -it ws2 /bin/bash" 입력
- httpd에 의하면 http 창을 저장하는 디렉터리 위치는 /usr/local/apache2/htdocs/ 에 존재한다.
- 파일을 수정하기 위해 리눅스 명령어 "nano"를 설치한다. (용량을 줄이기 위해 설치가 되어 있지 않다.)
  - "apt update" > "apt install nano"
- "cd /usr/local/apache2/htdocs" > "ls"를 통해 "index.html"을 확인한다.
- "nano index.html"을 통해 파일 내부로 들어가 "It works!"문구를 수정한다.
- 인터넷에 "http://localhost:8888/index.html"을 입력하여 변경된 문구를 확인한다.


<br>

## 7. 호스트와 컨테이너의 파일시스템 연결

- Host의 파일의 내용을 수정하여 Docker Container 내부의 파일도 함께 수정될 수 있도록 파일 시스템을 연결해본다.
- 우선 index.html를 Host 내에서 생성한다.
  - VScode를 통해 파일을 불러오고, 그 위치에 index.html를 생성하여 다음과 같이 내용을 채운다.  
    ```html
    <html><body>Hello! Nice Docker!🐳</body></html>
    ```
- Container를 만들면서 Container의 파일시스템과 Host의 파일시스템을 연결한다.
- CMD를 통해 "docker run -p 8888:80 -v HOST_DIR:CONATINER_DIR httpd"를 입력한다.
  - (예)HOST_DIR : D:\Sagi_JJU D\Git_Fork\Git_Fork_MRR\docker
  - COMTAINER_DIR : /usr/local/apache2/htdocs
  - CMD의 경우
    -  docker run --name ws3 -p 8888:80 -v "D:/Sagi_JJU D/Git_Fork/Git_Fork_MRR/docker":/usr/local/apache2/htdocs/ httpd
  - 지정한 Host의 폴더에 존재하는 index.html의 내용이 바뀌면, 즉각 반영되여 인터넷 브라우저에 출력됨을 확인할 수 있다.

<br>

## 8. 수업을 마치며

- Docker를 통해 한 줄로 수 많은 명령을 수행할 수 있게 되었다.
- 어떻게 활용하느냐에 따라 활용도가 높다
