문서정보 : 2022.10.06. 작성, 작성자 [@SAgiKPJH](https://github.com/SAgiKPJH)

# DockerDocs - docker build

- 사이트 [DockerDocs - docker build](https://docs.docker.com/engine/reference/commandline/build/)를 기반으로 작성되었습니다.

### 개요

- Dockerfile에서 이미지 빌드하는 방법에 대해 알아본다.

<br>

### 목차

1. 사용법
2. Text files
3. Build Examples
4. 많이 활용하는 옵션

<br><br>

## 1. 사용법

- 다음과 같이 사용한다.
  ```bash
  docker build [OPTIONS] PATH | URL | -
  ```
- docker build명령은 Dockerfile 및 "컨텍스트"에서 Docker 이미지를 빌드한다.
- 빌드의 컨텍스트는 지정된 PATH또는 URL을 지정할 수 있다.
  - 예) `docker build https://github.com/docker/rootfs.git#container:docker` (git 연결)
- 빌드 프로세스는 컨텍스트의 모든 파일을 참조할 수 있다. 예를 들어 빌드에서 COPY 명령을 사용하여 컨텍스트에서 파일을 참조할 수 있다.
- 매개변수는 Git 리포지토리, 사전 패키징된 tarball 컨텍스트 및 일반 텍스트 파일 의 URL세 가지 리소스를 참조할 수 있다.
- git에 연결할때 마지막에 다음과 같은 옵션을 부여할 수 있다.
  빌드 구문 접미사 | 사용된 커밋 | 사용된 빌드 컨텍스트
  -- | -- | --
  myrepo.git | refs/heads/master | /
  myrepo.git#mytag | refs/tags/mytag | /
  myrepo.git#mybranch | refs/heads/mybranch | /
  myrepo.git#pull/42/head | refs/pull/42/head | /
  myrepo.git#:myfolder | refs/heads/master | /myfolder
  myrepo.git#master:myfolder | refs/heads/master | /myfolder
  myrepo.git#mytag:myfolder | refs/tags/mytag | /myfolder
  myrepo.git#mybranch:myfolder | refs/heads/mybranch | /myfolder



<br><br>

## 2. Text files

- 컨텍스트를 지정하는 대신에 단일 파일을 전달 Dockerfile하거나 URLvia를 통해 파일을 파이프 할 수 있다.
  ```bash
  docker build - < Dockerfile

  # Power Shell의 경우
  Get-Content Dockerfile | docker build -
  ```
- Docker에는 다음과 같은 옵션이 있다.
  이름,   약칭 | 기본 | 설명
  -- | -- | --
  --add-host |   | 사용자 지정   호스트-IP 매핑 추가(host:ip)
  --build-arg |   | 빌드 시간 변수 설정
  --cache-from |   | 캐시 소스로 고려할   이미지
  --cgroup-parent |   | 컨테이너에 대한   선택적 상위 cgroup
  --compress |   | gzip을 사용하여   빌드 컨텍스트 압축
  --cpu-period |   | CPU   CFS(Completely Fair Scheduler) 기간 제한
  --cpu-quota |   | CPU   CFS(Completely Fair Scheduler) 할당량 제한
  --cpu-shares, -c |   | CPU 공유(상대   가중치)
  --cpuset-cpus |   | 실행을 허용할   CPU(0-3, 0,1)
  --cpuset-mems |   | 실행을 허용할   MEM(0-3, 0,1)
  --disable-content-trust | TRUE | 이미지 확인 건너뛰기
  --file, -f] |   | Dockerfile의   이름(기본값은 'PATH/Dockerfile')
  --force-rm |   | 항상 중간 용기를   제거하십시오
  --iidfile |   | 파일에 이미지 ID   쓰기
  --isolation |   | 컨테이너 격리 기술
  --label |   | 이미지에 대한   메타데이터 설정
  --memory, -m |   | 메모리 제한
  --memory-swap |   | 메모리 + 스왑과   동일한 스왑 제한: 무제한 스왑을 활성화하려면 '-1'
  --network |   | 빌드 중 RUN   명령에 대한 네트워킹 모드 설정
  --no-cache |   | 이미지를 빌드할 때   캐시를 사용하지 마십시오.
  --output, -o |   | API   1.40+ <br>출력 대상(형식:   type=local,dest=path)
  --platform |   | API   1.40+ <br>서버가 다중   플랫폼을 지원하는 경우 플랫폼 설정
  --progress | auto | 진행 출력 유형을   설정합니다(자동, 일반, tty). 일반을 사용하여 컨테이너 출력 표시
  --pull |   | 항상 최신 버전의   이미지를 가져오십시오.
  --quiet, -q |   | 빌드 출력 억제 및   성공 시 이미지 ID 인쇄
  --rm | TRUE | 성공적인 빌드 후   중간 컨테이너 제거
  --secret |   | 빌드에 노출할 비밀   파일(BuildKit이 활성화된 경우에만): id=mysecret,src=/local/secret
  --security-opt |   | 보안 옵션
  --shm-size |   | /dev/shm의   크기
  --squash |   | 실험적(데몬) <br> 새로 만든   레이어를 하나의 새 레이어로 스쿼시
  --ssh |   | 빌드에 노출할 SSH   에이전트 소켓 또는 키(BuildKit이 활성화된 경우에만)(형식:   default\|<id>[=<socket>\|<key>[,<key>]])
  --stream |   | 빌드 컨텍스트를   협상하기 위해 스트림이 서버에 연결됨
  --tag, -t |   | 이름 및 선택적으로   'name:tag' 형식의 태그
  --target |   | 빌드할 대상 빌드   단계를 설정합니다.
  --ulimit |   | Ulimit 옵션

