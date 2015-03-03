# This file creates a container that runs StatsD
#
# Author: Paul Czarkowski
# Date: 02/28/2015

FROM factorish/ubuntu-trusty
MAINTAINER Paul Czarkowski "paul@paulcz.net"

# Base Deps
RUN \
  apt-get -yq update && \
  apt-get -yqq install \
    apache2 \
    apache2-utils \
    libapache2-mod-python \
    libapache2-mod-wsgi \
    sqlite3 \
    python-dev \
    python-pip \
    python-cairo \
    python-pysqlite2 \
    python-mysqldb \
    python-jinja2 \
    software-properties-common

RUN \
  sudo apt-add-repository ppa:chris-lea/node.js && \
  apt-get -yq update && \
  apt-get -yqq install \
    git \
    nodejs && \
  cd /app && \
  git clone git://github.com/etsy/statsd.git

# Expose ports.
EXPOSE 8125/udp

# Define working directory.
WORKDIR /app

# Define default command.
CMD ["/app/bin/boot"]

ADD . /app

RUN \
  mkdir -p /app/wsgi && \
  useradd -d /app -c 'application' -s '/bin/false' app && \
  chmod +x /app/bin/* && \
  chown -R app:app /app

