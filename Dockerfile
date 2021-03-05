FROM node:14.16.0

COPY . /frontend
WORKDIR /frontend

RUN npm install