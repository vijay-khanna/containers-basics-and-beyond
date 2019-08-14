# Lab : Kubernetes Basics

In this Lab, we will cover basic Kubernetes commands

* **Pod**
In this sample file, we go through the basic elements of Pod Definition, and also how to share a temp-space between two containers running in same pod. The Pods share text files via a side-car pattern.

```
#//To Create the pod
kubectl apply -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/pod-sample.yaml

kubectl get pods          #// Observe the 2/2 in Ready, which means that both the containers in pod are ready

#// Connect to the sidecar pod. This will give you the # prompt of container where next three commands need to be executed. Type 'exit' to come out to host-os (Cloud9 Instance)
kubectl exec pod-with-sidecar -c sidecar-nginx-container -it bash

#// Install curl on the sidecar
apt-get update -y && apt-get install curl -y

#// Access the log file via the sidecar (After this command, type 'exit' to return to the Cloud9 Instance OS prompt)
curl 'http://localhost:80/app.txt'

# // Inspect the pod . Check the Mounts: , Containers: showing two containers:(app-alpine-container: & sidecar-nginx--container:)
kubectl describe pod pod-with-sidecar

#// Check the Logs of the Side-Car Container
kubectl logs pod-with-sidecar -c sidecar-nginx-container      


#//To Remove the pod
kubectl delete -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/pod-sample.yaml

#//Optionally this command can also delete the pod
kubectl delete pod pod-with-sidecar

```


* **Deployment**
```
kubectl apply -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/deployment-nginx.yaml

kubectl get deployments

kubectl get pods                  #//check there will be 3 pods running as part of the nginx deployment


#// To Edit a Deployment In-Line, without modifying the yaml file. 
#// This is usually for temporary cases. Ideally all changes should be done via deployment.yaml file
#// Edit the spec: => replicas: 3 to 2, save and exit editor

kubectl edit deployment.v1.apps/nginx-deployment      

#// below command will use Nano for editing.. 
KUBE_EDITOR="nano"  kubectl edit deployment.v1.apps/nginx-deployment

kubectl rollout status deployment.v1.apps/nginx-deployment

kubectl get deploy,rs,pods

#// Check the details of deployment, Note the Pod Template => Containers => nginx => Image value
kubectl describe deployment nginx-deployment

#//Note the Tags of the running containers/Deployment. Note the Images used for each deployment
kubectl get deploy -o wide


#//Deploying a new container-version without editing the deployment.yaml. Some Sample revisions to observe the rollout history
kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.91 --record=true
kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.8 --record=true
kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.92 --record=true


#//Checking the rollout History of Deployments. Observe the Number of Revisions available.
#//The revision numbers mentioned here can only be used to roll-back
kubectl rollout history deployment.v1.apps/nginx-deployment         

#//Describe a specific version : NOTE a valid Revision # must exist in previous history command
kubectl rollout history deployment.v1.apps/nginx-deployment --revision=5


#//Roll-Back one revision
kubectl get deploy -o wide
kubectl rollout undo deployment.v1.apps/nginx-deployment
kubectl get deploy -o wide

#//Rollback to specific revision. The revision# must exist in the history command output.
kubectl rollout undo deployment.v1.apps/nginx-deployment --to-revision=5

kubectl rollout status deployment.v1.apps/nginx-deployment

#//Scale out replicas using command line
kubectl scale deployment.v1.apps/nginx-deployment --replicas=10
kubectl get deploy -o wide

#//To modify the CPU/Memory via command line. Ideally for persistence, the same should be done via deployent.yaml file
kubectl describe deployment nginx-deployment | grep cpu
kubectl set resources deployment.v1.apps/nginx-deployment -c=nginx --limits=cpu=100m,memory=512Mi
kubectl describe deployment nginx-deployment | grep cpu

#//Delete the Deployment
kubectl delete -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/deployment-nginx.yaml
```



* **Service**
```
#//To Deploy a Simple LoadBalancer based Service.
#//open the EC2 Console, check the creation of LoadBalancer
#//Observe the Tags, which mention the kubernetes service name.

kubectl apply -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/service-sample-load-balancer.yaml

#//Need to have underlying pods to handle the traffic. 
kubectl apply -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/deployment-nginx.yaml

#// Observe the Service details, Note the LoadBalancer ingress, EndPoints.
kubectl describe service front-end-service

#//Wait till you see the Instances 'InService' in the Loadbalancer tab. open the Loadbalancer URL in a Web browser 


#//Deleting Resources
kubectl delete -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/deployment-nginx.yaml

kubectl delete -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/service-sample-load-balancer.yaml


```