<br><br>

## 3. Build Examples

- Build with PATH (Can Use a .dockerignore file)
  ```bash
  docker build .
  ```
- Build with URL
  - GitHub 저장소를 복제 ("git://"또는 "git@"체계 를 사용하여 임의의 Git 리포지토리를 지정할 수 있다)
  ```bash
  docker build github.com/creack/docker-firefox
  ```
  - tarball을 다운로드
    - -f ctx/Dockerfile 매개변수는 이미지를 빌드하는 데 사용되는 내부 경로를 지정 한다.
  ```bash
  docker build -f ctx/Dockerfile http://server/ctx.tar.gz
  ```
- Build with -
  ```bash
  docker build - < Dockerfile
  ``` 
  ```bash
  docker build - < context.tar.gz
  ```


<br><br>

## 4. 많이 활용하는 옵션

### Tag an image (-t)

- 이미지에 태그를 지정한다.
- 아래 예제는 저장소 이름은 vieux/apache이고 태그는 2.0 이다.
- 이미지에 여러 태그를 적용할 수 있다.
  ```bash
  docker build -t vieux/apache:2.0 .
  docker build -t whenry/fedora-jboss:latest -t whenry/fedora-jboss:v2.1 .
  ```

<br>

### Specify a Dockerfile (-f)

- Dockerfile의 이름을 지정한다. (기본값은 'PATH/Dockerfile')
  ```bash
  docker build -f Dockerfile.debug .
  ```
- 아래는 현재 디렉토리를 빌드 Context로 사용하고 stdin에서 Dockerfile를 읽는다.
  ```bash
  curl example.com/remote/Dockerfile | docker build -f - .
  ```
- 다음과 같이 활용 가능하다
  ```bash
  docker build -f dockerfiles/Dockerfile.debug -t myapp_debug .
  docker build -f dockerfiles/Dockerfile.prod  -t myapp_prod .
  
  cd /home/me/myapp/some/dir/really/deep
  docker build -f /home/me/myapp/dockerfiles/debug /home/me/myapp
  docker build -f ../../../../dockerfiles/debug /home/me/myapp
  ```

<br>

### Use a custom parent cgroup (--cgroup-parent)

- docker build가 옵션으로 실행 되면 --cgroup-parent 빌드에 사용된 컨테이너가 해당 docker run 플래그 와 함께 실행된다.

<br>

### Set ulimits in container (--ulimit)

- --ulimit와 함께 옵션을 사용 docker build하면, 각 빌드 단계의 컨테이너가 해당 --ulimit플래그 값 을 사용하여 시작한다.

<br>

### 빌드 시간 변수 설정(--build-arg) 

