FROM java
MAINTAINER Dietrich Schulten <ds@escalon.de>
ENTRYPOINT ["/usr/bin/java", "-jar", "/usr/share/order-service/order-service.jar"]

# ADD target/lib /usr/share/frontend/lib
ADD target/order-service.jar /usr/share/order-service/order-service.jar