# build stage
FROM node:16-alpine AS builder
WORKDIR /app/backend
COPY . .
RUN yarn install
RUN yarn build

# running stage
FROM node:16-alpine
WORKDIR /app/backend

# COPY built files
COPY --from=builder /app/backend/dist .

# install pm2
RUN yarn global add pm2
# install dependencies
RUN yarn install --no-lockfile --production