# TOOLS AND PLUGINS

This is a compilation of examples with tools, plugins, packages that I've been using in my projects during the years.


# Docker Projects

It is a compilation of notes/projets related to Docker.

## Commands

Running a container based on Nginx [1-SimpleTest]:

````
docker image build -t name
docker container run -p 1234:80 name 
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

Read a volume from other container:
```
docker container run -it --volumes-from=python-server debian cat /log/http-server.log
```

Tag an image:

```
docker image tag ex-test account/ex-test:1.0
docker login --username=username
docker image push account/ex-test:1.0
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

Build a Nodejs structure:

```
npm init -y
npm i --save ##libraries## ex: express
```

Observation:

Dockerfile: describes how to build Docker images.
docker-compose: used to run Docker containers.

