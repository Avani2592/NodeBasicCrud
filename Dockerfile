#use Node.js LTS image
FROM node:18

#set working directory

WORKDIR /app

#copy package.json and package-lock.json
COPY package*.json ./
#install dependencies
RUN npm install
#copy the rest of the application code
COPY . .
#expose port 3000
EXPOSE 3000
#start the application
CMD ["npm", "start"]
