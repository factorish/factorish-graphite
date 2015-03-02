# This file creates a container that runs InfluxDB
#
# Author: Paul Czarkowski
# Date: 02/28/2015

FROM factorish/ubuntu-trusty
MAINTAINER Paul Czarkowski "paul@paulcz.net"

# Base Deps
RUN \
  apt-get -yq update && \
  apt-get -yqq install \
    python-dev \
    nginx

RUN \
  pip install whisper && \
  pip install carbon && \
  pip install graphite-web

# Expose ports.
EXPOSE 8080

# Define working directory.
WORKDIR /app

# Define default command.
CMD ["/app/bin/boot"]

ADD . /app

RUN \
  useradd -d /app -c 'application' -s '/bin/false' app && \
  chmod +x /app/bin/* && \
  chown -R app:app /app
