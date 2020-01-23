<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
 <head>
  <title>
    /<xsl:value-of select="//context"/>/<xsl:value-of select="//name"/>
  </title>
  <link rel="stylesheet" type="text/css" href="/core/css/xsl.css"/>
 </head>
 <body>
  <center>
    <h2>
    /<xsl:value-of select="//context"/>/<xsl:value-of select="//name"/>
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
      <td class="label">Content Type:</td>
      <td class="value"><xsl:value-of select="//contentType"/></td>
    </tr>
    <tr>
      <td class="label">Content:</td>
      <td class="value"></td>
    </tr>
    <tr>
      <td class="value" colspan="2">
        <pre>
          <xsl:value-of select="//content"/>
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