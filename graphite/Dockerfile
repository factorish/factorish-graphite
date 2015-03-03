# This file creates a container that runs Graphite
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
  curl -sSL https://bootstrap.pypa.io/get-pip.py | python && \
    pip install whisper \
    carbon \
    graphite-web \
    'Twisted<12.0' \
    'django<1.6' \
    django-tagging

# Expose ports.
EXPOSE 80 2003 2004 7002

# Define working directory.
WORKDIR /app

VOLUME /opt/graphite/storage

# Define default command.
CMD ["/app/bin/boot"]

ADD . /app

RUN \
  mkdir -p /app/wsgi && \
  useradd -d /app -c 'application' -s '/bin/false' app && \
  chmod +x /app/bin/* && \
  chown -R app:app /app && \
  chown -R app:app /opt/graphite && \
  rm -f /etc/apache2/sites-enabled/*
