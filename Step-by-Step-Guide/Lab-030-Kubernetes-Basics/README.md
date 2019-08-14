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
kubectl get deployments

kubectl apply -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/deployment-nginx.yaml

kubectl get deployments
kubectl get pods

kubectl edit deployment.v1.apps/nginx-deployment

kubectl rollout status deployment.v1.apps/nginx-deployment

kubectl get deployments

kubectl get rs,pods

kubectl describe deployments



kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.91 --record=true

kubectl rollout history deployment.v1.apps/nginx-deployment

kubectl annotate deployment.v1.apps/nginx-deployment kubernetes.io/change-cause="image updated to 1.9.1" --record

kubectl rollout history deployment.v1.apps/nginx-deployment --revision=2

kubectl rollout undo deployment.v1.apps/nginx-deployment

kubectl rollout undo deployment.v1.apps/nginx-deployment --to-revision=2

kubectl rollout status deployment.v1.apps/nginx-deployment


kubectl describe deployment nginx-deployment

kubectl get deployment nginx-deployment -o wide


kubectl scale deployment.v1.apps/nginx-deployment --replicas=10


kubectl set resources deployment.v1.apps/nginx-deployment -c=nginx --limits=cpu=200m,memory=512Mi





kubectl delete -f https://raw.githubusercontent.com/vijay-khanna/containers-basics-and-beyond/master/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/deployment-nginx.yaml




* **Service**
