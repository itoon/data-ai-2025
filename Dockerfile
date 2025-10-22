FROM node:20-alpine
ENV TZ=Asia/Bangkok
ENV NODE_ENV=production
ENV APP_VERSION=1.00
ENV apiKey="AIzaSyB_X4LcIBDshWj6XABeQOTUOFl4rZGysUI",
ENV authDomain="data-ai-day.firebaseapp.com",
ENV projectId="data-ai-day",
ENV storageBucket="data-ai-day.firebasestorage.app",
ENV messagingSenderId="975433419043",
ENV appId="1:975433419043:web:cafcb3aeb5833531366496"

WORKDIR /usr/src/app
# COPY package.json ./
COPY . ./
RUN npm install -g pnpm
RUN pnpm install

ENV HOST=0.0.0.0
ENV PORT=8080

RUN pnpm build

CMD [ "pnpm", "start" ]
