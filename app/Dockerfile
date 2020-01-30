FROM node:10

WORKDIR /db
COPY package*.json ./

RUN npm install
#RUN npm install --save sqlite3
COPY . .

CMD npm start

# FROM ubuntu:18.04

# RUN apt update
# RUN apt install -y sudo
# RUN apt install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
# RUN apt-get update && apt-get install -y nodejs
# RUN sudo apt-get install -y sqlite3 libsqlite3-dev

# RUN mkdir /db
# COPY index.html ./db
# COPY index.js ./db
# COPY package.json ./db
# COPY package-lock.json ./db
# COPY test0.db ./db
# # COPY . ./db
# RUN cd /db
# RUN npm update
# RUN npm install sqlite3
# RUN npm install prompt-sync
# RUN npm install express
# RUN npm install body-parser
# RUN npm rebuild
# CMD /bin/bash/
