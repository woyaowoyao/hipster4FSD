FROM  openjdk:8-jre-alpine
VOLUME  /tmp
EXPOSE 9081
ADD ./target/technology-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar","--spring.profiles.active=dev"]
