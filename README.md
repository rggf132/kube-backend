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

## API Documentation

### GET /auth/facebook
This redirects the user to facebook where they can sign in, on completion they will be re-directed to /auth/facebook/callback

### GET /tasks
This endpoint returns all of the users tasks
```json
{
    "tasks":[
        {
            "id":"961bfa41-f1db-4269-84ee-67d9b8c0d6d2",
            "title":"Do washing",
            "description":"Put washing into machine",
            "status":"in_progress",
            "insertDate":"2008-09-15T15:53:00"
        }
    ]
}
```

### POST /tasks
This endpoint allows a user to create a new task
```json
{
    "title":"Light the fire",
    "description":"Turn on the gas and light the spark"
}
```

### PUT /tasks/:id
This endpoint allows a user to update the contents of a task, or mark status.

The callee doesn't have to pass all fields, only those they wish to update.
```json
{
    "title":"This is a new title",
    "description":"This is a new description",
    "status":"in_progress"
}
```

### DELETE /tasks/:id
This endpoint allows the user to delete a task.

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

### Set up the database

#### Spin up
- On Google Cloud Platform go to SQL > Create
- Set up the root username and password

#### Whitelist IP
- Go to Connection
- Add a new network (ip) allowed to connect externally
- Input your own IP address

#### Create non-root user
- Once span up go to Users > Create user account
- Create a user account for the backend
- Go into the code database>connector.js and input SQL public IP, username and password

#### Create database (within database)
- Go to Databases > Create Database
- Create a database 'taskApp'

#### Test connection
Run the following command, ensure the db connector syncs
```
babel-node database/connector.js
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

