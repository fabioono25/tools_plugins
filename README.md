# Docker Projects

It is a compilation of notes/projets related to Docker.

## Commands
 

Running a container based on Nginx [1-SimpleTest]:

````
docker image build -t myimage
docker container run --name mycontainer -p 1234:80 myimage 
docker stop mycontainer
````

Working with arguments [2-PassingInstructions]:

````
docker container run ex-build-arg bash -c 'echo $ARGUMENT'
docker image build -t ex-build-arg --build-arg ARGUMENT=valuesChangedHere .
docker image inspect ex-build-arg --format="{{index .Config.Labels \"nameTest\"}}"
````

Executing a container based on an image containing Python code [4-ExecPythonServer]:

```
docker container run -it -v $(pwd):/app -p 789:8000 --name python-server exec-python-server
```

Working with named volumes:
````
docker run node -v folder:/app/folderincontainer
````

Read a volume from other container:
```
docker container run -it --volumes-from=python-server debian cat /log/http-server.log
```

Read-only volumes:
````
docker run $(pwd):/app:ro img
````


Removing volumes:
````
docker volume rm volume_name
docker volume prune
````


Tag an image:

```
docker image tag ex-test account/ex-test:1.0
docker login --username=username
docker image push account/ex-test:1.0
```

Working with multi-containers and verify logs using docker-compose:

```
docker-compose up -d
docker-compose down
docker-compose logs -f -t
```

List the networks and drivers available in the host:

```
docker network ls
docker container run -d --net not debian
docker network inspect bridge
docker container exec -it container1 ping container2
docker network create --driver bridge new_network
docker container run -d --name container3 --net new_network alpine sleep 1000
docker network connect bridge container3 # container3 can access bridge and new_network
docker container exec -it container3 ifconfig
docker contaner exec -it container3 ping 172.17.0.2
docker network disconect bridge container3
```

Execute a Postgre SQL command:
```
docker-compose exec db psql -U postgres -c '\l'
docker-compose exec db psql -U postgres -f /scripts/check.sql
docker-compose exec db psql -U postgres -d email_sender -c 'select * from emails' 
```

Scale multiple instances of a service (e.g. worker service):
```
docker-compose up -d --scale worker=5
```

Build a Nodejs structure:

```
npm init -y
npm i --save ##libraries## ex: express
```

Copying files in/out containers:
````
docker cp localfolder/. containername:/folder
docker cp containername:/folder localfolder
````

Build an image with name and tag:

````
docker build -t name:latesttag .
````

Run in interactive and attached mode:
````
docker run -it test
docker start -a -i test
````

Getting the container automatically removed when it is stopped:
```
docker run node -rm
```

Attach to a running container:
````
docker container attach test
````

In the case you have some 401 (Unauthorized error) when trying to build/pull the image from DockerHub:

````
docker logout
docker login --username yourusername
````

Delete local images:
`````
docker image prune -a
`````

Push/pulling images using DockerHub:

````
docker tag oldname:tag dockerhubuser/newname:tag
docker push fabioono25/test:latest  
docker pull fabioono25/test:latest  
````

## Types of External Data Storages [9-PythonInteractiveMode]

The longer internal path of the defined volumes will be evaluated with high-priority:

- Anonymous Volumes: managed by Docker. Docker generates a volume during the container execution. Data is persisted while this container exists (running or not):

````
docker run -p 3000:80 --rm --name feedback-app -v /app/node_modules feedback-node
````

- Named Volumes: managed by Docker. the volume is defined by the developer. Greate for data that should be persisted even when the container is removed.

````
docker run -p 3000:80 --rm --name feedback-app -v feedback:/app/feedback feedback-node
````

- Bind Mounts: managed by the user. The folder is defined on your host machine. Good for persistent, editable data (e.g. source code).

````
docker run -p 3000:80 --rm --name feedback-app -v feedback:/app/feedback -v $(PWD):/app:ro -v /app/node_modules -v /app/temp feedback-node
````

## Working with Environment Variables and Arguments [9-PythonInteractiveMode]

````
# define a port in Dockerfile:

ENV PORT 80
EXPOSE $PORT
docker run --env PORT=newValue image
````

It is possible to specify a .env file:

````
PORT=8000

docker run --env-file ./.env image
````

It is possible to specify arguments :

````

# define the argument in Dockerfile (e.g. you can build in different environments)
ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

docker run --build-arg DEFAULT_PORT=8000 image
````

## Container Communication (networking)

They are three types of communication using containers:

- Container to WWW communication: the HTTP communication with an external URL is automatic (from inside the container to the outside website/webapi). No specific setup required.

- Container to host machine communication: we can remove the host URL from something server to an specific address recognized by Docker. Here is the example:
  - mongodb://localhost:27017/favorites
  - mongodb://host.docker.internal:27017/favorites

- Container to Container communication: they are two approaches here. 
  1. First: Extract the IP service from the container you are running, and use it in the address. Using the MongoDB container running locally, it will work like this:
     - Running the command *docker container inspect mongodb*
     - Extract the IP from the property *NetworkSettings -> IPAddress*
     - Replace the IP in the URL:  mongodb://IP_ADDRESS_FROM_CONTAINER:27017/favorites
     - Build the image
  
  2. Using Container Networks: create a common place where the containers will recognize each others:
     - Create a network manually using the command *docker network create favorites-net*
     - Run the first container, using the network attribute: *docker run -d --name mongodb --network favorites-net mongo*
     - Replace the IP with the container name representing mongo in the URL:  mongodb://mongodb:27017/favorites
     - Build the image: *docker build -t favorites-node .*
     - Run the second container, using the network attribute: *docker run --name favorites --network favorites-net -d --rm -p 3000:3000 favorites-node*

![](https://github.com/fabioono25/tools_plugins/blob/main/assets/networking.png)

![](https://github.com/fabioono25/tools_plugins/blob/main/assets/networking.png)

Types of drives when creating a network:

````
docker network create --driver driver_name my-net
````

- bridge (default): containers can find each other in the network.
- host: standalone containers, isulation between container and host system is remoted (share localhost in your network).
- overlay: multiple Docker daemons will be able to connect with each other (Swarm mode should be activated).
- mcvlan: set a custom MAC address to a container.
- none: add networks disabled.
- Third-party plugins: you can make use of them either.

## Docker Compose commands:

````
# build images in the docker-compose file
docker-compose build

# build all befores starting containers
docker-compose up --build

# build, creates the containers and start them
docker-compose up

# stop containers and remove them (without volumes)
docker-compose down

# stop containers and remove them (with volumes)
docker-compose down -v

````


## Observation:

Dockerfile: describes how to build Docker images.
docker-compose: used to run Docker containers.

