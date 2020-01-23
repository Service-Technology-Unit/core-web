// lookupTableEntries.js

var lookupTableEntriesConfig = {};
//The global var lookupTableEntriesConfig.icon should be set outside, in the same file
//that will be calling setUpLookupTableEntries()
lookupTableEntriesConfig.js = {};
lookupTableEntriesConfig.icon = {};
lookupTableEntriesConfig.iconPath = '';
lookupTableEntriesConfig.context = 'global';

/**
 * Set up the look-up table list
 */
function setUpLookupTableEntries(context, tableName, element, page, continuationFunction) {
	// store context for later use
	if (context > '') {
		lookupTableEntriesConfig.context = context;
	}
	// store tableName for later use
	lookupTableEntriesConfig.tableName = tableName;
	// store page element for later use
	lookupTableEntriesConfig.element = element;
	// store page names for later use
	lookupTableEntriesConfig.page = page;
	// store continuation function for later use
	lookupTableEntriesConfig.continuationFunction = continuationFunction;
	// initialize config
	lookupTableEntriesConfig.fetchURL = '/core/entry/' + context + '/' + tableName + '?t=';
	// get table definition
	var time = new Date().getTime();
	ajaxGet('/core/table/' + context + '/' + tableName + '?t=' + time, 'processTableDefinition','ajaxError');
}

/**
 * Processes the fetched table definition
 */
function processTableDefinition(xmlDoc) {
	var root = xmlDoc.documentElement;
	lookupTableEntriesConfig.table = {};
	lookupTableEntriesConfig.table.name = root.getElementsByTagName('displayName')[0].firstChild.data;
	lookupTableEntriesConfig.table.description = root.getElementsByTagName('description')[0].firstChild.data;
	lookupTableEntriesConfig.table.property = [];
	var propertyList = root.getElementsByTagName('property');
	if (propertyList.length > 0) {
		for (var i=0; i<propertyList.length; i++) {
			var thisProperty = {};
			thisProperty.tagName = 'property' + ('0' + i).substring(('0' + i).length - 2);
			thisProperty.id = propertyList[i].attributes[0].value;
			thisProperty.name = propertyList[i].getElementsByTagName('name')[0].firstChild.data;
			thisProperty.type = propertyList[i].getElementsByTagName('type')[0].firstChild.data;
			thisProperty.size = propertyList[i].getElementsByTagName('size')[0].firstChild.data;
			thisProperty.label = propertyList[i].getElementsByTagName('label')[0].firstChild.data;
			thisProperty.colHeading = propertyList[i].getElementsByTagName('colHeading')[0].firstChild.data;
			thisProperty.inputRequired = false;
			if (propertyList[i].getElementsByTagName('inputRequired')[0].firstChild != null) {
				if (propertyList[i].getElementsByTagName('inputRequired')[0].firstChild.data == 'true') {
					thisProperty.inputRequired = true;
				}
			}
			thisProperty.displayOnList = false;
			if (propertyList[i].getElementsByTagName('displayOnList')[0].firstChild != null) {
				if (propertyList[i].getElementsByTagName('displayOnList')[0].firstChild.data == 'true') {
					thisProperty.displayOnList = true;
				}
			}
			thisProperty.source = '';
			if (propertyList[i].getElementsByTagName('source')[0].firstChild != null) {
				thisProperty.source = propertyList[i].getElementsByTagName('source')[0].firstChild.data;
			}
			thisProperty.notes = '';
			if (propertyList[i].getElementsByTagName('notes')[0].firstChild != null) {
				thisProperty.notes = propertyList[i].getElementsByTagName('notes')[0].firstChild.data;
			}
			lookupTableEntriesConfig.table.property[i] = thisProperty;
		}
	}
	// set up page title/heading
	document.title += ' ' + lookupTableEntriesConfig.table.name;
	document.getElementById('headline').innerHTML = lookupTableEntriesConfig.table.name;
	getLookupTableEntries();
}

/**
 * Fetch the look-up table entries and display them on the page
 */
