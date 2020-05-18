Steps to Containerise a sample application


```
## Create an Admin Role for EC2, assign the Role to the Cloud9 Instance. 
## In the Cloud9 Instance, Preferences => AWS Settings => Disable the "AWS Managed Credentials" Slider. 
## Run AWS Configure, set the region

cd ~/environment

git clone https://github.com/vijay-khanna/containers-basics-and-beyond.git

cd ~/environment/containers-basics-and-beyond/sample-app/

sudo yum install jq -y

```
Basic Test locally

```
npm install 
node app-sample-app.js 8081

## From Another Terminal
curl localhost:8081/stats
```

Containerize and Push to Repo

```
$(aws ecr get-login --region us-east-1 --no-include-email)


sampleAppURI=$(aws ecr create-repository --repository-name sample_app_stats_ver1 | jq -r  '.repository.repositoryUri')
echo "export sampleAppURI=${frontEndRepoECRURI}" >> ~/.bash_profile
echo $sampleAppURI

docker build -t $sampleAppURI:v1 . 

docker kill sample-app-stats-container ; docker rm sample-app-stats-container
docker run -t -d -p 8081:80 --name sample-app-stats-container $sampleAppURI:v1
docker ps
curl localhost:8081/stats


docker push $sampleAppURI:v1

sed -i "s|IMAGE_URI|$sampleAppURI:v1|g"  ~/environment/containers-basics-and-beyond/sample-app/deployment-sample-app.yaml


# Creating Service
kubectl apply -f service-loadbalancer.yaml
kubectl get svc

# Creading Deployment with newly created Container Image
kubectl apply -f deployment-sample-app.yaml


## Deleting Service and Deployments
kubectl delete -f service-loadbalancer.yaml



```


