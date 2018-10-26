FROM arm32v7/node:slim
COPY package*.json /usr/src/
COPY . /usr/src/
WORKDIR /usr/src/
RUN npm install
#RUN npm install -g babel-cli
#RUN npm run build
EXPOSE 8080
CMD ["node","index.js"]