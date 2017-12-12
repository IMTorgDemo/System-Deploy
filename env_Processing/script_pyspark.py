
'''
# PySpark Script with Spark-MongoDb Plugin

This script outlines how to use spark-mongo plugin to save documents to mongo.  Getting the plugin to work is challenging, and is [documented on stackoverflow](https://stackoverflow.com/questions/33391840/getting-spark-python-and-mongodb-to-work-together).

__Manual__
(host) sudo docker pull zero323/mongo-spark
(host)$ sudo docker run -i -t -v ~/demo_Sim:/home/ --name pyspark --link data_store:mongo zero323/mongo-spark:master /bin/bash
(docker)$ pyspark --jars ${JARS} --driver-class-path ${SPARK_DRIVER_EXTRA_CLASSPATH}

__External__
sudo docker run -d -it -v ~/demo_Sim:/home/ --name pyspark --link data_store:mongo zero323/mongo-spark:master
sudo docker exec  pyspark /usr/local/spark/bin/spark-submit --jars ${JARS} --driver-class-path ${SPARK_DRIVER_EXTRA_CLASSPATH} /home/env_Processing/script_pyspark.py

'''


# Config
import pyspark
sc = pyspark.SparkContext('local[*]')
sDir = '/home/env_Processing/data_shared'

# Extract
from pyspark.sql import SQLContext
sqlContext = SQLContext(sc)
df = sqlContext.read.json(sDir)

# Transform
df.registerTempTable('info')
trkr = sqlContext.sql('SELECT * FROM info WHERE tracker is not null')
cnt = trkr.count()
data = {'x':1, 'y':cnt} 

# Load
import pymongo
import pymongo_spark
mongo_url = 'mongodb://mongo:27017/'
client = pymongo.MongoClient(mongo_url)
client.foo.bar.insert_many([data])
client.close()

