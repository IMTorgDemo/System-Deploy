
'''
# PySpark Script with Spark-MongoDb Plugin

This script outlines how to use spark-mongo plugin to save documents to mongo.  Getting the plugin to work is challenging, and is [documented on stackoverflow](https://stackoverflow.com/questions/33391840/getting-spark-python-and-mongodb-to-work-together).

```
(host) sudo docker pull zero323/mongo-spark
(host)$ sudo docker run -i -t --link data_store:mongo zero323/mongo-spark:master /bin/bash
(docker)$ pyspark --jars ${JARS} --driver-class-path ${SPARK_DRIVER_EXTRA_CLASSPATH}
```


'''

import pymongo
import pymongo_spark
mongo_url = 'mongodb://mongo:27017/'
client = pymongo.MongoClient(mongo_url)
client.foo.bar.insert_many([{"x": 1.0, "y": -1.0}, {"x": 0.0, "y": 4.0}])
client.close()

