


# Simulation of Simple A/B Testing

This system consists of several scripts and applications that simulate a web page A/B Testing scenario.

The data workflow consists of the following steps:

* start node WebApp listening
* start python Requestor simulation of users hitting the web app
* WebApp log files (config:10KB each) are saved to `env_Processing/data_shared` 
* pySpark processes each new batch (config:every X secconds) using AirFlow
* results are saved to MongoDb
* WebApp pulls data and presents in a graph

[TOC]


The system uses the following frameworks:

* Python, Node/Express, D3
* PM2
* PySpark
* MongoDb
* AirFlow


__Note__

* Each service is maintained in its own docker container
* Each service has its own dependencies and documentation
* Troubleshoot configurations, such as ip address, using the following command: `docker inspect <name>`




# Installation

__Warning:__ the repo must be run from the `/home/<user>/` directory; otherwise, errors will occur with the docker configurations and permissions with respect to the shared volume.


### Node & Web App
```
git clone <this directory>
npm install
npm run test
npm run docker
```


### Mongo

[mongo lib](https://hub.docker.com/r/library/mongo/)

`docker pull mongo`
`docker run --name data_store -d mongo`
Get the ipaddress using: `docker inspect data_store`

Take a look around, if necessary: `docker exec -it data_store mongo`




### WebApp - Mongo Link ????
[reference for various docker configurations](http://www.ifdattic.com/how-to-mongodb-nodejs-docker/)
create a container which has all the required data mounted and is linked to mongo container. 
`docker run --name web_app --link data_store:mongo -d node_app`
`docker run -it --name node -v "$(pwd)":/data --link mongo:mongo -w /data -p 8082:8082 node bash`
```
// Ways to connect to MongoDb
// Original connect
MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
    // ...
});
// Connect using environment variables
MongoClient.connect('mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT+'/blog', function(err, db) {
    // ...
});
// Connect using hosts entry
MongoClient.connect('mongodb://mongo:27017/blog', function(err, db) {
    // ...
});

```


### Spark-Mongo Processing

```
sudo docker run -i -t -v ~/demo_Sim:/home/  --link data_store:mongo zero323/mongo-spark:master /bin/bash
pyspark --jars ${JARS} --driver-class-path ${SPARK_DRIVER_EXTRA_CLASSPATH}
```

### Spark-Jupyter Reporting

[](https://hub.docker.com/r/jupyter/all-spark-notebook/)

`docker pull jupyter/all-spark-notebook`

```
mkdir ~/data
sudo docker run -ti --rm --user root -v ~/demo_Sim:/home/jovyan/work -p 8888:8888 -e NB_UID=1000 -e NB_GID=100 -e GRANT_SUDO=yes  jupyter/all-spark-notebook
sudo docker exec -it 3783e6eff869 bash
```

[jupyter lab]()
`sudo docker run -it --rm -p 8888:8888 jupyter/all-spark-notebook start.sh jupyter lab`








### Scheduler

[crontab](https://www.howtogeek.com/101288/how-to-schedule-tasks-on-linux-an-introduction-to-crontab-files/)
[airflow-tut](http://michal.karzynski.pl/blog/2017/03/19/developing-workflows-with-apache-airflow/)
[airflow-docs](https://airflow.apache.org/installation.html)

Task scheduler for running spark scripts, cyclically.

```
#sch_process.bash
sudo docker run -d -it -v ~/demo_Sim:/home/ --name pyspark --link data_store:mongo zero323/mongo-spark:master
sudo docker exec  pyspark /usr/local/spark/bin/spark-submit --jars ${JARS} --driver-class-path ${SPARK_DRIVER_EXTRA_CLASSPATH} /home/env_Processing/script_pyspark.py
```

```crontab
1 * * * * /home/jason/demo_Sim/sch_process.bash
```




# Testing


# Running

Enter the Requestor directory

```
pipenv shell
pipenv install 
pipenv run python Requestor.py
```




END
