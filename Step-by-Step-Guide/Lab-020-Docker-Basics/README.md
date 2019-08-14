# Lab : Docker Basics

In this Lab, we will cover basic docker commands. We will make use of the Cloud9 Instance to launch and test the containers


* **Getting Started**
```
#//Validatr docker is running
docker --version

docker info


#// List local docker images
docker images

#//Download and run container image from docker hub repo. This will run in detached mode
docker run --name test-ubuntu-container -itd ubuntu

#// List local docker images
docker images

#// To list current running containers
docker ps

#// To list all containers that ran on this Machine
docker ps -a 

#//To login inside the running container, and execute shell commands on bash prompt. <type exit to come out>
docker exec -it test-ubuntu-container /bin/bash

#//To execute a remote command on container, and get its output. Below will display the container hostname
docker exec -it test-ubuntu-container hostname

#//To remove the container
docker rm test-ubuntu-container

#//To run container (nginx-server) on non-default port
docker run -t -d -p 8080:80 --name nginx-test-server nginx

curl localhost:8080         #//Additionally Check Cloud9 Preview option to access web server via internet.

#//Restarting a Container
docker restart nginx-test-server
docker ps               #//to verify the status : Up since xyz seconds

#//Check essential stats of a container
docker top nginx-test-server

docker stats nginx-test-server       #//Shows CPU%, MEM%, NET IO
docker stats -all

#//Viewing basic container logs (usually STDOUT / echo inside of containers)
docker logs -f nginx-test-server   #//In another terminal run the curl command : $curl localhost:8080
#// check the nginx logs in the original window.

#//One more Log example, to explain how the applications can emit simple logs using echo and those can be captured.
docker run --name test-busybox-logs -d busybox sh -c "while true; do $(echo date); sleep 1; done"
docker logs -f test-busybox-logs
docker stop test-busybox-logs; docker rm test-busybox-logs

```
</br>

* **Creating Docker Image. Simple Web Server**</br>


```
#//Create the below Dockerfile in an empty folder.

---
FROM centos:latest
MAINTAINER : Vijay Khanna

RUN mkdir /node
WORKDIR /node

RUN yum -y install httpd
RUN echo "Hello World" > /var/www/html/index.html
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
EXPOSE 80
---

#// To Build and test the custom Dockerfile
docker build -t test-web-server-image .   #// Will tag the new container image as : test-web-server-image
docker images                             #// Verify the newly created Docker Image

docker stop web-server-container ; docker rm web-server-container   #// To Stop and remove any existing running containers with same name

docker run -itd --name web-server-container -p 80:80 test-web-server-image

curl localhost:80                       #//should display the "Hello World" Message

docker stop web-server-container ; docker rm web-server-container       #//Stop the container and free up the port 
```


* **Creating Docker Image. Test these commands after finishing Lab : Lab-040-Testing-and-Deploying-Container-App**</br>
The below commands will help to run the local copies of the Nodejs application inside the Cloud9 instance, rather than EKS Cluster.
Run these after you build the container images from Dockerfile

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
