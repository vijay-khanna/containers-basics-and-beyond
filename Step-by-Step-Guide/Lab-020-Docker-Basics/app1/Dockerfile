FROM centos:latest
MAINTAINER : Vijay Khanna

RUN mkdir /node
WORKDIR /node

RUN yum -y install httpd
RUN echo "Hello World" > /var/www/html/index.html
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
EXPOSE 80