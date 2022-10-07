문서정보 : 2022.10.05. 작성, 작성자 [@SAgiKPJH](https://github.com/SAgiKPJH)

# Docker compose

- 사이트 [Docker compose 를 이용해서 복잡한 도커 컨테이너를 제어하기](https://www.youtube.com/watch?v=EK6iYRCIjYs)를 기반으로 작성 되었습니다.

<br>

## 개요

- Docker Container를 만들 때 마다 사용하는 여러 복잡한 명령어가 있다.
- Docker를 처음 접하는 다른 동료들이 이러한 명령어를 다룰 때 참 어렵다.
- 이때 docker-compose.yml라는 파일을 만들고, `docker-compose up`이라는 cmd 명령어를 통해 한줄로 Container를 만들 수 있다면 어떨까?

<br>

### 사전 기본 과정

- 도커 이미지를 만들 수 있어야 한다.

<br>

## 수업의 목표 

- Wordpress (설치형 블로그)은 MySQL가 필요하다.
  - 이때 Wordpress 컨테이너와 MySQL 컨테이너를 준비한다.
- 웹 브라우저를 통해 Wordpress에 접근하고, Wordpress 컨테이너는 MySQL 컨테이너와 교류하여 작업한 다음, 웹 브라우저로 보내주는 구조를 갖는다.
- 이러한 환경을 Docker Comporse를 통해 만들어 본다.
  ```mermaid
  flowchart LR
  A("Web<br>Browser")--->B("Wordpress")--->C("MySQL")
  C--->B--->A
  ```

<br>

## 1. Wordpress-MySQL 환경 실행해보기 (Cmd)

- VScode로 폴더에 접속하고, 3개의 Terminal을 준비한다.
1. Wordpress.net이라는 네트워크를 생성해 본다.
   - 첫 번재 Terminal에 입력한다.
   ```bash
   docker network create wordpress_net
   ```
   - 그에 따른 결과창은 다음과 같다.
   ```bash
   6fc52b9fa98ac650d3ab8e4cf94fe06f3e1a4a38130f6af2198171ee4139a628
   ```
2. db라는 이름의 MySQL 기반의 이미지를 Run하는 Container를 만든다.
   - 다음과 같이 입력한다.
   ```bash
   docker \
   run \
      --name "db" \
      -v "${pwd}/db_data:/var/lib/mysql" \
      -e "MYSQL_ROOT_PASSWORD=123456" \
      -e "MYSQL_DATABASE=wordpress" \
      -e "MYSQL_USER=wordpress_user" \
      -e "MYSQL_PASSWORD=123456" \
      --network wordpress_net \
   mysql:5.7
   ```
   - 또는
   ```bash
   docker run --name "db"  -v "${pwd}/db_data:/var/lib/mysql"  -e "MYSQL_ROOT_PASSWORD=123456"  -e "MYSQL_DATABASE=wordpress"  -e "MYSQL_USER=wordpress_user"  -e "MYSQL_PASSWORD=123456" --network wordpress_net mysql:5.7
   ```
   - 이후 VScode 폴더(Host)에 "db_data"폴더가 만들어지는데, 이 안에 MySQL 데이터가 저장되는 파일이다. 때문에 컨테이너를 종료해도, 데이터가 보존된다.
3. Wordpress를 실행하는 Cotainer를 만든다.
   - 두 번째 Terminal에 다음과 같이 입력한다.
   - 다음과 같이 입력한다.
   ```bash
   docker \
   run \
      --name "app" \
      -v "${pwd}/app_data:/var/www/html" \
      -e "WORDPRESS_DB_HOST=db" \
      -e "WORDPRESS_DB_USER=wordpress_user" \
      -e "WORDPRESS_DB_NAME=wordpress" \
      -e "WORDPRESS_DB_PASSWORD=123456" \
      -e "WORDPRESS_DEBUG=1" \
      -p 8080:80 \
      --network wordpress_net \
   wordpress:latest
   ```
   - 또는 
   ```bash
   docker run --name "app" -v "${pwd}/app_data:/var/www/html" -e "WORDPRESS_DB_HOST=db" -e "WORDPRESS_DB_USER=wordpress_user" -e "WORDPRESS_DB_NAME=wordpress" -e "WORDPRESS_DB_PASSWORD=123456" -e "WORDPRESS_DEBUG=1" -p 8080:80 --network wordpress_net wordpress:latest
   ```
   - Wordpress도 마찬가지로, Host에 파일이 저장되어 진행한다.
4. Wordpress에 접근한다.
   - 인터넷 브라우저에 [http://localhost:8080/](http://localhost:8080/)를 검색하여 Wordpress를 설치하는 창이 나타남을 확인한다.
   <img src="https://user-images.githubusercontent.com/66783849/193988015-a4c41dc4-1828-46c2-ad5e-47965ab66436.png" width="60%">
5. 실행중인 컨테이너를 종료하여 삭제한다.
   - 다음 명령어를 통해 지운다.
   ```bash
   docker rm --force app
   docker rm --force db
   docker network rm wordpress_net
   ```
   - 또한 생성되었던 폴더들도 지운다.

<br><br>

## 2. docker-compose 만들기 (yml)

- 1번의 과정을 docker-compose로 간단히 구현한다.
1. VScode에서 docker-compose.yml 파일을 만든다.
   - 다음 내용을 첨가한다.
   ```yml
   version: "3.7"

   services:
     db:
       image: mysql:5.7
       volumes:
         - ./db_data:/var/lib/mysql
       restart: always
       environment:
         MYSQL_ROOT_PASSWORD: 123456
         MYSQL_DATABASE: wordpress
         MYSQL_USER: wordpress_user
         MYSQL_PASSWORD: 123456
         
     app:
       depends_on:
         - db
       image: wordpress:latest
       volumes:
         - ./app_data:/var/www/html
       ports:
         - "8080:80"
       restart: always
       environment:
         WORDPRESS_DB_HOST: db:3306
         WORDPRESS_DB_NAME: wordpress
         WORDPRESS_DB_USER: wordpress_user
         WORDPRESS_DB_PASSWORD: 123456
   ```
2. docker-compose로 yml 파일을 실행시킨다.
   - 다음과 같이 docker-compose를 실행시킨다.
   ```bash
   docker-compose up
   ```
   - 이후 app_data, db_data 폴더가 만들어지는 것을 확인한다.
   - 인터넷 브라우저에 [http://localhost:8080/](http://localhost:8080/)를 검색하여 Wordpress를 설치하는 창이 나타남을 확인한다.
   <img src="https://user-images.githubusercontent.com/66783849/193996692-d9ee2c3c-dfb7-45e0-a336-4afcf96f7351.png" width="50%">
3. docker-compose를 종료하고 삭제한다.
   - 다음 명령어를 통해 docker container를 종료한다.
   ```bash
   docker-compose down
   ```
   - 다음과 같이 종료됨을 확인한다.
   <img src="https://user-images.githubusercontent.com/66783849/193996965-741f798d-80c2-45ef-9039-73c920eb2732.png" width="80%">

   
<br><br>

## 3. 매커니즘 이해하기

1. MySQL Container를 만들게 되면 다음을 동작한다.
   - "/var/run/mysql"이라는 폴더에 데이터가 저장된다.
   - 3306번 포트에 입력을 받는다.
2. 이를 위해서 shell 및 docker-compose는 다음과 같이 명령을 실행한다.
   - shell
   ```bahs
   docker run mysql:5.7
   ```
   - docker-compose
   ```yml
   version: "3.7" # Compose의 버전
   services: # 만들고 싶은 컨테이너들을 안에 기입한다.
     image: mysql:5.7
   ```
3. 이름은 다음과 같이 여러 속성을 부여한다.
   - cmd는 다음과 같다.
   ```bash
   docker network create wordpress_net # 컨테이너를 Network로 묶는다.

   docker \
   run \
      --name "db" \
      -v "${pwd}/db_data:/var/lib/mysql" \ # 이 디렉터리의 데이터를 host의 폴더에 저장한다.
      -e "MYSQL_ROOT_PASSWORD=123456" \ # 여러 필요한 정보들 세팅
      -e "MYSQL_DATABASE=wordpress" \
      -e "MYSQL_USER=wordpress_user" \
      -e "MYSQL_PASSWORD=123456" \
      --network wordpress_net \ # 이 컨테이너가 네트워크에 연결된다.
   mysql:5.7

   docker \
   run \
      --name "app" \
      -v "${pwd}/app_data:/var/www/html" \
      -e "WORDPRESS_DB_HOST=db" \   # 컨테이너 이름을 기입하여 연결 (Network 필수)
      -e "WORDPRESS_DB_USER=wordpress_user" \    # 여러 필요한 정보들 세팅 (환경변수)
      -e "WORDPRESS_DB_NAME=wordpress" \
      -e "WORDPRESS_DB_PASSWORD=123456" \
      -e "WORDPRESS_DEBUG=1" \
      -p 8080:80 \   # Host와 Workpress를 연결한다.
      --network wordpress_net \   # 이 컨테이너가 네트워크에 연결된다.
   wordpress:latest
   ```
   - docker-compose는 다음과 같다.
   ```yml
   version: "3.7" # Compose의 버전
   services: # 만들고 싶은 컨테이너들을 안에 기입한다.
     db: # 컨테이너 이름
       image: mysql:5.7 # 이미지
       volumes:
         - ./db_data:/var/lib/mysql # 이 디렉터리의 데이터를 host의 폴더에 연결한다.
       restart: always
       environment:  
         MYSQL_ROOT_PASSWORD: 123456  # 여러 필요한 정보들 세팅 (환경변수)
         MYSQL_DATABASE: wordpress
         MYSQL_USER: wordpress_user
         MYSQL_PASSWORD: 123456
         
     app:
       depends_on:  # 선행해야 하는 리스트를 기입한다.
         - db       # db 컨테이너가 있어야 실행
       image: wordpress:latest
       volumes:
         - ./app_data:/var/www/html
       ports:
         - "8080:80"   # Host와 Workpress를 연결한다.
       restart: always
       environment:
         WORDPRESS_DB_HOST: db:3306    # 여러 필요한 정보들 세팅 (환경변수)
         WORDPRESS_DB_NAME: wordpress
         WORDPRESS_DB_USER: wordpress_user
         WORDPRESS_DB_PASSWORD: 123456
   ```
   - docker-compose는 Network를 만들 필요가 없다.  
     <img src="https://user-images.githubusercontent.com/66783849/194003194-3bcc16d1-31c1-4684-89f9-3bdcfe4f6565.png" width="60%">
   - 다음은 docker UI 화면이다.  
     <img src="https://user-images.githubusercontent.com/66783849/194005656-8518643c-38ed-450e-a5ad-3c66fa3fb055.png">


# 활용 분석

# ADC 프로파일 dockerfile 분석

### docker 명령어

- ADC 프로파일을 분석한다.
  ```bash
  FROM nvidia/cuda:11.3.0-cudnn8-devel-ubuntu20.04
  ```
- Image 정보 : ubuntu20.4에 cuda, cudnn8 developer 버전이 설치되어 있는 이미지이다.
  ```bash
  # Noninteractive
  ARG DEBIAN_FRONTEND=noninteractive
  RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
  ```
- ARG : 이미지 빌드를 위해 Dockerfile 내에서 사용하기 위한 값.
  - 빌드 시점에서 사용한다. 설정을 유지하지 않으려면 ARG 사용한다.
  - 예) ARG USER=mirero
  - 활용) RUN sudo useradd -m -s /bin/bash $USER
- echo : 'debconf debconf/frontend select Noninteractive'문구를 출력한다.
- debconf-set-selections : 미리 설정한 파일의 형식으로, 

<br><br>
  ```bash
  ENV nginx_version \  
    centos_version  
  ```
- ENV : 이미지 빌드를 위해 Dockerfile 내에서 사용하기 위한 값.
  - 런타임 시점에서 사용한다. docker inspect를 사용하여 값 확인 가능하다.
