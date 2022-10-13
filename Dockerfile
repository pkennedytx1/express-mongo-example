FROM node:16
WORKDIR /usr/src/task-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]