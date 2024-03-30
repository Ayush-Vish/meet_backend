FROM ubuntu:latest

RUN apt-get update 
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs
RUN mkdir /app

COPY package.json /app
COPY package-lock.json /app

# Install dependencies
WORKDIR /app
RUN npm install

# Copy the rest of the application code into /app
COPY . /app

ENTRYPOINT [ "node", "/app/index.js" ]