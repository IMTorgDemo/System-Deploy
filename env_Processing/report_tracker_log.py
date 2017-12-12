
# coding: utf-8

# [install](https://github.com/mongodb/mongo-hadoop/blob/master/spark/src/main/python/README.rst)

# In[1]:


import pyspark
sc = pyspark.SparkContext('local[*]')

# test
rdd = sc.parallelize(range(1000))
rdd.takeSample(False, 5)


# In[3]:


get_ipython().system(' ls data_shared')


# In[4]:


get_ipython().system(' head data_shared/myapp-info.log.1')


# In[5]:


from pyspark.sql import SparkSession

spark = SparkSession     .builder     .appName("Python Spark SQL basic example")     .config("spark.some.config.option", "some-value")     .getOrCreate()


# In[6]:


df = spark.read.json("data_shared/myapp-info.log.1")


# In[7]:


df.printSchema()


# In[8]:


df.head()


# In[9]:


# Register the DataFrame as a global temporary view
df.createGlobalTempView("info")


# In[10]:


# Global temporary view is tied to a system preserved database `global_temp`
dfTrkr = spark.sql("SELECT * FROM global_temp.info WHERE tracker is not null ")
pDf = dfTrkr.toPandas()


# In[11]:


pDf.tracker.count()

