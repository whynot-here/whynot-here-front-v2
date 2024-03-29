# FROM node:lts as builder
FROM node:16.10.0-slim as builder

# 컨테이너에 working directory /app을 만들고 project를 /app 폴더에 추가한다.
WORKDIR /app
ADD . /app/

# yarn.lock, package-lock.json을 삭제
# RUN rm yarn.lock
# RUN rm package-lock.json

RUN yarn config delete proxy
RUN yarn config delete https-proxy

RUN yarn cache clean

# ssr로 배포하는 경우 => yarn build 
# static으로 배포하는 경우 => yarn generate 
RUN yarn --network-timeout 1000000

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3001

CMD [ "yarn", "start" ]