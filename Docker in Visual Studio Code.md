# Docker in Visual Studio Code

- 사이트 [Docker in Visual Studio Code](https://code.visualstudio.com/docs/containers/overview)를 기반으로 작성되었습니다.

<br>

### 개요

- Docker 확장을 사용하면 Visual Studio Code 에서 컨테이너화된 애플리케이션을 쉽게 빌드, 관리 및 배포할 수 있다.
- Docker 확장 기능에 대해 알아본다.

<br>

### 선행 학습

- Docker 개념을 이해해야 한다.
- 참고 문서 : [Docker 자습서](https://learn.microsoft.com/ko-kr/visualstudio/docker/tutorials/docker-tutorial)

<br>

### 목차

1. Installation & Editing Docker files
3. Generating Docker files
4. Docker Explorer
5. Docker commands
6. Docker Compose
7. Using image registries & Debugging services running inside a container
9. Azure CLI integration

<br>

## 1. Installation & Editing Docker files

- Docker를 설치한다. [Install Docker](https://docs.docker.com/get-docker/)
  - Linux의 경우 Linux 호스트를 구성한다. [Docker CLI 활성](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user)
- VScode의 경우 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>를 통해 확장을 열어 "docker"를 입력 후 설치한다.  
  <img src="https://user-images.githubusercontent.com/66783849/194198124-97155929-97c6-4666-bf7d-3adf5f1eed03.png" width="200">
- VScode에 dockerfile 또는 yml 파일을 작성할 때, 오류 및 다양한 코드 완성, 매개 변수 정보, 빠른 정보 및 구성원 목록을 비롯한 다양한 코드 편집 기능을 활용할 수 있다.  
  <img src="https://user-images.githubusercontent.com/66783849/194198599-0c802c7c-241c-422c-a0c5-851b87b90eeb.png" width="250">
  

<br><br>

## 2. Generating Docker files

- 도커파일 생성은 다음과 같이 진행한다.
- VScode에서 명령팔레트(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>)를 열고 "[-Docker:Add Docker Files to Workspace-]"를 입력하여 [+Dockerfile+] 및 [+.dockerignore+] 파일을 생성하여 작업공간에 추가한다.  
- 개발 언어(C#, Node.js, Python, Ruby, Go, Java)용 Docker 파일을 선택하고 그에 따라 생성된 Docker 파일을 얻을 수 있다.  
  <img src="https://user-images.githubusercontent.com/66783849/194199074-f81c5d6b-1752-4d11-b5f5-dcf34bd623db.png" width="500">  
  <img src="https://user-images.githubusercontent.com/66783849/194199196-a5962ccd-d0ca-4adc-9f05-ec6c86483286.png" width="200">

<br><br>

## 3. Docker Explorer

- Docker 확장으로 [+Docker Explorer+]를 VS Code에 제공한다.
- Docker Explorer를 통해 컨테이너, 이미지, 볼륨, 네트워크 및 컨테이너 레지스트리를 쉽게 관리할 수 있다.
- VScode의 경우 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>를 통해 확장을 열어 "Docker Explorer"를 입력 후 설치한다.  
  <img src="https://user-images.githubusercontent.com/66783849/194200409-2a8287dc-6c4d-4269-8035-eaa1049013a5.png" width="200">
- 다음과 같이 확인할 수 있다.  
  <img src="https://user-images.githubusercontent.com/66783849/194200534-4a5c8c2a-24a9-4512-9222-4c48eee7cb8c.png" width="200"> <img src="https://user-images.githubusercontent.com/66783849/194200622-0411f3d4-c13e-499b-971a-f3625e539450.png" width="400">

<br><br>

## 4. Docker commands

- docker 명령어 대부분은 명령팔레트로 실행할 수 있다.  
  <img src="https://user-images.githubusercontent.com/66783849/194201332-0a8a9fce-b860-43fe-b48b-b14f24011dea.png" width="200">
- Docker 명령을 실행하여 이미지 , 네트워크 , 볼륨 , 이미지 레지스트리 및 Docker Compose 를 관리할 수 있다.
- Docker: Prune System 명령으로 중지된 컨테이너, dangling 이미지, 사용하지 않는 네트워크 및 볼륨을 제거할 수 있다.

<br><br>

## 5. Docker Compose

- Docker Compose를 활용하여 다중 Docker 컨테이너를 정의하고 실행할 수 있다.
- docker-compose.yml 를 통해 작성한다.
- <kbd>Ctrl</kbd>+<kbd>Space</kbd>를 통해 지시문 목록을 확인할 수 있다.  
  <img src="https://user-images.githubusercontent.com/66783849/194201719-cc63c1fd-f678-4bb1-bed3-0f8b1db6242c.png" width="300">
  <img src="https://code.visualstudio.com/assets/docs/containers/overview/compose-group.png" width="300">

<br><br>

## 6. Using image registries & Debugging services running inside a container

- Azure Container Registry, Docker Hub ,GitLab 등에서 이미지를 푸시, 풀 또는 삭제할 수 있다.
- 컨테이너 내에서 실행되는 .NET(C#) 및 Node.js를 사용하여 빌드된 서비스를 디버그할 수 있다. 

<br><br>

## 7. Azure CLI integration

- VScode에서 명령팔레트(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>)를 열고 "[-Docker Images: Run Azure CLI-]"를 입력하여, 리눅스 기반 컨테이너에서 Azure CLI(명령줄 인터페이스)를 실행한다.
- 이를 통해 격리된 환경에서 Azure CLI를 활용하여 접속한다.
