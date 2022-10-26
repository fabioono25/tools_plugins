#pull node image
FROM node

# where all commands will be executed
WORKDIR /app

# 1st: outside image/container where the files live
# 2nd: path inside the images, where the files should be stored
# copying files into the image filesystem (snapshot taken)
# COPY . ./

# optimization: to avoid a change in code causing a npm install every time we build an image
COPY package.json /app

# executing commands to construct the image
RUN npm install

# now, we moved copy of the application after npm install (to avoid install every time)
COPY . /app

# exposing ports (it can work without this parameter, but it is recommended)
EXPOSE 80

# executing commands on the running container
CMD ["node", "server.js"]
