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
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'github_woyao', url: 'https://github.com/woyaowoyao/hipster4FSD.git']]])
              	sh "pwd"
             	sh 'mvn --version'
              //  sh 'mvn install'
             //  }
            }             
        }
        stage('build-users-service') {
            steps {
			  dir('./user-auth') {
             	sh "pwd"
             	//sh 'mvn --version'
                sh 'mvn clean package -Dmaven.test.skip=true'
				sh 'build -t robin9999/users:sba1 .'
				}
            }
        }
        stage('build-gateway') {
            steps {
			  dir('./zuul-gateway') {
             	sh "pwd"
             	//sh 'mvn --version'
                sh 'mvn clean package -Dmaven.test.skip=true'
				sh 'build -t robin9999/zuulgateway:sba1 .'
				}
            }
        }		
        stage('build-trainings') {
            steps {
			  dir('./trainings') {
             	sh "pwd"
             	//sh 'mvn --version'
                sh 'mvn clean package -Dmaven.test.skip=true'
				sh 'build -t robin9999/trainings:sba1 .'
				}
            }
        }
        stage('build-payments') {
            steps {
			  dir('./payments') {
             	sh "pwd"
             	//sh 'mvn --version'
                sh 'mvn clean package -Dmaven.test.skip=true'
				sh 'docker build -t robin9999/payments:sba1 .'
				}
            }
        }		
        stage('build-technology') {
            steps {
			  dir('./technology-skill') {
             	sh "pwd"
             	//sh 'mvn --version'
                sh 'mvn clean package -Dmaven.test.skip=true'
				sh 'docker build -t robin9999/technology:sba1 .'
				}
            }
        }
		stage('build-FrontEnd') {
            steps {
			  dir('./FrontEnd') {
             	sh "pwd"             	
				sh 'docker build -t robin9999/FrontEnd:sba1 .'
				}
            }
        }
		stage('build-registry') {
            steps {
			  dir('./service-registry') {
             	sh "pwd"             	
				sh 'docker build -t robin9999/service-registry:sba1 .'
				}
            }
        }
		stage('docker-compose-up') {
            steps {
			  dir('./docker-compose') {
             	sh "pwd"             	
				sh ' docker-compose -f docker-compose.yml up -d'
				}
            }
        }		
    }
}