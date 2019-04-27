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
docker build . -t gcr.io/erudite-variety-155215/kube-server:1.0.0
```

### Push Docker Image
In order for Kubernetes to access the image we need to push it to the container registry

```$xslt
docker push gcr.io/erudite-variety-155215/kube-server:1.0.0
```