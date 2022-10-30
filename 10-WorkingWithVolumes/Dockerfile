FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

# path inside my container that will map to some folder outside the container
VOLUME [ "/app/feedback" ]

CMD ["node", "server.js"]