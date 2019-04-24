.. _conf-mysql:

Configuring |mysql| for Best Results
********************************************************************************

`Settings for Dashboards <pmm.conf-mysql.settings.dashboard>`_
==================================================================

Not all dashboards in |metrics-monitor| are available by default for all |mysql|
variants and configurations: |oracle|'s |mysql|, |percona-server|. or |mariadb|.
Some graphs require |percona-server|, specialized plugins, or additional
configuration.

Collecting metrics and statistics for graphs increases overhead.  You can keep
collecting and graphing low-overhead metrics all the time, and enable
high-overhead metrics only when troubleshooting problems.

.. seealso::

   More information about |pmm| dashboards
      :ref:`pmm.metrics-monitor`

`MySQL InnoDB Metrics <pmm.conf-mysql.mysql-innodb.metrics>`_
--------------------------------------------------------------------------------

InnoDB metrics provide detailed insight about |innodb| operation.  Although you
can select to capture only specific counters, their overhead is low even when
they all are enabled all the time.  To enable all |innodb| metrics, set the
global variable |opt.innodb-monitor-enable| to ``all``:

.. code-block:: sql

   mysql> SET GLOBAL innodb_monitor_enable=all

.. seealso::

   |mysql| Documentation: |opt.innodb-monitor-enable| variable
      https://dev.mysql.com/doc/refman/5.7/en/innodb-parameters.html#sysvar_innodb_monitor_enable

`MySQL User Statistics <pmm.conf-mysql.user-statistics>`_
--------------------------------------------------------------------------------

User statistics is a feature of |percona-server| and |mariadb|.  It provides
information about user activity, individual table and index access.  In some
cases, collecting user statistics can lead to high overhead, so use this feature
sparingly.

To enable user statistics, set the |opt.userstat| variable to ``1``.

.. seealso::

   |percona-server| Documentation: |opt.userstat|
      https://www.percona.com/doc/percona-server/5.7/diagnostics/user_stats.html#userstat

   |mysql| Documentation
      `Setting variables <https://dev.mysql.com/doc/refman/5.7/en/set-variable.html>`_

`Percona Server Query Response Time Distribution <pmm.conf-mysql.query-response-time>`_
-------------------------------------------------------------------------------------------

Query response time distribution is a feature available in |percona-server|.  It
provides information about changes in query response time for different groups
of queries, often allowing to spot performance problems before they lead to
serious issues.

Note: Query Response Time Plugin can incur significant overhead, and is not recommended for installations performing more than 10k QPS.

To enable collection of data using the query response time plugin:

1. Install the |query-response-time| plugins from the MySQL client:

   .. code-block:: sql
      INSTALL PLUGIN QUERY_RESPONSE_TIME_AUDIT SONAME 'query_response_time.so';
      INSTALL PLUGIN QUERY_RESPONSE_TIME SONAME 'query_response_time.so';
      INSTALL PLUGIN QUERY_RESPONSE_TIME_READ SONAME 'query_response_time.so';
      INSTALL PLUGIN QUERY_RESPONSE_TIME_WRITE SONAME 'query_response_time.so';

#. Then set the global variable |opt.query-response-time-stats| to ``ON``:

   .. code-block:: sql
		   
      SET GLOBAL query_response_time_stats=ON;

.. admonition:: Related Information: |percona-server| Documentation

      - |opt.query-response-time-stats|: https://www.percona.com/doc/percona-server/5.7/diagnostics/response_time_distribution.html#query_response_time_stats
      - Response time distribution: https://www.percona.com/doc/percona-server/5.7/diagnostics/response_time_distribution.html#installing-the-plugins

.. include:: .res/replace.txt
