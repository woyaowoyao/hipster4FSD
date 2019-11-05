pipeline {
    agent {
        docker {
            image 'maven:3.5-jdk-8'
            args '-v /var/lib/jenkins/.m2:/root/.m2 -v /usr/bin/docker:/usr/bin/docker -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose'
        }
    }
    stages {
     	stage('pull code') {
            steps {
               sh "pwd"
               //dir("${env.WORKSPACE}/Gateway"){
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'github_woyao', url: 'http://github.com/woyaowoyao/hipster4FSD.git']]])
              	sh "pwd"
             	sh 'mvn --version'
                sh 'mvn install'
             //  }
            }             
        }
        stage('Build') {
            steps {
             	sh "pwd"
             	sh 'mvn --version'
                //sh 'mvn clean install -Dmaven.test.skip=true'
            }
        }     
        stage('ReleaseAppDocker') {
            steps {  
            dir('./Gateway') {
            	sh 'mvn clean package'
            }           
            dir('./users') {
            		sh "pwd"
            		//sh "chmod +x *.sh"
            		//sh 'mvn dockerfile:build'
            		//sh "./build.sh"
            		sh 'mvn spring-boot:run'
            	}         	
            }   
        }      
    }
}