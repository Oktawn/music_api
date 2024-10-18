FROM node:22 As development

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "run", "start:dev" ]