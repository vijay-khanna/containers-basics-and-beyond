# Lab : Kubernetes Basics

In this Lab, we will cover basic Kubernetes commands

* **Pod**



* **Deployment**
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
