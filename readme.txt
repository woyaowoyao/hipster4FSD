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
 jhipster entity PaymentRecord --skip-server
 jhipster entity Mentor --skip-server
 
 docker run -d -p 49001:8080 -v /docker_jenkins_home/:/var/jenkins_home/ --name jenkins jenkins:2.60.1
 
 docker run -u root  --rm -d -p 7001:8080 -p 50000:50000 -v jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock  robin9999/blueocean4docker:v1
 
  docker-compose -f app.yml up -d
  
 cd payments & docker build -t robin9999/payments:sba1 . 
 cd user-auth & docker build -t robin9999/users:sba1 . 
 cd zuulgateway & docker build -t robin9999/zuulgateway:sba1 . 
 cd trainings & docker build -t robin9999/trainings:sba1 .
 docker build -t robin9999/technology:sba1 .
 cd.. &  docker-compose -f docker-compose.yml up -d
 down
 
 
cd docker-compose  docker-compose -f docker-registry.yml up -d
 
 
 cd Gateway & docker build -t robin9999/mentor-on-demand:sba1 . 
 docker run --rm -d -p 8761:8761 jhipster/jhipster-registry:v5.0.2 
 
 docker run -u root  --rm -d -p 9088:9088   robin9999/users:sba1 --net="host"
  docker run -u root  --rm -d -p 9083:9083   robin9999/payments:sba1 --net="host"
   docker run -u root  --rm -d -p 9087:9087   robin9999/zuulgateway:sba1 --net="host"
  docker run -u root  --rm -d -p 9084:9084   robin9999/trainings:sba1 --net="host"
  docker run -u root  --rm -d -p 9088:9088   robin9999/users:sba1 --net="host"
   docker run --rm -d -p 8761:8761 jhipster/jhipster-registry:v5.0.2 
   
a.docker 文件说明
-a----        2019/11/9     15:22            672 docker-compose-dev.yml  //dev profile docker comp file 集成独立完整文件
-a----        2019/11/9     13:22            230 docker-compose-eureka.yml  //dev profile 本地开发使用，仅包含eurek docker
-a----        2019/11/9     15:13            246 docker-compose-payments-dev.yml 
-a----        2019/11/9     15:14            250 docker-compose-technology-dev.yml
-a----        2019/11/9     15:11            248 docker-compose-trainings-dev.yml
-a----        2019/11/9     14:11            446 docker-compose-users-dev.yml
-a----        2019/11/9     12:51            926 docker-compose-users-pro.yml //不工作，后面可以使用mysql 作为dev profile 进行替换处理
-a----        2019/11/9     15:17            254 docker-compose-zuulgateway-dev.yml
-a----        2019/11/9     15:17            451 docker-compose.yml
b.以下为步骤演示  
1  docker-compose -f .\docker-compose-eureka.yml up -d
2.cd zuulgateway & mvn clean package & docker build -t zuulgateway:dev .
   
 docker-compose -f docker-compose-zuulgateway-dev.yml  up -d
 docker-compose -f docker-compose-zuulgateway-dev.yml  down
  
3.cd users & mvn clean package & docker build -t users:dev .  
4 docker-compose -f docker-compose-users-dev.yml  up -d
 docker-compose -f docker-compose-users-dev.yml  down
   
  docker run -u root  --rm -d -p 9084:9084   robin9999/trainings:sba1 --network bridge   $(cat /etc/hosts|awk -F ' ' '{if(NR>2){print "--add-host "$2":"$1}}')  --name trainings1 
  
  
  
  2019-11-10 过期文件夹
  Gateway
  gateway-jwt
  gateway-jwt2
  gateway-jwt-ng
  users
  technology
  2019-11-10 过期文件夹
  
   apk add bash wget curl