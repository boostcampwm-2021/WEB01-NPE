FROM node:14-alpine

# 디렉토리 설정
WORKDIR "/app/frontend"

COPY . .

RUN npm install -f
RUN npm run build