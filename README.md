# Simple client REST API for retrieving system data

This is a simple REST API intended to run on a Linux VPS which provides a set of endpoints that return details of hardware and software states.

The reason I have built this is because we use a 3rd party monitoring system that can make a request to a URL and trigger an alert if a specific response is given.

Although this depends on the `os-utils` npm package, I have had to adapt this to provide the functionality we need for monitoring disk usage. 

[Link to my fork of os-utils](https://github.com/bambattajb/os-utils)

##Usage

Assuming you have `NodeJS` and `NPM` installed, download this package and run

`node server.js`

That will start a server on port `9090`

##API

###CPU

####Get CPU usage (percent) 

````
localhost:9090/api/cpu/usage
````

####Get CPU free (percent)

````
localhost:9090/api/cpu/free`
````

###MEMORY

####Get Memory total (megabyte)

````
localhost:9090/api/ram/total
````

####Get Memory free (megabyte)

````
localhost:9090/api/ram/free
````

####Get Memory free (percent)

````
localhost:9090/api/ram/free/percent
````

###HDISK

####Get Disk Partition Total, Free and Used (megabyte)

````
localhost:9090/api/disk/[partition (ie... sda1)]
````

####Get Disk Partition Free (percentage)

Coming soon

####Get Disk Partition Used (percentage)

Coming soon

###SYSTEM

####Get operating system

````
localhost:9090/api/system/platform
````

####Get uptime (hours)

````
localhost:9090/api/system/uptime
````

####Get CPU average load (minutes)

````
localhost:9090/api/system/load/[period (accepts 1, 5, 15)]
````

###SERVICES

####Check service is running
````
localhost:9090/api/service/[linux job (ie... nginx, mysql)]
````