ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4321

CMD ["npm", "run", "dev"]
