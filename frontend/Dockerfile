FROM node:lts as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:lts as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./.env.production

EXPOSE 3000
CMD ["npm", "run", "start"]