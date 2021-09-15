FROM node:14-alpine

COPY . .

RUN yarn

RUN yarn build 

# run app
EXPOSE 3000

CMD [ "yarn", "start:prod" ]