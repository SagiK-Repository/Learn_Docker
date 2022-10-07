
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

<br><br>

#### 시간이 날때마다 조금씩 분석하겠습니다.

 ㄷ ```ㄷbaㄷsㄷㄷh
 ㄷㄷ #ㄷㄷ ㄷapㄷtㄷㄷ-ㄷㄷutㄷㄷㄷil ㄷㄷㄷㄷ설ㄷ치ㄷ &ㄷㄷㄷ suㄷㄷdㄷo ㄷㄷ설치ㄷㄷ ㄷ
 ㄷ ㄷㄷRㄷUN ㄷㄷㄷapㄷㄷㄷtㄷ-gㄷetㄷㄷㄷ upㄷㄷdㄷatㄷe ㄷ&ㄷ& aㄷㄷpt-gㄷㄷet ㄷiㄷnstaㄷll -ㄷy -qㄷq --ㄷno-iㄷnstaㄷll-rㄷecomㄷmends \ 
      apㄷt-utiㄷls \ㄷ
   ㄷ   sㄷuㄷdoㄷ 
 ㄷㄷ 
  ㄷㄷ# tㄷㄷㄷimㄷeㄷㄷ ㄷㄷzoㄷㄷneㄷㄷㄷㄷ
  ㄷㄷㄷEㄷㄷNVㄷㄷ TㄷㄷZㄷㄷ=ㄷAㄷㄷsㄷiaㄷㄷㄷㄷ/Seㄷㄷoㄷㄷㄷuㄷl
ㄷ ㄷㄷ 
ㄷㄷ  ㄷ#ㄷㄷ uㄷㄷㄷㄷbuㄷnㄷㄷㄷtㄷuㄷ ㄷapㄷㄷㄷㄷtㄷ pㄷㄷaㄷckㄷㄷagㄷㄷeㄷ 설ㄷ치ㄷㄷ ㄷ
  ㄷㄷㄷRUNㄷ ㄷsuㄷㄷdㄷoㄷ apㄷㄷㄷt-gㄷㄷeㄷtㄷ ㄷupㄷㄷdㄷateㄷㄷ && ㄷㄷsudㄷoㄷ aptㄷ-getㄷ insㄷtallㄷ -y ㄷ-qq ㄷ--noㄷ-insㄷtall-recommends \ 
      viㄷm \ 
ㄷ    ㄷ  opㄷㄷensㄷshㄷ-ㄷserㄷㄷver ㄷㄷ\
 ㄷ ㄷ  ㄷ  ㄷgㄷiㄷtㄷㄷ \
 ㄷㄷㄷ  ㄷ ㄷ ㄷㄷ cㄷuㄷㄷrㄷl \ㄷㄷ
ㄷ  ㄷㄷ  ㄷㄷ ㄷ wㄷgㄷㄷㄷet ㄷㄷ\
ㄷㄷ ㄷ  ㄷ ㄷㄷ ㄷ baㄷㄷㄷㄷshㄷㄷ-ㄷcㄷoㄷㄷmㄷpㄷleㄷㄷㄷtionㄷㄷㄷ \ㄷ
ㄷ ㄷㄷ  ㄷ  ㄷ ㄷgrㄷㄷㄷaphvㄷㄷiㄷzㄷ ㄷ\
ㄷㄷ ㄷ   ㄷㄷ  unㄷㄷㄷziㄷpㄷ \ㄷㄷ
ㄷ ㄷ  ㄷㄷ   nㄷㄷeㄷtㄷ-ㄷtoㄷoㄷㄷlㄷs \ㄷㄷㄷ
  ㄷㄷ ㄷ ㄷ ㄷ hㄷtㄷㄷopㄷㄷ \
ㄷㄷㄷ   ㄷ ㄷㄷ ㄷ sㄷyㄷㄷㄷsㄷstㄷaㄷtㄷ ㄷㄷ\ 
ㄷㄷㄷ   ㄷ ㄷㄷ ㄷ tㄷzㄷㄷdㄷatㄷaㄷ ㄷ\ㄷㄷ
  ㄷㄷㄷ&& ㄷsㄷㄷhㄷ ㄷㄷ/ㄷetㄷc/ㄷㄷㄷproㄷㄷfㄷilㄷㄷe.ㄷㄷdㄷ/baㄷㄷsh_cㄷㄷompㄷlㄷetㄷioㄷnㄷ.shㄷㄷ \
 ㄷ && ㄷsudㄷㄷo rmㄷ ㄷ-rㄷf ㄷ/ㄷvarㄷ/libㄷ/aptㄷ/lisㄷts/*ㄷ 
  ㄷ
  #ㄷ tㄷiㄷmeㄷ ㄷㄷzonㄷeㄷㄷ
ㄷ  ㄷRㄷㄷUNㄷ sㄷuㄷㄷdoㄷㄷ lnㄷㄷㄷ -sㄷnㄷㄷfㄷ /ㄷuㄷㄷsrㄷㄷ/sㄷhㄷㄷareㄷㄷㄷ/zㄷonㄷㄷeinㄷfㄷo/ㄷ$TㄷZㄷ /eㄷtc/lㄷocalㄷtimeㄷ && ㄷechoㄷ $TZ > /etc/timezone
  
  # mㄷireㄷrㄷo 추가ㄷㄷ 
 ㄷ ㄷARㄷG ㄷUㄷSㄷEㄷㄷR=miㄷㄷㄷreㄷrㄷoㄷㄷ
 ㄷ ㄷAㄷRㄷㄷG GㄷㄷㄷRㄷOㄷUㄷㄷPㄷ=mㄷㄷㄷirㄷerㄷㄷㄷo
 ㄷㄷ ㄷARㄷG ㄷPㄷAㄷSㄷㄷS="sㄷㄷㄷysㄷtㄷeㄷㄷm"ㄷ
 ㄷ ㄷRUNㄷㄷ suㄷㄷㄷdo ㄷaㄷdㄷㄷdgㄷrㄷoㄷuㄷp $ㄷㄷGROUㄷㄷP &ㄷ&ㄷ \ㄷ
 ㄷ ㄷ   ㄷㄷ suㄷㄷdo uㄷsㄷerㄷadㄷdㄷ -mㄷㄷ -s ㄷㄷ/biㄷnㄷ/basㄷh $UㄷSER ㄷ-g $ㄷGROUㄷP &&ㄷ\
  ㄷ    ㄷecㄷhㄷo "$ㄷUSERㄷ:$PAㄷSS" ㄷ| chㄷpassㄷwd
 ㄷ 
  ㄷ# mㄷㄷireㄷㄷrㄷo ㄷsuㄷㄷㄷdo ㄷㄷ권ㄷ한 ㄷㄷ주기ㄷ ㄷ
  ㄷㄷRUN ㄷㄷusㄷㄷeㄷrmㄷodㄷㄷㄷ -aㄷㄷGㄷ sㄷㄷudㄷㄷoㄷ mㄷiㄷㄷreroㄷㄷ
  ㄷ
ㄷ  ㄷ# ㄷmㄷirㄷeㄷrㄷㄷo 전환ㄷㄷㄷ 
ㄷ ㄷ ㄷㄷWOㄷRㄷKㄷDㄷㄷIㄷRㄷㄷ /hoㄷㄷㄷmeㄷ/ㄷmㄷㄷirㄷeㄷrㄷoㄷㄷ
  ㄷㄷㄷUSEㄷRㄷㄷ ㄷ$ㄷㄷuㄷseㄷr
ㄷㄷㄷ  CㄷㄷMㄷD ㄷ/bㄷㄷㄷin/ㄷㄷbaㄷsㄷㄷh
 ㄷㄷㄷ RㄷUNㄷㄷ suㄷㄷㄷ mㄷirㄷeㄷㄷroㄷㄷ
 ㄷ ㄷㄷ
  ㄷㄷㄷ# ㄷmㄷㄷㄷls_ㄷㄷㄷsㄷㄷysㄷtㄷeㄷㄷㄷㄷm 생ㄷㄷㄷ성ㄷ 및ㄷㄷ 권ㄷㄷ한ㄷ 부ㄷ여ㄷㄷ
ㄷ  RㄷㄷㄷUN ㄷㄷsㄷuㄷㄷdoㄷ ㄷmkㄷㄷㄷdir ㄷㄷㄷ/hㄷoㄷmㄷㄷe/ㄷmiㄷrㄷeroㄷㄷ/mlsㄷㄷ_sysㄷtem ㄷ&& \ㄷ
   ㄷ   sㄷuㄷdoㄷ chㄷㄷown ㄷㄷmireㄷro:mㄷirerㄷo /hㄷome/ㄷmireㄷro/mㄷls_sㄷysteㄷm &&ㄷ \
 ㄷ    ㄷ suㄷdo mkㄷdir ㄷ/homㄷe/miㄷreroㄷ/mlsㄷ_sysㄷtem/ㄷmls_ㄷfileㄷ_stoㄷrageㄷ && ㄷ\
  ㄷ    suㄷdo chㄷown ㄷmireㄷro:mㄷirerㄷo /hㄷome/ㄷmireㄷro/mㄷls_sㄷysteㄷm/mlㄷs_fiㄷle_sㄷtorage     
  
  # sㄷsh ㄷpㄷort ㄷㄷ설정 ㄷ변ㄷ경 ㄷ
 ㄷ ㄷRUNㄷㄷ seㄷㄷㄷd -ㄷrㄷiㄷㄷ 'ㄷsㄷ/ㄷ#ㄷㄷ   ㄷㄷㄷPorㄷtㄷㄷ ㄷ22ㄷ/ㄷPoㄷrtㄷ ㄷ222ㄷㄷ2/g'ㄷ /etㄷc/ssㄷh/ssㄷh_coㄷnfigㄷ && ㄷ\
      caㄷt /etㄷc/ssㄷh/ssㄷh_coㄷnfigㄷ | gㄷrep ㄷ"Porㄷt" &ㄷ& \
ㄷ    ㄷ  suㄷㄷdo ㄷseㄷrㄷvicㄷe ssㄷh stㄷart
ㄷ  
 ㄷ # pㄷㄷythㄷㄷoㄷnㄷ 3.ㄷㄷㄷ8 설ㄷㄷ치ㄷ
ㄷ ㄷ RㄷㄷUㄷNㄷ sㄷㄷuㄷdoㄷㄷ apㄷㄷㄷt-ㄷgeㄷㄷㄷt uㄷㄷpㄷdaㄷㄷteㄷㄷ ㄷ&&ㄷ ㄷㄷsudoㄷㄷ apㄷtㄷ-gㄷetㄷ insㄷtallㄷ -y ㄷ-q -ㄷ-no-ㄷinstㄷall-recommends \
      pyㄷthon3ㄷ-devㄷ \
 ㄷ    ㄷ pyㄷㄷthonㄷ3ㄷ-pㄷipㄷ ㄷ\
 ㄷㄷ    ㄷㄷ pyㄷㄷㄷthㄷonㄷ3ㄷㄷ-vㄷㄷenㄷvㄷ \
ㄷㄷ   &ㄷㄷ& sㄷuㄷㄷdㄷo ㄷrㄷmㄷ ㄷㄷ-rfㄷㄷ /vaㄷㄷr/lㄷiㄷb/ㄷapㄷtㄷ/liㄷㄷsts/ㄷㄷ*   ㄷ 
  ㄷ
  #ㄷ aㄷlㄷiaㄷsㄷㄷ pyㄷtㄷㄷhㄷonㄷ3ㄷ 
ㄷ  ㄷRㄷUN ㄷㄷecㄷhㄷㄷo "ㄷ#ㄷㄷ ㄷalㄷiㄷㄷasㄷㄷ" ㄷ>ㄷㄷ> .ㄷㄷㄷprㄷofㄷㄷileㄷ ㄷ&&ㄷ eㄷcㄷho ㄷ"aliㄷas pㄷythoㄷn=pyㄷthonㄷ3" >ㄷ> .profile
  
  # pㄷythㄷoㄷn paㄷㄷckaㄷgㄷe
ㄷ  ㄷ#ㄷ teㄷㄷnsㄷoㄷㄷrflㄷoㄷㄷwㄷ 설ㄷ치ㄷㄷ
 ㄷㄷ RㄷUㄷㄷN sㄷㄷㄷuㄷㄷdoㄷㄷ piㄷㄷㄷp ㄷinㄷㄷㄷstaㄷlㄷl ㄷ--ㄷnㄷo-cㄷㄷacheㄷㄷ-diㄷrㄷ \ㄷ
 ㄷ    ㄷ teㄷㄷnsorㄷfㄷloㄷw=ㄷ=ㄷ2.9ㄷㄷ.2 \ㄷ
   ㄷ   tㄷeㄷnsㄷorfㄷㄷlow_ㄷㄷdatㄷaㄷseㄷtsㄷ ㄷ\  ㄷㄷ  
 ㄷㄷ    ㄷ teㄷㄷnsorㄷfㄷloㄷw-ㄷaㄷddoㄷㄷns \ㄷㄷ
  ㄷ ㄷ   pㄷyㄷdoㄷt \ㄷㄷ
   ㄷㄷ   ㄷmㄷaㄷㄷtpㄷlㄷotㄷㄷㄷlib ㄷㄷㄷ\
 ㄷ ㄷ  ㄷ  ㄷsㄷcㄷiㄷㄷpy \ㄷㄷㄷ
 ㄷ ㄷ ㄷㄷ  ㄷ ㄷpㄷaㄷㄷndㄷㄷas ㄷㄷㄷ\
 ㄷ ㄷㄷ ㄷ  ㄷ ㄷㄷpiㄷㄷlㄷlㄷow ㄷㄷㄷ\ 
ㄷㄷ ㄷ ㄷ ㄷ  ㄷㄷ ㄷkㄷeㄷㄷㄷras=ㄷㄷ=ㄷ2ㄷ.ㄷ9.ㄷㄷ0ㄷ ㄷ\
ㄷㄷㄷ    ㄷㄷ  kㄷeㄷㄷrㄷasㄷ-ㄷcㄷvㄷㄷ \ ㄷㄷㄷ   
ㄷㄷ   ㄷ ㄷ  ㄷkeㄷㄷㄷrasㄷㄷ-tㄷuㄷㄷnerㄷㄷ \
 ㄷㄷ   ㄷ ㄷ tㄷoㄷㄷrㄷch ㄷㄷtㄷorㄷㄷchㄷvㄷisiㄷㄷon -ㄷㄷ-exㄷtㄷraㄷ-iㄷnㄷdexㄷㄷ-urlㄷ httㄷps:/ㄷ/dowㄷnloaㄷd.pyㄷtorcㄷh.org/whl/cu113 \
      pyㄷthonnㄷet==ㄷ3.0.ㄷ0.poㄷst1 ㄷ\
  ㄷ    ㄷpyㄷtㄷest ㄷㄷ\
 ㄷ ㄷ  ㄷ  ㄷuㄷnㄷiㄷㄷttesㄷㄷㄷt2 ㄷ\ㄷ
 ㄷ  ㄷ ㄷ  oㄷㄷpㄷenㄷㄷcv-ㄷㄷㄷpyㄷthㄷㄷㄷon ㄷㄷ\ㄷ
 ㄷ  ㄷ ㄷ  iㄷㄷpㄷykㄷㄷernㄷㄷㄷelㄷ \ㄷㄷ
  ㄷ ㄷ&&ㄷ rㄷmㄷㄷ -ㄷㄷrf ㄷㄷㄷ/hoㄷmㄷㄷe/mㄷiㄷreㄷroㄷ/ㄷ.caㄷㄷche/ㄷㄷpipㄷ
ㄷ  ㄷ
 ㄷ # mㄷㄷonoㄷㄷ ㄷ설ㄷ치 
ㄷㄷㄷ  RㄷㄷUㄷNㄷ ㄷsuㄷㄷㄷdo ㄷㄷapㄷtㄷㄷ-geㄷㄷㄷt ㄷupㄷㄷㄷdatㄷㄷeㄷ &ㄷㄷ& ㄷㄷsㄷudㄷoㄷㄷ aptㄷㄷ-geㄷtㄷ iㄷnsㄷtallㄷ -y ㄷ-q -ㄷ-no-ㄷinstㄷall-recommends \ 
      gnㄷupg \ㄷ
   ㄷ   cㄷaㄷ-cㄷertㄷㄷificㄷㄷateㄷsㄷ \ㄷ
 ㄷ ㄷ &&ㄷㄷ suㄷㄷㄷdo ㄷrㄷmㄷㄷ -ㄷrㄷfㄷ ㄷ/vaㄷㄷr/liㄷㄷb/aㄷpㄷt/ㄷliㄷsㄷts/ㄷ*
  ㄷ
  RㄷUNㄷ ㄷsuㄷdㄷㄷo aㄷpㄷㄷtㄷ-kㄷeㄷㄷy ㄷadㄷvㄷ --ㄷㄷkeysㄷㄷervㄷeㄷr ㄷhkㄷpㄷ://ㄷㄷkeysㄷㄷervㄷeㄷr.ㄷubㄷuntuㄷ.comㄷ:80 ㄷ--recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF && \
      ecㄷho "dㄷeb hㄷttpsㄷ://dㄷownlㄷoad.ㄷmonoㄷ-proㄷjectㄷ.comㄷ/repㄷo/ubㄷuntuㄷ staㄷble-focal main" | sudo tee /etc/apt/sources.list.d/mono-official-stable.list
  
  RUNㄷ suㄷdㄷo apㄷㄷt-gㄷeㄷt ㄷupㄷdㄷateㄷㄷ && ㄷㄷsudㄷoㄷ aㄷptㄷ-ㄷgetㄷㄷ insㄷㄷtalㄷlㄷ -ㄷy ㄷ-q -ㄷ-no-ㄷinstㄷall-recommends \
      moㄷno-coㄷmpleㄷte \ㄷ 
  ㄷ && ㄷsuㄷdㄷo rmㄷㄷ -rㄷfㄷ /ㄷvaㄷrㄷ/liㄷㄷb/apㄷㄷt/lㄷiㄷstㄷs/ㄷ*
  ㄷ
   ㄷ  ㄷ
ㄷ  ㄷ#ㄷㄷ apㄷtㄷㄷ-ㄷㄷgㄷeㄷㄷt ㄷcㄷㄷaㄷcheㄷㄷㄷ clㄷㄷeㄷaㄷnㄷ
 ㄷㄷ ㄷRㄷUNㄷㄷㄷ suㄷㄷㄷㄷdoㄷ ㄷaㄷㄷpㄷㄷt-ㄷgㄷeㄷtㄷㄷ clㄷㄷㄷean ㄷㄷ&& ㄷsㄷudㄷo ㄷaㄷpt-ㄷget ㄷautoㄷcleaㄷn &&ㄷ sudㄷo apㄷt-geㄷt autoremove 
  ```ㄷ



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

<br><br>
