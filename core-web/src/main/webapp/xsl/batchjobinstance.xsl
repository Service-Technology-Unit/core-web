<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
 <head>
  <title>Batch Job Instance #<xsl:value-of select="/batchJobInstance/id"/></title>
  <link rel="stylesheet" type="text/css" href="/core/css/xsl.css"/>
  <script type="text/javascript" src="/hs/scripts/DP_DateExtensions.js"></script>
  <script type="text/javascript" src="/core/js/batchjobinstance.js"></script>
 </head>
 <body onload="init();">
  <center>
    <h2>Batch Job Instance #<xsl:value-of select="/batchJobInstance/id"/></h2>
    <table>
      <tr>
        <td class="value" colspan="2" style="text-align: center; background-color: #cccccc;">
          Batch Job Details
        </td>
      </tr>
      <tr>
        <td class="label">Context:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/batchJobSchedule/batchJob/context"/></td>
      </tr>
      <tr>
        <td class="label">Name:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/batchJobSchedule/batchJob/name"/></td>
      </tr>
      <tr>
        <td class="label">Description:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/batchJobSchedule/batchJob/description"/></td>
      </tr>
      <tr>
        <td class="value" colspan="2" style="text-align: center; background-color: #cccccc;">
          Schedule Details
        </td>
      </tr>
      <tr>
        <td class="label">ID:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/batchJobSchedule/id"/></td>
      </tr>
      <tr>
        <td class="label">Name:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/batchJobSchedule/name"/></td>
      </tr>
      <tr>
        <td class="label">Description:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/batchJobSchedule/description"/></td>
      </tr>
      <tr>
        <td class="label">Status:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/batchJobSchedule/status"/></td>
      </tr>
      <tr>
        <td class="label">Schedule:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/batchJobSchedule/schedule"/></td>
      </tr>
      <tr>
        <td class="value" colspan="2" style="text-align: center; background-color: #cccccc;">
          Instance Details
        </td>
      </tr>
      <tr>
        <td class="label">ID:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/id"/></td>
      </tr>
      <tr>
        <td class="label">Status:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/status"/></td>
      </tr>
      <tr>
        <td class="label">Host:</td>
        <td class="value"><xsl:value-of select="/batchJobInstance/host"/></td>
      </tr>
      <tr>
        <td class="label">Start Date/Time:</td>
        <td class="value" id="startDateTime"><xsl:value-of select="/batchJobInstance/startDateTime"/></td>
      </tr>
      <tr>
        <td class="label">End Date/Time:</td>
        <td class="value" id="endDateTime"><xsl:value-of select="/batchJobInstance/endDateTime"/></td>
      </tr>
    </table>

    <xsl:if test="//events/event">
    <h3>Job History</h3>
    <p>
    <table>       	
	 	<tr>
      		<th class="value" style="background-color: #cccccc;">Date/Time</th>
      		<th class="value" style="background-color: #cccccc;">Event</th>
      		<th class="value" style="background-color: #cccccc;">Description</th>
	  	</tr>
	  	
	  	<xsl:for-each select="//events/event"> 	    
	  	<tr>	
	  		<td class="value" id="event_{position()}"><xsl:value-of select="creationDate"/></td>	  		
	  		<td class="value"><xsl:value-of select="event"/></td>
	  		<td class="value"><xsl:value-of select="description"/></td>
      	</tr>
      	</xsl:for-each>  
      	
    </table>	
    </p>  
   	</xsl:if>

    <xsl:if test="//statistics/statistic">
    <h3>Job Statistics</h3>
    <p>
    <table>
	 	<tr>
      		<th class="value" style="background-color: #cccccc;">Label</th>
      		<th class="value" style="background-color: #cccccc;">Value</th>
	  	</tr>
	  	
	  	<xsl:for-each select="//statistics/statistic"> 	    
	  	<tr>
	  		<td class="value"><xsl:value-of select="label"/></td>
	  		<td class="value" style="text-align: right;">
	  		  <input type="hidden" id="format_{position()}" value="{format}"/>
	  		  <span id="value_{position()}"><xsl:value-of select="value"/></span>
	  		</td>
      	</tr>
      	</xsl:for-each>  
      	
    </table>	
    </p>  
   	</xsl:if>

    <p><a href="javascript: window.close();">Close window</a></p>

  </center>
 </body>
</html>
</xsl:template>
</xsl:stylesheet>