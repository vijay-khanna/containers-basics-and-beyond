# Lab : Docker Basics

In this Lab, we will cover basic docker commands. We will make use of the Cloud9 Instance to launch and test the containers


* **Getting Started**
```
#// To list current running containers
docker ps

#// To list all containers that ran on this Machine
docker ps -a 

#// List local docker images
docker images


docker run --name test -it debian

docker run -it --storage-opt size=120G fedora /bin/bash



..
export VAR1=value1
export VAR2=value2

$ docker run --env VAR1 --env VAR2 ubuntu env | grep VAR
VAR1=value1
VAR2=value2
..



docker run -t -d -p 8080:80 --name front-end front-end:v1

docker exec -it ubuntu_bash bash

docker exec -it -w /root ubuntu_bash pwd


# Check via Cloud9 Preview in browser


#// Deploying a sample web server



docker restart my_container

docker top CONTAINER

docker stats -all

docker stats

docker stats awesome_brattain
 
docker stats --format "{{.Container}}: {{.CPUPerc}}"


docker rm <container>   //--force


docker logs -f --until=2s
docker logs  --tail
docker logs <containerID>
docker logs 

#//


#//

#//

#//





```

* **Creating Docker Image**
```
//To Kill and remove a container
docker kill back-end-pi-array ; docker rm back-end-pi-array
docker kill front-end ; docker rm front-end

//To run the backend-pi-array container locally and fire a POST request via command line
docker run -t -d -p 90:90 --name back-end-pi-array back-end-pi-array:v1
curl -X POST -H "Content-Type: application/json" --data '{"piDigits":500}' http://localhost:90/pi

//To run the front-end container locally
docker run -t -d -p 80:80 --name front-end front-end:v1
curl localhost
docker run -t -d -p 8080:80 --name front-end front-end:v1


//To run the backend-motm container locally   ... try with different containers, v1, v2, v3. all will give different responses
docker run -t -d -p 91:91 --name back-end-motm back-end-motm:v1
curl localhost:91/motm




```
