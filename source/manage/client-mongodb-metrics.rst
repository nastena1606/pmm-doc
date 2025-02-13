.. _pmm.pmm-admin.mongodb.add-mongodb:

`Adding MongoDB Service Monitoring <pmm-admin.html#pmm-pmm-admin-mongodb-add-mongodb>`_
========================================================================================

Before adding MongoDB should be `prepared for the monitoring <https://www.percona.com/doc/percona-monitoring-and-management/2.x/conf-mongodb.html>`_, which involves creating the user, and setting the profiling level.

When done, add monitoring as follows:

  .. code-block:: bash

     pmm-admin add mongodb --username=pmm --password=pmm

where username and password are credentials for the monitored MongoDB access,
which will be used locally on the database host. Additionally, two positional
arguments can be appended to the command line flags: a service name to be used
by PMM, and a service address. If not specified, they are substituted
automatically as ``<node>-mongodb`` and ``127.0.0.1:27017``.

The command line and the output of this command may look as follows:

  .. code-block:: bash

     # pmm-admin add mongodb --username=pmm --password=pmm mongo 127.0.0.1:27017
     MongoDB Service added.
     Service ID  : /service_id/f1af8a88-5a95-4bf1-a646-0101f8a20791
     Service name: mongo

Beside positional arguments shown above you can specify service name and
service address with the following flags: ``--service-name``, ``--host`` (the
hostname or IP address of the service), and ``--port`` (the port number of the
service). If both flag and positional argument are present, flag gains higher
priority. Here is the previous example modified to use these flags::

     pmm-admin add mongodb --username=pmm --password=pmm --service-name=mongo --host=127.0.0.1 --port=27017

.. only:: showhidden

	.. code-block:: text

	   $ pmm-admin add mongodb --use-profiler --username=pmm --password=pmm \
	    --cluster='MongoDBCluster1' \
		--replication-set='MongoDBReplSet2' \
		--environment='Production' \
		--custom-labels='az=sfo2' \
		mongodb1 \
		127.0.0.1:27017

	where username and password are credentials for the monitored MongoDB access, 
	* --use-profiler - enable query capture
	* --username - MongoDB username
	* --password - MongoDB Password
	* --cluster - MongoDBCluster1
	* --replication-set - MongoDBReplSet1
	* --environment - Production, Staging, Development
	* --custom-labels - arbitrary key=value pairs
	which will be used locally on the database host.

	You can then check your MySQL and MongoDB dashboards and Query Analytics in order to view your server’s performance information.

	.. _pmm-admin.add.mongodb-metrics.options:

	.. rubric:: OPTIONS

	The following options can be used with the |opt.mongodb-metrics| alias:

	|opt.cluster|
	  Specify the MongoDB cluster name. 

	|opt.uri|
	  Specify the MongoDB instance URI with the following format::

	   [mongodb://][user:pass@]host[:port][/database][?options]

	  By default, it is ``localhost:27017``.

	You can also use
	:ref:`global options that apply to any other command
	<pmm-admin.options>`,
	as well as
	:ref:`options that apply to adding services in general
	<pmm-admin.add-options>`.

	For more information, run
	|pmm-admin.add|
	|opt.mongodb-metrics|
	|opt.help|.

	.. _pmm-admin.add.mongodb-metrics.cluster.monitoring:

	.. rubric:: Monitoring a cluster

	When using |pmm| to monitor a cluster, you should enable monitoring for each
	instance by using the |pmm-admin.add| command. This includes each member of
	replica sets in shards, mongos, and all configuration servers. Make sure that
	for each instance you supply the cluster name via the |opt.cluster| option and
	provide its URI via the |opt.uri| option.

	|tip.run-this.root|. This examples uses *127.0.0.1* as a URL.

	.. code-block:: bash

	   $ pmm-admin add mongodb:metrics \
	   --uri mongodb://127.0.0.1:<port>/admin <instance name> \
	   --cluster <cluster name>

	.. seealso::

	   Essential |mongodb| configuration 
	      :ref:`pmm.qan-mongodb.conf`
	   

.. include:: ../.res/replace.txt
