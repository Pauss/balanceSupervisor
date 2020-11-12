FROM node:15.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies, wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

#RUN npm install
RUN npm ci --only=production 

# Bundle app source
COPY . .

EXPOSE 4001

CMD ["npm", "start"]