- "ENV" Dockerfile의 지침을 사용 하여 변수 값을 정의할 수 있다.
  ```bash
  docker build --build-arg HTTP_PROXY=http://10.20.30.2:1234 --build-arg FTP_PROXY=http://40.50.60.5:4567 .
  ```
- 값 없이 플래그를 사용할 수도 있다. --build-arg이 경우 로컬 환경의 값이 빌드 중인 Docker 컨테이너로 전파된다.
  ```bash
  export HTTP_PROXY=http://10.20.30.2:1234
  docker build --build-arg HTTP_PROXY .
  ```

<br>

### 컨테이너에 대한 격리 기술 지정(--isolation) 

-  Windows에서 Docker 컨테이너를 실행하는 상황에서 유용하다.

<br>

### 컨테이너 호스트 파일에 항목 추가(--add-host)

- /etc/hosts 하나 이상의 --add-host 플래그 를 사용하여 컨테이너의 파일에 다른 호스트를 추가할 수 있다.
  ```bash
  docker build --add-host=docker:10.180.0.1 .
  ```

<br>

### 타겟 빌드 단계 지정(--target) 

- 여러 빌드 단계로 Dockerfile을 빌드할 --target때 결과 이미지의 최종 단계로 이름별로 중간 빌드 단계를 지정하는 데 사용할 수 있다.
  ```yml
  FROM debian AS build-env
  # ...
  
  FROM alpine AS production-env
  # ...
  ```
  ```bash
  docker build -t mybuildimage --target build-env .
  ```

<br>

### Custom build outputs

- 기본적으로 로컬 컨테이너 이미지는 빌드 결과에서 생성된다.
- --output또는 -o 플래그를 사용하면 사용자 지정 내보내기를 지정할 수 있다. (CSV 형식 문자열, local및 tar내보내기가 지원)
  ```bash
  docker build -o out .
  docker build --output type=local,dest=out .
  docker build --output type=tar,dest=out.tar .
  docker build -o - . > out.tar
  ```

<br>

### 외부 캐시 소스 지정 

- --cache-from레지스트리의 이미지를 가리키는 플래그를 사용하여 이전 빌드에서 생성된 캐시를 재사용할 수 있다.
  ```bash
  docker build -t myname/myapp --build-arg BUILDKIT_INLINE_CACHE=1 .
  docker push myname/myapp
  ```
- 이미지를 푸쉬한 다음에 이미지는 다른 시스템의 캐시 소스로 사용된다.
- 다른 컴퓨터에서는 다음과 같이 사용할 수 있다.
  ```bash
  docker build --cache-from myname/myapp .
  ```

<br>

### (실험적인 옵션) 이미지의 레이어 스쿼시(--squash)

- 스쿼시는 기존 이미지를 파괴하지 않고 스쿼시된 레이어의 내용으로 새 이미지를 만든다.
- 이를 통해 레이어가 생성된 것 처럼 보이는데, 이전 기록을 볼 수 있다.
- 제한사항
  - 더 많은 공간을 사용할 수 있다. 두 개의 이미지 복사본을 저장하기 때문에 훨씬 더 많은 공간이 사용되는 것을 볼 수 있다.
  - 스쿼싱 레이어는 더 작은 이미지를 생성할 수 있지만 단일 레이어를 추출하는 데 시간이 더 오래 걸린다.
  - 파일 시스템을 변경하지 않는 이미지를 스쿼시하려고 하면 실패한다.
- 전제조건
  - 예제에서는 Docker 19.03에서 실험 모드로 사용한다.
  - 기본적으로 실험 모드는 비활성화되어 있다.
  - 실험 모드를 활성화하려면 실험 플래그가 활성화된 상태에서 도커 데몬을 다시 시작해야 한다.
- 다음과 같이 활용한다.
  ```yml
  FROM busybox
  RUN echo hello > /hello
  RUN echo world >> /hello
  RUN touch remove_me /remove_me
  ENV HELLO=world
  RUN rm /remove_me
  ```
  ```bash
  docker build --squash -t test .
  ```
- 다음과 같은 결과가 나타난다.  
  <img src="https://user-images.githubusercontent.com/66783849/194255625-04da83b5-535a-4121-8cb4-dc1c94a9c002.png" width="700">

<br><br>
