<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
 <head>
  <title>Authorization Information</title>
  <link rel="stylesheet" type="text/css" href="/core/css/xsl.css"/>
 </head>
 <body>
  <center>
  <h2>Authorization Information</h2>
  <table>
    <tr>
      <td class="label">User ID:</td>
      <td class="value"><xsl:value-of select="//loginId"/></td>
    </tr>
    <tr>
      <td class="label">Application ID:</td>
      <td class="value"><xsl:value-of select="//applicationCode"/></td>
    </tr>
    <tr>
      <td class="value" colspan="2">
        <ul>
<xsl:for-each select="/groupedAuthorizationResponse/groupRoleFeatureMap">
          <li><em class="label">Group: </em> <xsl:value-of select="groupCode"/>
            <ul>
<xsl:for-each select="roleFeatureMapList">
              <li><em class="label">Role: </em> <xsl:value-of select="roleCode"/>
                <ul>
<xsl:for-each select="featureList">
                  <li><em class="label">Feature: </em> <xsl:value-of select="."/></li>
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