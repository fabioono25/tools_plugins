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