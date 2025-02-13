.. _pmm.glossary-terminology-reference:

Terminology Reference
********************************************************************************

.. _Data-retention:

`Data retention <glossary-terminology.html#Data-retention>`_
--------------------------------------------------------------------------------

      By default, |prometheus| stores time-series data for 30 days,
      and :ref:`QAN <QAN>` stores query data for 8 days.

      Depending on available disk space and your requirements, you may
      need to adjust data retention time.

      You can control data retention via the *Settings* dashboard.


.. _Data-Source-Name:

`Data Source Name <glossary-terminology.html#Data-Source-Name>`_
--------------------------------------------------------------------------------

      A database server attribute found on the :ref:`QAN <QAN>` page. It informs how
      :ref:`PMM <PMM>` connects to the selected database.

.. _DSN:

`DSN <glossary-terminology.html#DSN>`_
--------------------------------------------------------------------------------

      See :ref:`Data Source Name <Data-Source-Name>`

.. _Grand-Total-Time:

`Grand Total Time <glossary-terminology.html#Grand-Total-Time>`_
--------------------------------------------------------------------------------

      Grand Total Time.(percent of grand total time) is the percentage
      of time that the database server spent running a specific query,
      compared to the total time it spent running all queries during
      the selected period of time.

.. _GTT:

`%GTT <glossary-terminology.html#GTT>`_
--------------------------------------------------------------------------------

      See :ref:`Grand Total Time <Grand-Total-Time>`

.. _External-Monitoring-Service:

`External Monitoring Service <glossary-terminology.html#External-Monitoring-Service>`_
---------------------------------------------------------------------------------------

      A monitoring service which is not provided by :ref:`PMM <PMM>` directly. It is
      bound to a running |prometheus| exporter. As soon as such an service is
      added, you can set up the :ref:`Metrics Monitor <Metrics-Monitor>`
      to display its graphs.

.. _Metrics:

`Metrics <glossary-terminology.html#Metrics>`_
--------------------------------------------------------------------------------

      A series of data which are visualized in |pmm|.

.. _Metrics-Monitor:

`Metrics Monitor (MM) <glossary-terminology.html#Metrics-Monitor>`_
--------------------------------------------------------------------------------   

      Component of :ref:`PMM-Server` that provides a historical view of
      :ref:`metrics <Metrics>` critical to a |mysql| server instance.

.. _Monitoring-service:

`Monitoring service <glossary-terminology.html#Monitoring-service>`_
--------------------------------------------------------------------------------

      A special service which collects information from the database instance
      where :ref:`PMM-Client` is installed.

      To add a monitoring service, use the :program:`pmm-admin add` command.

      .. seealso::

	 Passing parameters to a monitoring service
	    :ref:`pmm.pmm-admin.monitoring-service.pass-parameter`

.. _PMM:

`PMM <glossary-terminology.html#PMM>`_
--------------------------------------------------------------------------------

      Percona Monitoring and Management

.. _pmm-admin:

`pmm-admin <glossary-terminology.html#pmm-admin>`_
--------------------------------------------------------------------------------

      A program which changes the configuration of the :ref:`PMM-Client`. See
      detailed documentation in the :ref:`pmm-admin` section.

.. only:: showhidden


	 .. _PMM-annotation:

	 `PMM annotation <PMM-annotation>`_
	 --------------------------------------------------------------------------------

	   A feature of |pmm-server| which adds a special mark to all
	   dashboards and signifies an important event in your
	   application. Annotations are added on the |pmm-client| by using
	   the |pmm-admin.annotate| command.

	   .. seealso::

		 |grafana| Documentation: Annotations

		    http://docs.grafana.org/reference/annotations/

.. _PMM-Client:

`PMM Client <glossary-terminology.html#PMM-Client>`_
--------------------------------------------------------------------------------   

      Collects |mysql| server metrics, general system metrics,
      and query analytics data for a complete performance overview.

      The collected data is sent to :ref:`PMM-Server`.

      For more information, see :ref:`pmm.architecture`.

.. _PMM-Docker-Image:

`PMM Docker Image <glossary-terminology.html#PMM-Docker-Image>`_
--------------------------------------------------------------------------------

      A docker image which enables installing the |pmm-server| by
      using :program:`docker`.

      .. seealso::

	 Installing |pmm-server| using |docker|
	    :ref:`run-server-docker`

.. _PMM-Home-Page:

`PMM Home Page <glossary-terminology.html#PMM-Home-Page>`_
--------------------------------------------------------------------------------

      The starting page of the PMM portal from which you can have an overview of your environment, open the tools of
      PMM, and browse to online resources.

      On the |pmm| home page, you can also find the version number and a button to
      update your |pmm-server| (see :ref:`PMM Version <PMM-Version>`).

.. _PMM-Server:

`PMM Server <glossary-terminology.html#PMM-Server>`_
--------------------------------------------------------------------------------

      Aggregates data collected by :ref:`PMM-Client` and presents it in the
      form of tables, dashboards, and graphs in a web interface.

      |pmm-server| combines the backend API and storage for collected data with
      a frontend for viewing time-based graphs and performing thorough analysis
      of your |mysql| and |mongodb| hosts through a web interface.

      Run |pmm-server| on a host that you will use to access this data.

      .. seealso::

	 PMM Architecture

	    :ref:`pmm.architecture`

