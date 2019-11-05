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