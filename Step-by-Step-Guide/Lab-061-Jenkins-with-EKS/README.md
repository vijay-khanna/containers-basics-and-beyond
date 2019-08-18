# Lab : Jenkins with EKS

In this Lab, we will Install Jenkins on EKS, and deploy a pipeline to launch Containerised NodeJs Application

* **Deploy Jenkins on EKS**
In this sample file, we go through the basic elements of Pod Definition, and also how to share a temp-space between two containers running in same pod. The Pods share text files via a side-car pattern.

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
