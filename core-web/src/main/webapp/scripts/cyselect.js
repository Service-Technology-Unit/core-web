// cyselect.js

/**
 * This function sets up the pop-up selection window scripts
 */
function standardSetUp() {
	fieldName = ['id','name'];
	fieldIndex = {'id': 0,'name': 1};
	fieldLabel = ['Code','Country Name'];
	titleText = 'Country Selection';
	baseXmlUrl = '/example/country.xml';
	document.getElementById("containscol").style.visibility = 'visible';
	document.getElementById("containscol").style.display = '';
	startsWith = '';
	defaultStartsWith = '';
}
