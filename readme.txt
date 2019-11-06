1.create new repos in github.com 
git init
git add *
git commit -m "first commit"
git remote add origin https://github.com/woyaowoyao/hipster4FSD.git
git push -u origin master


full stack training test 


payment  
jhipster import-jdl ./my-jdl-file.jh

training
jhipster import-jdl ./train-jdl.jh

jhipster import-jdl SBA-tech.jh


 jhipster entity Technology --skip-server
 
 docker run -d -p 49001:8080 -v /docker_jenkins_home/:/var/jenkins_home/ --name jenkins jenkins:2.60.1
 
 docker run -u root  --rm -d -p 7001:8080 -p 50000:50000 -v jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock  robin9999/blueocean4docker:v1
 
  docker-compose -f app.yml up -d
  
 cd payments & docker build -t robin9999/payments:sba1 . 
 cd user-auth & docker build -t robin9999/users:sba1 . 
 cd Gateway & docker build -t robin9999/mentor-on-demand:sba1 . 
 cd trainings & docker build -t robin9999/trainings:sba1 .
 docker build -t robin9999/technology:sba1 .
 cd.. &  docker-compose -f docker-compose.yml up -d
 down
 
 
 
 cd Gateway & docker build -t robin9999/mentor-on-demand:sba1 . 
 docker run --rm -d -p 8761:8761 jhipster/jhipster-registry:v5.0.2 
 
 
  docker run -u root  --rm -d -p 9083:9083   robin9999/payments:sba1 --net="host"
  docker run -u root  --rm -d -p 9088:9088   robin9999/users:sba1
   docker run --rm -d -p 8761:8761 jhipster/jhipster-registry:v5.0.2 