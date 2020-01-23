<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
  <head>
    <title>Notice Template</title>
    <link rel="stylesheet" type="text/css" href="/core/css/xsl.css" />
  </head>
  <body>
    <center>
      <h2>Notice Template</h2>
      <table>
        <tr>
          <td class="label">Context:</td>
          <td class="value">
            <xsl:value-of select="//@context"/>
          </td>
        </tr>
        <tr>
          <td class="label">Name:</td>
          <td class="value">
            <xsl:value-of select="//@name"/>
          </td>
        </tr>
        <tr>
          <td class="label">Description:</td>
          <td class="value">
            <xsl:value-of select="//description"/>
          </td>
        </tr>
        <tr>
          <td class="label">Content Type:</td>
          <td class="value">
            <xsl:value-of select="//contentType"/>
          </td>
        </tr>
        <tr>
          <td class="label">Default Delivery Method:</td>
          <td class="value">
            <xsl:value-of select="//defaultDeliveryMethod"/>
          </td>
        </tr>
        <tr>
          <td class="label">Title/Subject:</td>
          <td class="value">
            <xsl:value-of select="//titleSubject"/>
          </td>
        </tr>
        <tr>
          <td class="label" colspan="2">Body:</td>
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