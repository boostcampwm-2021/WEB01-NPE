# build stage
FROM node:14-alpine AS builder
WORKDIR /app/backend
COPY . .
RUN npm install
RUN npm run build

# running stage
FROM node:14-alpine
WORKDIR /app/backend

# COPY dotenv
COPY .env ./

# COPY built files
COPY --from=builder /app/backend/dist .

# install pm2
RUN npm install pm2 -g
# install dependencies
RUN npm install