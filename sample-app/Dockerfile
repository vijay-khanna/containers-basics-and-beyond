FROM node:10.19.0-alpine3.10
# This Container will house the node-js weather application. 
# This is the The Front End micro-service

MAINTAINER : Vijay Khanna
ENV NODE_VERSION 10.19.0

RUN mkdir /node
WORKDIR /node
## good practice to copy package.json first and initialize, and copy the main code later. 
COPY package*.json ./
#RUN mkdir app && chown -R node:node
#USER node                //good practice to run the container with non toot user.

COPY . .  
RUN PATH=$PATH:/usr/local/bindocker  
COPY app-sample-app.js ./   
# copy other files later on, so as not to re-build npm with each change of .js file change on source.
#ENTRYPOINT ["app.js"]

CMD [ "node" , "app-sample-app.js"]
EXPOSE 80
