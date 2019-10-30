FROM java:alpine
VOLUME /tmp
ADD service-registry-1.0-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
