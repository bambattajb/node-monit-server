# Simple REST API used for collecting system resource data

This is a simple REST API intended to run on a Linux VPS which provides a set of API endpoints that return data on hardware and software usage.

The reason I have built this is because we use a 3rd party monitoring system that can make a request to a URL and trigger an alert if a specific response is given.

Although this depends on the `os-utils` npm package, I have had to adapt this to provide the functionality we need for monitoring disk usage. 

[Link to my fork of os-utils](https://github.com/bambattajb/os-utils)

##Usage

Assuming you have `NodeJS` and `NPM` installed, download this package and run

````
npm install
````

Next, run the following command to create the service deamon

````
node install.js
````

Now you can run the app as a service daemon

````
sudo service nscclient start
sudo service nscclient stop
````

Starting the service will create a web server server on port `9090`

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

### Update Log
0.0.1 - First commit
0.0.2 - Added ability to use as Linux Service