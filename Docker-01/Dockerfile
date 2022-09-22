# 반드시 From baseImage부터 시작한다.
# node는 이미 만들어둔 node를 활용한다.
# node:16-alpine (16버전, alpine : 가장 작은 리눅스 버전)
# node를 Ctrl 클릭 하면 자세한 설명을 볼 수 있다.
FROM node:16-alpine

# 이미지, 컨테이너 안에서 어떤 경로에서 실행할 것인지 명시해야 한다.
# cd와 같은 개념이다.
# 어떤 디렉토리에 우리의 프로젝트를 Copy 할 것인지 명시
WORKDIR /app

# 가장 변동이 적은 파일부터 차례로 명시
# ./는 명령어를 실행하는 현재 위치(app)를 뜻한다.
# app 디렉토리에 파일들을 Copy한다.
COPY package.json package-lock.json ./

# RUN을 이용해서 "npm install"을 실행한다.
# package.json에 명시되어 있는 모든 패키지를 다운받는다.
# RUN npm install은 명시된 패키지 이상의 버전을 다운받는다.
# 따라서 ci를 통해 "package-lock.json"에 명시된 패키지의 버전을 그대로 설치한다.
RUN npm ci

# Layer 형식으로 코드가 진행되기 때문에, 많이 변경되는 부분은 마지막에 배치한다.
# 재 생성할 때 변경된 부분 이후만 다시 빌드가 진행되면 보다 효율적이고 빠르다. (이전은 cash로 진행)
# .은 명령어를 실행하는 위치를 뜻한다.
COPY index.js .

# ENTRYPOINT를 이용해 node라는 것을 실행하고 index.js를 실행한다.
ENTRYPOINT [ "node", "index.js" ]

# Dockerfile에 대한 명령어를 공부해 더 좋은 Dockerfile을 만들자.

