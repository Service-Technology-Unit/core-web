<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
  <head>
    <title>Look-up Table Definition</title>
    <link rel="stylesheet" type="text/css" href="/core/css/xsl.css" />
  </head>
  <body>
    <center>
      <h2>Look-up Table Definition</h2>
      <table>
        <tr>
          <td class="label">ID:</td>
          <td class="value">
            <xsl:value-of select="//@id" />
          </td>
        </tr>
        <tr>
          <td class="label">Name:</td>
          <td class="value">
            <xsl:value-of select="//displayName" />
          </td>
        </tr>
        <tr>
          <td class="label">Description:</td>
          <td class="value">
            <xsl:value-of select="//description" />
          </td>
        </tr>
      </table>
      <xsl:if test="//properties/property">
        <p>
          <h4>Defined Properties</h4>
          <table>
            <tr>
              <td class="label">Name</td>
              <td class="label">Type</td>
              <td class="label">Size</td>
              <td class="label">Label</td>
              <td class="label">Col Hdg</td>
              <td class="label">Source</td>
              <td class="label">Notes</td>
            </tr>
            <xsl:for-each select="//properties/property">
              <tr>
                <td class="value">
                  <xsl:value-of select="name" />
                </td>
                <td class="value">
                  <xsl:value-of select="type" />
                </td>
                <td class="value">
                  <xsl:value-of select="size" />
                </td>
                <td class="value">
                  <xsl:value-of select="label" />
                </td>
                <td class="value">
                  <xsl:value-of select="colHeading" />
                </td>
                <td class="value">
                  <xsl:value-of select="source" />
                </td>
                <td class="value">
                  <xsl:value-of select="notes" />
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