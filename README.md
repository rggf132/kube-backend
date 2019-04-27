# kube-backend

## Set up locally

### Install MongoDB
```
./install_mongo.sh
```

### Run MongoDB
```
./run_mongo.sh
```
## Set up on Google Cloud Platform

### Create Kubernetes Cluster
The Kubernetes Cluster is a set of VMs running the Kubernetes software, applications deployed to Kuberentes will be scheduled across these nodes.

- Go to Kubernetes Engine -> Clusters -> New Cluster
- Set appropriate region e.g. europe-west2
- Open advanced settings -> enable vpc-native/alias ip (allows cluster to connect to internal db)

### Configure Kubernetes Container Registry

- Run the following command
```$xslt
gcloud auth configure-docker
```
### Build Docker Image
Kubernetes runs docker images, so we need to package our application into an image to run it

```$xslt
docker build . -t gcr.io/erudite-variety-155215/kube-backend:1.0.0
```

### Push Docker Image
In order for Kubernetes to access the image we need to push it to the container registry

```$xslt
docker push gcr.io/erudite-variety-155215/kube-backend:1.0.0
```

### Deploy Docker Image
To configure kubectl with your Google Cloud project run the following commands
```$xslt
gcloud config set project erudite-variety-155215
gcloud config set compute/zone europe-west2-a
gcloud container clusters get-credentials standard-cluster-1
```

To deploy the backend to the cluster run this command

```$xslt
kubectl run kube-backend --image=gcr.io/erudite-variety-155215/kube-backend:1.0.0 --port 3000
```

### Expose the Docker Image
In order to connect to your deployment, it needs to be externalised to the internet

```$xslt
kubectl expose deployment --type=LoadBalancer --port=3000
```

To check the status of the externalisation and get the external IP address, run the following command

```$xslt
kubectl get services
```

## Debug on Google Cloud Platform

### Get the Pod name

```$xslt
kubectl get pods
```

### Get logs from that Pod

```$xslt
kubectl logs <pod-name>
```

