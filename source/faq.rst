:orphan: true

.. _faq:

================================================================================
Frequently Asked Questions
================================================================================

.. contents::
   :local:
   :depth: 1

How can I contact the developers?
================================================================================

The best place to discuss PMM with developers and other community members
is the `community forum <https://www.percona.com/forums/questions-discussions/percona-monitoring-and-management>`_.

If you would like to report a bug,
use the `PMM project in JIRA <https://jira.percona.com/projects/PMM>`_.

.. _sys-req:

What are the minimum system requirements for PMM?
================================================================================

.. rubric:: |pmm-server|

Any system which can run Docker version 1.12.6 or later.

It needs roughly 1 GB of storage for each monitored database node
with data retention set to one week.

.. note::

   By default, :ref:`retention <data-retention>` is set to 30 days for
   Metrics Monitor and for Query Analytics.  Also consider
   :ref:`disabling table statistics <performance-issues>`, which can
   greatly decrease Prometheus database size.

Minimum memory is 2 GB for one monitored database node, but it is not
linear when you add more nodes.  For example, data from 20 nodes
should be easily handled with 16 GB.

.. rubric:: |pmm-client|

Any modern 64-bit Linux distribution. It is tested on the latest
versions of Debian, Ubuntu, CentOS, and Red Hat Enterprise Linux.

Minimum 100 MB of storage is required for installing the |pmm-client|
package.  With good constant connection to |pmm-server|, additional
storage is not required.  However, the client needs to store any
collected data that it is not able to send over immediately, so
additional storage may be required if connection is unstable or
throughput is too low.

.. _data-retention:

How to control data retention for PMM?
================================================================================

By default, both |prometheus| and QAN store time-series data for 30 days.

Depending on available disk space and your requirements,
you may need to adjust data retention time.

You can control data retention by the following way.

#. Select the |pmm-settings| dashboard in the main menu.

   .. figure:: .res/graphics/png/pmm-add-instance.png

      Choosing the |pmm| *Settings* menu entry

#. In the *Settings* section, enter new data retention value in seconds.

   .. figure:: .res/graphics/png/pmm.settings_settings.png

      Entering data retention on the *Settings dashboard*

#. Click the *Apply changes* button.

How often are nginx logs in PMM Server rotated?
================================================================================

|pmm-server| runs ``logrotate`` to rotate nginx logs on a daily basis
and keep up to 10 latest log files.

.. only:: showhidden

	.. _performance-issues:

	What are common performance considerations?
	================================================================================

	If a MySQL server has a lot of schemas or tables,
	it is recommended to disable per table metrics when adding the instance:

	.. prompt:: bash

	   sudo pmm-admin add mysql --disable-tablestats

	.. note:: Table statistics are disabled automatically
	   if there are over 1 000 tables.

	For more information, run as root
	|pmm-admin.add|
	|opt.mysql|
	|opt.help|.

.. _privileges:

What privileges are required to monitor a |mysql| instance?
================================================================================

See :ref:`pmm.conf-mysql.user-account.creating`.

Can I monitor multiple service instances?
================================================================================

Yes, you can add multiple instances of |mysql| or some other service to be
monitored from one |pmm-client|. In this case, you will need to provide a
distinct port and socket for each instance, and specify a unique name for each
instance (by default, it uses the name of the |pmm-client| host).

For example, if you are adding complete MySQL monitoring for two local |mysql|
servers, the commands could look similar to the following:

.. code-block:: bash

   $ sudo pmm-admin add mysql --username root --password root instance-01 127.0.0.1:3001
   $ sudo pmm-admin add mysql --username root --password root instance-02 127.0.0.1:3002

For more information, run

.. code-block:: bash

   $ pmm-admin add mysql --help

Can I rename instances?
================================================================================

You can remove any monitoring instance as described in :ref:`pmm-admin.rm`
and then add it back with a different name.

When you remove a monitoring service, previously collected data remains
available in |grafana|.  However, the metrics are tied to the instance name.  So
if you add the same instance back with a different name, it will be considered a
new instance with a new set of metrics.  So if you are re-adding an instance and
want to keep its previous data, add it with the same name.

Can I add an AWS RDS MySQL or Aurora MySQL instance from a non-default AWS partition?
=====================================================================================

By default the RDS discovery works with the default ``aws`` partition. But you
can switch to special regions, like the `GovCloud <https://aws.amazon.com/ru/govcloud-us/>`_ one, with the alternative `AWS partitions <https://docs.aws.amazon.com/sdk-for-go/api/aws/endpoints/#pkg-constants>`_ (e.g. ``aws-us-gov``) adding them to the *Settings* via the `PMM Server API <https://www.percona.com/doc/percona-monitoring-and-management/2.x/manage/server-pmm-api.html>`_:

.. figure:: .res/graphics/png/aws-partitions-in-api.png

You can specify any of them instead of the ``aws`` default value, or use several
of them, with the JSON Array  syntax: ``["aws", "aws-cn"]``.

.. _troubleshoot-connection:

How to troubleshoot communication issues between PMM Client and PMM Server?
================================================================================

Broken network connectivity may be caused by rather wide set of reasons.
Particularly, when :ref:`using Docker <run-server-docker>`, the container is
constrained by the host-level routing and firewall rules. For example, your
hosting provider might have default *iptables* rules on their hosts that block
communication between |pmm-server| and |pmm-client|, resulting in *DOWN* targets
in Prometheus. If this happens, check firewall and routing settings on the
Docker host.

Also |pmm| is able to generate a set of diagnostics data which can be examined
and/or shared with Percona Support to solve an issue faster. You can get
collected logs from PMM Client using the ``pmm-admin summary`` command. 
Obtaining logs from PMM Server can be done `by specifying the
``https://<address-of-your-pmm-server>/logs.zip`` URL, or by clicking
the ``server logs`` link on the `Prometheus dashboard <https://www.percona.com/doc/percona-monitoring-and-management/2.x/dashboards/dashboard-prometheus.html>`_:

.. image:: .res/graphics/png/get-logs-from-prometheus-dashboard.png

.. _metrics-resolution:

What resolution is used for metrics?
================================================================================

MySQL metrics are collected with different resolutions (5 seconds, 5 seconds,
and 60 seconds by default). Linux and MongoDB metrics are collected with 1
second resolution.

In case of bad network connectivity between |pmm-server| and |pmm-client| or
between |pmm-client| and the database server it is monitoring, scraping every
second may not be possible when latency is higher than 1 second.

You can change the minimum resolution for metrics by the following way:

#. Select the |pmm-settings| dashboard in the main menu.

   .. figure:: .res/graphics/png/pmm-add-instance.png

      Choosing the |pmm| *Settings* menu entry

#. In the *Settings* section, choose proper metrics resolution with the slider.
   The tooltip of the slider will show you actual resolution values.

   .. figure:: .res/graphics/png/pmm.settings_settings.png

      Choosing metrics resolution on the *Settings dashboard*

#. Click the *Apply changes* button.

.. note:: Consider increasing minimum resolution
   when |pmm-server| and |pmm-client| are on different networks,
   or when :ref:`pmm.amazon-rds`.

.. include:: .res/replace.txt

