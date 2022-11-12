Commands:

````
docker build -t node-dep-example .
docker run -d --rm --name node-dep -p 80:80 node-dep-example
````
&nbsp;&nbsp;

Working with EC2:

EC2 > Instances > Launch an instance > Linux 64-bit t2.micro (vpc selected + other default configuration) 
Create a new key pair > give a name (download it) > Launch
connect via SSH (Secure Shell) - cryptographic network protocol.
Connect to your instance.

Configuring permissions:

using WSL2 and PyTTY to run SSH commands (Windows) or the terminal for Linux or MacOS:
> chmod 400 example-1.pem # changing access permissions (adding write permissions)
> ssh -i "example-1.pem" ec2-user@assd.us-east-2.compute.amazonaws.com

connection stablished: Amazon Linux 2 AMI

Install Docker in EC2 instance:

````
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
docker run # command working
````

Connect to DockerHub:

````
docker login
username and pwd

docker tag node-dep-example-1 name/repository
docker push name/repository

# inside EC2 terminal:
sudo docker run -d --rm -p 80:80 name/repository
sudo docker ps
sudo docker stop

# update container with a new updated image
sudo docker pull name/repository
sudo docker ps
sudo docker stop old_container
sudo docker run again # new version is pulled
````

Publish on EC2:

EC2 > Security Groups > Choose the security group related to your EC2 instance > Inbound rules > HTTP, Anywhere > Save
EC2 > IPv4 Public IP

An alternative to EC2 and manual processes: AWS ECS (Elastic Container Service) - careful about free tier:

ECS > custom container (name, dockerhub registry, port mappings - 80, tcp, CloudWatch logs)
ECs > Task definition > service (ALB None) > cluster (VPC, Subnets) > Create > View Service > Tasks (verify the created ID) > Public IP in browser

&nbsp;&nbsp;


