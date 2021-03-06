<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
 <head>
  <title>Batch Job Definition</title>
  <link rel="stylesheet" type="text/css" href="/core/css/xsl.css"/>
 </head>
 <body>
  <center>
    <h2>Batch Job Definition</h2>
    <table>
    <tr>
      <td class="label">Context:</td>
      <td class="value"><xsl:value-of select="//context"/></td>
    </tr>
    <tr>
      <td class="label">Name:</td>
      <td class="value"><xsl:value-of select="//displayName"/></td>
    </tr>
    <tr>
      <td class="label">Description:</td>
      <td class="value"><xsl:value-of select="//description"/></td>
    </tr>
    </table>
    <p><a href="javascript: window.close();">Close window</a></p>
    </center>
 </body>
</html>
</xsl:template>
</xsl:stylesheet>