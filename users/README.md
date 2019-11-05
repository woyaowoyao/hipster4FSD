# users

This application is User Account and Authentication (UAA) Server,  secure microservices with JWT.


## Local

To start your application in the dev profile, simply run:

    ./mvnw



## Building for production

### Packaging as jar

To build the final jar and optimize the users application for production, run:

    ./mvnw -Pprod clean verify

To ensure everything worked, run:

    java -jar target/*.jar

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

    ./mvnw -Pprod,war clean verify

## Using Docker  

 start a mysql database in a docker container, run:

    docker-compose -f src/main/docker/mysql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/mysql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw -Pprod verify jib:dockerBuild
     docker build -f  Dockerfile -t robin9999/users:sba1 .
    docker build .

Then run:

    docker-compose -f src/main/docker/app.yml up -d



