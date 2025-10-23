FROM node:20-alpine
ENV TZ=Asia/Bangkok
ENV NODE_ENV=production
ENV APP_VERSION=1.00

WORKDIR /usr/src/app
# COPY package.json ./
COPY . ./
RUN npm install -g pnpm
RUN pnpm install

ENV HOST=0.0.0.0
ENV PORT=8080

RUN pnpm build

CMD [ "pnpm", "start" ]