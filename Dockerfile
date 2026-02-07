FROM node:20-slim

RUN apt-get update && apt-get install -y libatomic1 && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production --ignore-scripts

COPY . .

ENV PORT=5080
EXPOSE 5080

CMD [ "npm", "start" ]