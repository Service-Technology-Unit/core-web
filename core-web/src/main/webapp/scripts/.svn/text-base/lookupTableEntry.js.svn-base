// lookupTableEntry.js

/**
 * Initialize the page
 */
function initPage() {
	// get table definition
	var time = new Date().getTime();
	ajaxGet('/core/table/' + context + '/' + tableName + '?t=' + time, 'processTableDefinition','ajaxError');
}

/**
 * Save off the table definition
 */
function processTableDefinition(xmlDoc) {
	// process table definition
	var root = xmlDoc.documentElement;
	var pageTitle = root.getElementsByTagName('displayName')[0].firstChild.data + ' - Entry Details';
	document.title = pageTitle;
	document.getElementById('pageHeading').innerHTML = pageTitle;
	var propertyList = root.getElementsByTagName('property');
	if (propertyList.length > 0) {
		for (var i=0; i<propertyList.length; i++) {
			tagName = 'property' + ('0' + i).substring(('0' + i).length - 2);
			rowName = tagName + 'row';
			labelName = tagName + 'label';
			label = propertyList[i].getElementsByTagName('label')[0].firstChild.data + ':';
			toggleElement(rowName, true);
			document.getElementById(labelName).innerHTML = label;
			document.getElementById(tagName).innerHTML = document.getElementById('property_' + i).value.replace(/\n/g, '<br/>');
		}
	}
}

/**
 * Hides/shows an element on the page
 */
function toggleElement(elementId, showElement) {
	var element = document.getElementById(elementId);
	if (showElement) {
		element.style.visibility = 'visible';
		element.style.display = '';
	} else {
		element.style.visibility = 'hidden';
		element.style.display = 'none';
	}
}
