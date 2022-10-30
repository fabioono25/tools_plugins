FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

# it is not necessary the way that we are building (via bind mount).
# However, it will cause problems when you are publishing your application in a server 
# (no docker run command the way we are testing).
COPY . .

# ENV PORT 80

ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

# path inside my container that will map to some folder outside the container
# VOLUME [ "/app/feedback" ]

# performance improvement
# VOLUME [ "/temp" ]

# CMD ["node", "server.js"]

# using nodemon for automatically detects change in NodeJS
CMD ["npm", "start"]