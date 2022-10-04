   FROM ubuntu:20.04
   #RUN apt update # 매번 RUN 하는 것은 레이어가 하나 생성되는 것이기 때문에 효율적이지 못하다
   #RUN apt install python3
   # 한번에 쓴다.
   RUN apt update && apt install -y python3
   # && 앞이 실행하고 성공하면 뒷 구문 실행, -y : yes/no 물을 때 y
   WORKDIR /var/www/html
   COPY ["index.html", "."]
   # RUN echo "Hello, <strong>Docker</strong>" > index.html # 이렇게도 생성 가능하다.
   CMD ["python3", "-u", "-m", "http.server"]
    # -u : 현재 상황에 대한 로그가 출력된다.