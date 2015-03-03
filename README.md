Factorish-Graphite
==================

About
-----

An example Graphite application built using the [factorish](http://github.com/factorish/factorish) toolkit.

This will spin up a CoreOS VM in vagrant and then proceed to build and deploy a graphite container and a statsd container.  It will also launch and run a local docker registry to cache the containers and a `registrator` container which helps with the service discovery.

It uses etcd and confd to automatically configure both graphite and statsd to talk to eachother.

The images are all cached on the host under `registry/` you can clean it out by running `./clean_registry` on your host.

Using
-----

### Start Graphite/Statsd

```
$ git https://github.com/factorish/factorish-graphite.git
$ cd factorish-graphite
$ vagrant up
rewriting userdata
Bringing machine 'core-01' up with 'virtualbox' provider...
==> core-01: Importing base box 'coreos-beta'...
==> core-01: Matching MAC address for NAT networking...
...
==> core-01: ++ echo Creating a Private Registry
==> core-01: Creating a Private Registry
...
$ vagrant ssh core-01
$ journalctl -f -u factorish-graphite
```

This will spin up the VM and watch for graphite to be built and started.   Once the logs indicate that graphite is running you can `CTRL-C` out of the logs and access graphite via `http://localhost:8080`.

You can send test metrics to graphite via statsd by running:

```
$ echo "foo:1|c" | nc -u -w0 127.0.0.1 8125
```

### Troubleshooting

If you get `500 - server error` when accessing graphite it may be in a weird state with the shitty mysqlite database.  This can be fixed by killing apache in the container which will be restarted by supervisord and the race condition should clear up.

```
$ vagrant ssh core-01
$ graphite
$ ps aux | apache
$ kill $PID
```

### useful commands

These can all be run from inside the coreos VM.

* `kill_graphite` - kill and remove the graphite container
* `build_graphite` - rebuild the graphite container
* `run_graphite` - run the graphite container
* `graphite` - get a shell prompt in the graphite container
* `kill_statsd` - kill and remove the statsd container
* `build_statsd` - rebuild the statsd container
* `run_statsd` - run the statsd container
* `statsd` - get a shell prompt in the statsd container

Author(s)
======

Paul Czarkowski (paul@paulcz.net)

License
=======

Copyright 2015 Paul Czarkowski

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
