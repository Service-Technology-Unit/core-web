<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
 <head>
  <title>Batch Job Schedule</title>
  <link rel="stylesheet" type="text/css" href="/core/css/xsl.css"/>
 </head>
 <body>
  <center>
    <h2>Batch Job Schedule</h2>
    <table>
      <tr>
        <td class="value" colspan="2" style="text-align: center; background-color: #cccccc;">
          Batch Job Details
        </td>
      </tr>
      <tr>
        <td class="label">Context:</td>
        <td class="value"><xsl:value-of select="/batchJobSchedule/batchJob/context"/></td>
      </tr>
      <tr>
        <td class="label">Name:</td>
        <td class="value"><xsl:value-of select="/batchJobSchedule/batchJob/name"/></td>
      </tr>
      <tr>
        <td class="label">Description:</td>
        <td class="value"><xsl:value-of select="/batchJobSchedule/batchJob/description"/></td>
      </tr>
      <tr>
        <td class="value" colspan="2" style="text-align: center; background-color: #cccccc;">
          Schedule Details
        </td>
      </tr>
      <tr>
        <td class="label">ID:</td>
        <td class="value"><xsl:value-of select="/batchJobSchedule/id"/></td>
      </tr>
      <tr>
        <td class="label">Name:</td>
        <td class="value"><xsl:value-of select="/batchJobSchedule/name"/></td>
      </tr>
      <tr>
        <td class="label">Description:</td>
        <td class="value"><xsl:value-of select="/batchJobSchedule/description"/></td>
      </tr>
      <tr>
        <td class="label">Status:</td>
        <td class="value"><xsl:value-of select="/batchJobSchedule/status"/></td>
      </tr>
      <tr>
        <td class="label">Schedule:</td>
        <td class="value"><xsl:value-of select="/batchJobSchedule/schedule"/></td>
      </tr>
    </table>
    <p><a href="javascript: window.close();">Close window</a></p>
    </center>
 </body>
</html>
</xsl:template>
</xsl:stylesheet>