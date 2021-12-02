FROM node:14-alpine

# 디렉토리 설정
WORKDIR "/app/backend"

COPY . .

RUN yarn

# # build stage
# FROM node:16-alpine AS builder
# WORKDIR /app/backend
# COPY . .
# RUN yarn
# RUN yarn build

# # running stage
# FROM node:16-alpine
# WORKDIR /app/backend

# # COPY dotenv
# COPY .env ./

# # COPY built files
# COPY --from=builder /app/backend/dist .

# # install pm2
# RUN npm install pm2 -g
# # install dependencies
# RUN yarn install --prod