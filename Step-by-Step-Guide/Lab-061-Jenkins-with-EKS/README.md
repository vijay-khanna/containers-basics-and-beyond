# Lab : Jenkins with EKS <<< WORK IN PROGRESS>>

In this Lab, we will Install Jenkins on EKS, and deploy a pipeline to launch Containerised NodeJs Application

* **Deploy Jenkins on EKS**
Ensure Helm is installed, use the previous labs to have it configured. 

```
helm install stable/jenkins --set rbac.create=true --name cicd

kubectl get pods -w

#//Check the Jenkins login URL, open this in browser. it might take 2-3 minutes to launch and be InService

export SERVICE_IP=$(kubectl get svc --namespace default cicd-jenkins --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
echo http://$SERVICE_IP:8080/login


#//Username for jenkins will admin, for password use the below command
printf $(kubectl get secret --namespace default cicd-jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo


```


* **Creating a Sample Pipeline to test Jenkins**


```
#//

```

* **Create a Pipeline for Nodejs Containerised Application**

```
#//

```


* **Delete the Jenkins deployment, Pods and Services using helm**

```
helm del --purge cicd

```



