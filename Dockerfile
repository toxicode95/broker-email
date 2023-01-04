FROM node:latest as base

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY package.json . 
RUN npm install

COPY . .

FROM base as backend
EXPOSE 3000
CMD npm start

FROM base as consumer
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh
EXPOSE 5000