.. _PMM-Server-Version:

`PMM Server Version <glossary-terminology.html#PMM-Server-Version>`_
--------------------------------------------------------------------------------

      If :ref:`PMM-Server` is installed via |docker|, you can check
      the current |pmm-server| version by running |docker.exec|:

      |tip.run-this.root|

      .. include:: .res/code/docker.exec.it.pmm-server.head.txt

.. _PMM-user-permissions-for-AWS:

`PMM user permissions for AWS <glossary-terminology.html#PMM-user-permissions-for-AWS>`_
-----------------------------------------------------------------------------------------

	      When creating a `IAM user
	      <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html#CHAP_SettingUp.IAM>`_
	      for |amazon-rds| DB instance that you intend to monitor in PMM, you need to set all
	      required permissions properly. For this, you may copy the following |JSON| for your
	      IAM user:

	      .. include:: .res/code/aws.iam-user.permission.txt

	      .. seealso::

		 Creating an IAM user
		    :ref:`pmm.amazon-rds.iam-user.creating`

.. _PMM-Version:

`PMM Version <glossary-terminology.html#PMM-Version>`_
--------------------------------------------------------------------------------

      The version of PMM appears at the bottom of the :ref:`PMM server home page <PMM-Home-Page>`.

      .. figure:: .res/graphics/png/pmm.home-page.1.png

	 To update your |pmm-server|, click the |gui.check-for-updates-manually| button
	 located next to the version number.

      .. seealso::

	 Checking the version of |pmm-server|

	     :ref:`PMM Server Version <PMM-Server-Version>`

.. _QAN:

`QAN <glossary-terminology.html#QAN>`_
--------------------------------------------------------------------------------

      See :ref:`Query Analytics (QAN) <Query-Analytics>`

.. only:: showhidden

	.. _Query-Abstract:

	`Query Abstract <Query-Abstract>`_
	--------------------------------------------------------------------------------

	      Query pattern with placeholders. This term appears in
	      :ref:`QAN <Query-Analytics>` as an attribute of queries.

.. _Query-Analytics:

`Query Analytics (QAN) <glossary-terminology.html#Query-Analytics>`_
--------------------------------------------------------------------------------

      Component of :ref:`PMM-Server` that enables you to analyze
      |mysql| query performance over periods of time.

.. only:: showhidden

	.. _Query-Fingerprint:

	`Query Fingerprint <Query-Fingerprint>`_
	--------------------------------------------------------------------------------

	      See :ref:`Query Abstract <Query-Abstract>`
	
	.. _Query-ID:

	`Query ID <Query-ID>`_
	--------------------------------------------------------------------------------

	      A :ref:`query fingerprint <Query-Fingerprint>` which groups similar queries.

.. _Query-Load:

`Query Load <glossary-terminology.html#Query-Load>`_
--------------------------------------------------------------------------------

      The percentage of time that the |mysql| server spent executing a specific query.

.. _Query-Metrics-Summary-Table:

`Query Metrics Summary Table <glossary-terminology.html#Query-Metrics-Summary-Table>`_
---------------------------------------------------------------------------------------

      An element of :ref:`Query Analytics (QAN) <Query-Analytics>` which displays the available
      metrics for the selected query.

.. _Query-Metrics-Table:

`Query Metrics Table <glossary-terminology.html#Query-Metrics-Table>`_
--------------------------------------------------------------------------------

      A tool within :ref:`QAN <QAN>` which lists metrics applicable to the query
      selected in the :ref:`query summary table <Query-Summary-Table>`.

.. _Query-Summary-Table:

`Query Summary Table <glossary-terminology.html#Query-Summary-Table>`_
--------------------------------------------------------------------------------

      A tool within :ref:`QAN <QAN>` which lists the queries which were run
      on the selected database server during the :ref:`selected time
      or date range <Selected-Time-or-Date-Range>`.

.. _Quick-ranges:

`Quick ranges <glossary-terminology.html#Quick-ranges>`_
--------------------------------------------------------------------------------

      Predefined time periods which are used by :ref:`QAN <QAN>` to collect metrics
      for queries. The following quick ranges are available:

      - last hour
      - last three hours
      - last five hours
      - last twelve hours
      - last twenty four hours
      - last five days

.. _Selected-Time-or-Date-Range:

`Selected Time or Date Range <glossary-terminology.html#Selected-Time-or-Date-Range>`_
---------------------------------------------------------------------------------------

      A predefined time period (see :ref:`Quick ranges <Quick-ranges>`), such as 1 hour, or a
      range of dates that :ref:`QAN <QAN>` uses to collects metrics.

.. _Telemetry:

`Telemetry <glossary-terminology.html#Telemetry>`_
--------------------------------------------------------------------------------

	      |percona| may collect some statistics about the machine where |pmm| is running.

	      This statistics includes the following information:

	      - |pmm-server| unique ID
	      - |pmm| version
	      - The name and version of the operating system, |ami| or virtual appliance
	      - |mysql| version
	      - |perl| version

        You may disable telemetry on the *Settings* dashboard.

.. _Version:

`Version <glossary-terminology.html#Version>`_
--------------------------------------------------------------------------------

      A database server attribute found on the :ref:`QAN <QAN>` page. it informs the
      full version of the monitored database server, as well as the product
      name, revision and release number.

.. include:: .res/replace.txt
