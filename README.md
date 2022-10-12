문서정보 : 2022.09.22.~ 작성, 작성자 [@SAgiKPJH](https://github.com/SAgiKPJH)

# Learn_Docker
도커 Docker 컨테이너 Container 사용 방법에 대해서 배운다

<br>

## Docker란?

<img src="https://user-images.githubusercontent.com/66783849/191689068-bbb3c349-45ce-40eb-b324-8331995d8b6a.png">

- 도커(Docker)는 리눅스의 응용 프로그램들을 프로세스 격리 기술들을 사용해 컨테이너로 실행하고 관리하는 오픈 소스 프로젝트이다.
- 일종의 VM 축소판이다.
- 도커 웹페이지 설명
  - 도커 컨테이너는 일종의 소프트웨어를 소프트웨어의 실행에 필요한 모든 것을 포함하는 완전한 파일 시스템 안에 감싼다. 
  - 여기에는 코드, 런타임, 시스템 도구, 시스템 라이브러리 등 서버에 설치되는 무엇이든 아우른다. 이는 실행 중인 환경에 관계 없이 언제나 동일하게 실행될 것을 보증한다.
- 도커는 리눅스에서 운영 체제 수준 가상화의 추상화 및 자동화 계층을 추가적으로 제공한다.
- 2013년 3월 13일에 오픈소스로 발표가 되었으며, 도커 자체가 매우 가볍기 때문에 하나의 서버나 가상머신이 여러개 동시에 구동할 수 있다.

<br>


## 목표

- 기초과정
  - [x] : [도커 한방에 정리 🐳](https://github.com/SagiK-Repository/Learn_Docker/blob/main/%EB%8F%84%EC%BB%A4%20%ED%95%9C%EB%B0%A9%EC%97%90%20%EC%A0%95%EB%A6%AC%20%F0%9F%90%B3.md)
  - [x] : [Docker가 왜 좋은지 5분안에 설명해줌](https://github.com/SagiK-Repository/Learn_Docker/blob/main/Docker%EA%B0%80%20%EC%99%9C%20%EC%A2%8B%EC%9D%80%EC%A7%80%205%EB%B6%84%EC%95%88%EC%97%90%20%EC%84%A4%EB%AA%85%ED%95%B4%EC%A4%8C.md)
  - [x] : [Docker 입문 수업](https://github.com/SagiK-Repository/Learn_Docker/blob/main/Docker%20%EC%9E%85%EB%AC%B8%20%EC%88%98%EC%97%85.md)
- 중급과정
  - [x] : [도커 : 이미지 만드는 법 - Dockerfile & build](https://github.com/SagiK-Repository/Learn_Docker/blob/main/%EB%8F%84%EC%BB%A4%20-%20%EC%9D%B4%EB%AF%B8%EC%A7%80%20%EB%A7%8C%EB%93%9C%EB%8A%94%20%EB%B2%95%20-%20Dockerfile%20%26%20build.md)
  - [x] : [Docker compose](https://github.com/SagiK-Repository/Learn_Docker/blob/main/Docker%20Compose.md)
- 문서 리뷰
  - [x] : [Docker in Visual Studio Code](https://github.com/SagiK-Repository/Learn_Docker/blob/main/Docker%20in%20Visual%20Studio%20Code.md)
  - [x] : [Docker - Dockerfile 작성 및 Build (이미지 제작)](https://github.com/SagiK-Repository/Learn_Docker/blob/main/Docker%20-%20Dockerfile%20%EC%9E%91%EC%84%B1%20%EB%B0%8F%20Build%20(%EC%9D%B4%EB%AF%B8%EC%A7%80%20%EC%A0%9C%EC%9E%91))
  - [x] : [DockerDocs - docker build](https://github.com/SagiK-Repository/Learn_Docker/blob/main/DockerDocs%20-%20docker%20build.md)

<br>

## ⭐ Docker에서 많이 쓰이는 CMD 명령어 정리

- Dockerfile Build (대문자 불가)
  ```bash
  docker build -t image_name .
  docker build -t image_name -f dockerfile # 도커 파일이 다른 이름 또는 다른 폴더에 있을 시
  ```
- Make Container And Run 및 bash 접근 (CMD /bin/bash 설정을 안해놓을 시)
  ```bash
  docker run --name container_name -it image_name /bin/bash
  ```
- Make Container And Run (CMD /bin/bash 설정을 해놓을 시 위와 동일)
  ```bash
  docker run --name container_name image_name
  ```
- 만일 중간에 나와버려서 재 접근 해야할 시
  ```bash
  docker start container_name
  docker exec -it container_name /bin/bash
  ```
- container 및 image 상태 확인
  ```bash
  docker ps  # Container 확인
  docker images  # Image 확인
  ```
- container 및 image 제거
  ```bash
  docker rm --force imagetestcontainer  # Container 삭제
  docker rmi juhyung1021/juhyungmirero  # Image 삭제
  ```

<br>

### 참고 사이트

- [도커 한방에 정리 🐳](https://www.youtube.com/watch?v=LXJhA3VWXFA)
- [Docker 가 왜 좋은지 5분안에 설명해줌](https://www.youtube.com/watch?v=chnCcGCTyBg)
- [Docker 입문수업](https://www.youtube.com/watch?v=Ps8HDIAyPD0&list=PLuHgQVnccGMDeMJsGq2O-55Ymtx0IdKWf)
- [도커 : 이미지 만드는 법 - Dockerfile & build](https://www.youtube.com/watch?v=0kQC19w0gTI)
- [Docker compose 를 이용해서 복잡한 도커 컨테이너를 제어하기](https://www.youtube.com/watch?v=EK6iYRCIjYs)
- [Docker in Visual Studio Code](https://code.visualstudio.com/docs/containers/overview) 
- [Docker - Dockerfile 작성 / Build (이미지 제작)](https://blog.d0ngd0nge.xyz/docker-dockerfile-write/)
- [DockerDocs - docker build](https://docs.docker.com/engine/reference/commandline/build/)
