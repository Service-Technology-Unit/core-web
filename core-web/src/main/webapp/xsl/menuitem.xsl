<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
 <head>
  <title>Menu Details</title>
  <link rel="stylesheet" type="text/css" href="/core/css/xsl.css"/>
 </head>
 <body>
    <center>
    <h2>Menu Details</h2>
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
      <td class="value" colsapn="2">
        <ul>
<xsl:for-each select="/menuItem/children/menuItem">
<xsl:sort select="sequence"/>
          <li><xsl:value-of select="label"/>
            <ul>
<xsl:for-each select="children/menuItem">
<xsl:sort select="sequence"/>         
              <li><xsl:value-of select="label"/>
                <ul>
<xsl:for-each select="children/menuItem">
<xsl:sort select="sequence"/>         
                  <li><xsl:value-of select="label"/>
                  </li>
</xsl:for-each>    
                </ul>
              </li>
</xsl:for-each>    
            </ul>
          </li>
</xsl:for-each>
        </ul>
      </td>
    </tr>
    </table>
    <p><a href="javascript: window.close();">Close window</a></p>
    </center>
 </body>
</html>
</xsl:template>
</xsl:stylesheet>