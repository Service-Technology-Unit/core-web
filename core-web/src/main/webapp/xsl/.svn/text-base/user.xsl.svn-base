<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
 <head>
  <title>
    <xsl:value-of select="//firstName"/>
      <xsl:text>&#160;</xsl:text>
    <xsl:value-of select="//lastName"/>
  </title>
  <link rel="stylesheet" type="text/css" href="/core/css/xsl.css"/>
 </head>
 <body>
  <center>
    <h2>
      <xsl:value-of select="//firstName"/>
      <xsl:text>&#160;</xsl:text>
      <xsl:value-of select="//lastName"/>
    </h2>
    <table>
    <tr>
      <td class="label">ID:</td>
      <td class="value"><xsl:value-of select="//name"/></td>
    </tr>
    <tr>
      <td class="label">First name:</td>
      <td class="value"><xsl:value-of select="//firstName"/></td>
    </tr>
    <tr>
      <td class="label">Middle name:</td>
      <td class="value"><xsl:value-of select="//middleName"/></td>
    </tr>
    <tr>
      <td class="label">Last name:</td>
      <td class="value"><xsl:value-of select="//lastName"/></td>
    </tr>
    <tr>
      <td class="label">Telephone:</td>
      <td class="value"><xsl:value-of select="//phoneNr"/></td>
    </tr>
    <tr>
      <td class="label">E-mail:</td>
      <td class="value"><xsl:value-of select="//email"/></td>
    </tr>
    <tr>
      <td class="label">Roles:</td>
      <td class="value"><xsl:value-of select="//roles"/></td>
    </tr>
    </table>
    <p><a href="javascript: window.close();">Close window</a></p>
    </center>
 </body>
</html>
</xsl:template>
</xsl:stylesheet>