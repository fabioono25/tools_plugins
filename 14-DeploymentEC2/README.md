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
````

&nbsp;&nbsp;


