# This file creates a container that runs InfluxDB
#
# Author: Paul Czarkowski
# Date: 02/28/2015

FROM factorish/ubuntu-trusty
MAINTAINER Paul Czarkowski "paul@paulcz.net"

# Base Deps
RUN \
  wget -q -O /tmp/influxdb.deb http://s3.amazonaws.com/influxdb/influxdb_latest_amd64.deb && \
  dpkg -i /tmp/influxdb.deb && \
  rm /tmp/influxdb.deb

# Expose ports.
EXPOSE 8083 8086 8090 8099

# Define working directory.
WORKDIR /app

# Define default command.
CMD ["/app/bin/boot"]

ADD . /app

RUN \
  useradd -d /app -c 'application' -s '/bin/false' app && \
  chmod +x /app/bin/* && \
  chown -R app:app /app && \
  chown -R app:app /opt/influxdb
