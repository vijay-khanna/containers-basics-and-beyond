# Lab : Jenkins with EKS <<< WORK IN PROGRESS>>

In this Lab, we will Install Jenkins on EKS, and deploy a pipeline to launch Containerised NodeJs Application

* **Deploy Jenkins on EKS**
Ensure Helm is installed, use the previous labs to have it configured. 


helm install stable/jenkins --set rbac.create=true --name cicd

kubectl get pods -w

#//Check the Jenkins login URL, open this in browser. it might take 2-3 minutes to launch and be InService

export SERVICE_IP=$(kubectl get svc --namespace default cicd-jenkins --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
echo http://$SERVICE_IP:8080/login


#//Username for jenkins will admin, for password use the below command
printf $(kubectl get secret --namespace default cicd-jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo



```
#//To Create the pod
cd ~/environment/containers-basics-and-beyond/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/

kubectl apply -f pod-sample.yaml
```


* **Creating a Sample Pipeline to test Jenkins**
In this sample file, we go through the basic elements of Pod Definition, and also how to share a temp-space between two containers running in same pod. The Pods share text files via a side-car pattern.

```
#//To Create the pod
cd ~/environment/containers-basics-and-beyond/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/

kubectl apply -f pod-sample.yaml
```

* **Create a Pipeline for Nodejs Containerised Application**
In this sample file, we go through the basic elements of Pod Definition, and also how to share a temp-space between two containers running in same pod. The Pods share text files via a side-car pattern.

```
#//To Create the pod
cd ~/environment/containers-basics-and-beyond/Step-by-Step-Guide/Lab-030-Kubernetes-Basics/k8s-samples/

kubectl apply -f pod-sample.yaml
```



* **Delete the Jenkins deployment, Pods and Services using helm**

```
helm del --purge cicd

```



