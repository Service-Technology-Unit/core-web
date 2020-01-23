<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
 <head>
  <title>Remote Client Information</title>
  <link rel="stylesheet" type="text/css" href="/core/css/xsl.css"/>
<script type="text/javascript">

function showUser() {
	var url = '<xsl:value-of select="//@*[local-name()='href']"/>';
	var popup = window.open(url, 'popupWindow', 'toolbar=no,directories=no,status=no,scrollbars=yes,resizable=yes,resize=yes,menubar=no,height=400,width=500');
	if (window.focus) {
		popup.focus()
	}
	return false;
}

</script>
 </head>
 <body>
    <center>
    <h2>Remote Client Information</h2>
    <table>
    <tr>
      <td class="label">Remote Address:</td>
      <td class="value"><xsl:value-of select="//remoteAddr"/></td>
    </tr>
    <tr>
      <td class="label">Remote Host:</td>
      <td class="value"><xsl:value-of select="//remoteHost"/></td>
    </tr>
    <tr>
      <td class="label">Remote User:</td>
      <td class="value"><a href="#" onclick="return showUser();"><xsl:value-of select="//remoteUser"/></a></td>
    </tr>
    </table>
    <p><a href="javascript: window.close();">Close window</a></p>
    </center>
 </body>
</html>
</xsl:template>
</xsl:stylesheet>