function getLookupTableEntries() {
	var time = new Date().getTime();
	lookupTableEntriesConfig.element.innerHTML = '<img src="/core/images/loading.gif"> &nbsp; Searching ... please wait.';
	ajaxGet(lookupTableEntriesConfig.fetchURL + time, 'processLookupTableEntries','lookupTableEntriesAjaxError');
}

/**
 * Display the look-up table entries on the page
 */
function processLookupTableEntries(xmlDoc) {
	var root = xmlDoc.documentElement;
	entryList = root.getElementsByTagName('entry');
	if (entryList.length > 0) {
		lookupTableEntriesConfig.items = [];
		for (var i=0; i<entryList.length; i++) {
			var entry = {};
			entry.id = entryList[i].attributes[2].value;
			entry.uri = entryList[i].attributes[3].value;
			lookupTableEntriesConfig.items[i] = entry;
		}
		lookupTableEntriesConfig.itemIndex = 0;
		fetchLookupTableEntryDetail();
	} else {
		var html = '<p>There are no entries on file for this table.</p>\n<br/>\n';
		html += getPageControls();
		lookupTableEntriesConfig.element.innerHTML = html;
		if (lookupTableEntriesConfig.continuationFunction > '') {
			eval(lookupTableEntriesConfig.continuationFunction + '()');
		}
	}
}

/**
 * Reports on AJAX errors
 */
function lookupTableEntriesAjaxError(httpRequest) {
	if (httpRequest.status == 404) {
		var html = '<p>There are no entries on file for this table.</p>\n<br/>\n';
		html += getPageControls();
		lookupTableEntriesConfig.element.innerHTML = html;
		if (lookupTableEntriesConfig.continuationFunction > '') {
			eval(lookupTableEntriesConfig.continuationFunction + '()');
		}
	} else {
		ajaxError(httpRequest);
	}
}

/**
 * Fetch the details for one table entry
 */
function fetchLookupTableEntryDetail() {
	var i = lookupTableEntriesConfig.itemIndex;
	ajaxGet(lookupTableEntriesConfig.items[i].uri, 'processLookupTableEntryDetail','ajaxError');
}

/**
 * Process the details for one table entry
 */
function processLookupTableEntryDetail(xmlDoc) {
	var i = lookupTableEntriesConfig.itemIndex;
	var entry = lookupTableEntriesConfig.items[i];
	var root = xmlDoc.documentElement;
	entry.description = root.getElementsByTagName('description')[0].firstChild.data;
	for (var i=0; i<lookupTableEntriesConfig.table.property.length; i++) {
		var thisProperty = lookupTableEntriesConfig.table.property[i];
		if (thisProperty.displayOnList) {
			if (root.getElementsByTagName(thisProperty.tagName)[0].firstChild != null) {
				entry[thisProperty.tagName] = root.getElementsByTagName(thisProperty.tagName)[0].firstChild.data;
			} else {
				entry[thisProperty.tagName] = '';
			}
		}
	}

	// move on to next item
	lookupTableEntriesConfig.itemIndex++;
	if (lookupTableEntriesConfig.itemIndex < lookupTableEntriesConfig.items.length) {
		fetchLookupTableEntryDetail();
	} else {
		lookupTableEntriesConfig.itemIndex = 0;
		buildLookupTableEntryHTML();
	}
}

/**
 * Builds the HTML from the action item data
 */
