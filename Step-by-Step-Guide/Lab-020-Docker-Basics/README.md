# Lab : Docker Basics

In this Lab, we will cover basic docker commands

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
