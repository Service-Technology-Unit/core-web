<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
 <head>
  <title>
    <xsl:value-of select="//title"/>
  </title>
  <link rel="stylesheet" type="text/css" href="/core/css/xsl.css"/>
 </head>
 <body>
  <center>
    <h2>
    <xsl:value-of select="//title"/>
    </h2>
    <table>
    <tr>
      <td class="label">Context:</td>
      <td class="value"><xsl:value-of select="//context"/></td>
    </tr>
    <tr>
      <td class="label">Name:</td>
      <td class="value"><xsl:value-of select="//name"/></td>
    </tr>
    <tr>
      <td class="label">Description:</td>
      <td class="value"><xsl:value-of select="//description"/></td>
    </tr>
    <tr>
      <td class="label">Head:</td>
      <td class="value"></td>
    </tr>
    <tr>
      <td class="value" colspan="2">
        <pre>
          <xsl:value-of select="//head"/>
        </pre>
      </td>
    </tr>
    <tr>
      <td class="label">Body:</td>
      <td class="value"></td>
    </tr>
    <tr>
      <td class="value" colspan="2">
        <pre>
          <xsl:value-of select="//body"/>
        </pre>
      </td>
    </tr>
    </table>
    <p><a href="javascript: window.close();">Close window</a></p>
    </center>
 </body>
</html>
</xsl:template>
</xsl:stylesheet>