function buildLookupTableEntryHTML() {
	var editContent = 'edit';
	if (lookupTableEntriesConfig.icon.edit > '') {
		editContent = '<img src="' + lookupTableEntriesConfig.iconPath + lookupTableEntriesConfig.icon.edit + '" alt="Edit" border="0"/>';
	}
	var deleteContent = 'delete';
	if (lookupTableEntriesConfig.icon.del > '') {
		deleteContent = '<img src="' + lookupTableEntriesConfig.iconPath + lookupTableEntriesConfig.icon.del + '" alt="Delete" border="0"/>';
	}

	var html = '<table>\n';
	html += ' <tr>\n';
	html += '  <th>ID</th>\n';
	html += '  <th>Description</th>\n';
	for (var i=0; i<lookupTableEntriesConfig.table.property.length; i++) {
		var thisProperty = lookupTableEntriesConfig.table.property[i];
		if (thisProperty.displayOnList) {
			html += '  <th>' + thisProperty.colHeading + '</th>\n';
		}
	}
	html += '  <th>Edit</th>\n';
	html += '  <th>Delete</th>\n';
	html += ' </tr>\n';

	var odd = false;
	for (var i=0; i<lookupTableEntriesConfig.items.length; i++) {
		var entry = lookupTableEntriesConfig.items[i];
		var entryLink = '<a href="javascript:popUpTableEntryDefinition(\'' + entry.uri + '\');">' + entry.id + '</a>';
		var editLink = '<a href="' + formatLink(lookupTableEntriesConfig.page + '?context=' + lookupTableEntriesConfig.context + '&table=' + lookupTableEntriesConfig.tableName + '&entry=' + entry.id) + '">' + editContent + '</a>';
		var deleteLink = '<a href="javascript:deleteTableEntry(\'' + entry.uri + '\', \'' + entry.id + '\');">' + deleteContent + '</a>';
		html += ' <tr id="row_' + i + '" class="' + (odd?'odd':'even') + '">\n';
		html += '  <td>' + entryLink + '</td>\n';
		html += '  <td>' + entry.description + '</td>\n';
		for (var j=0; j<lookupTableEntriesConfig.table.property.length; j++) {
			var thisProperty = lookupTableEntriesConfig.table.property[j];
			if (thisProperty.displayOnList) {
				html += '  <td>' + entry[thisProperty.tagName] + '</td>\n';
			}
		}
		html += '  <td align="center">' + editLink + '</td>\n';
		html += '  <td align="center">' + deleteLink + '</td>\n';
		html += ' </tr>\n';
		odd = !odd;
	}

	html += '</table>\n\n';

	html += getPageControls();

	// update html document
	lookupTableEntriesConfig.element.innerHTML = html;
	if (lookupTableEntriesConfig.continuationFunction > '') {
		eval(lookupTableEntriesConfig.continuationFunction + '()');
	}
}

/**
 * Formats the buttons for the page
 */
function getPageControls() {
	var html = '';

	html += '<div class="controls">\n';
	html += ' <a class="button" href="' + formatLink(lookupTableEntriesConfig.page + '?context=' + lookupTableEntriesConfig.context + '&table=' + lookupTableEntriesConfig.tableName) + '">Insert a New Entry</a>\n';
	html += ' &nbsp;\n';
	html += ' <a class="button" href="javascript:' + formatBack() + '">Done</a>\n';
	html += '</div>\n';

	return html;
}

/**
 * Opens up a new window to display the details of the specified table entry
 */
function popUpTableEntryDefinition(entryUri) {
	var tableEntryWindow = window.open(entryUri, 'tableEntryWindow', 'toolbar=no,directories=no,status=no,scrollbars=yes,resizable=yes,resize=yes,menubar=no,height=400,width=500');
	if (window.focus) {
		tableEntryWindow.focus();
	}
}

/**
 * Deletes the specified table
 */
function deleteTableEntry(entryUri, entryId) {
	if (confirm('Delete entry "' + entryId + '"?')) {
		ajaxDelete(entryUri, 'confirmDelete','ajaxError');
	}
}

/**
 * Confirm table delete
 */
function confirmDelete(xmlDoc) {
	alert('The specified entry has been deleted.');
	getLookupTableEntries();
}

/**
 * Format link
 */
function formatLink(url) {
	if (lookupTableEntriesConfig.js.forward) {
		return "javascript:" + lookupTableEntriesConfig.js.forward + "('" + url + "');";
	} else {
		return url;
	}
}

/**
 * Format return
 */
function formatBack() {
	var js = 'history.back();';
	if (lookupTableEntriesConfig.js.back) {
		js = lookupTableEntriesConfig.js.back + "();";
	}
	return js;
}
