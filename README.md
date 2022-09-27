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

