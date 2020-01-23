// lookupTables.js

var lookupTablesConfig = {};
// The global var lookupTablesConfig.icon should be set outside, in the same file
// that will be calling setUpLookupTables()
lookupTablesConfig.js = {};
lookupTablesConfig.icon = {};
lookupTablesConfig.iconPath = '';
lookupTablesConfig.context = 'global';

/**
 * Set up the look-up table list
 */
function setUpLookupTables(element, page, continuationFunction, context) {
	// store page element for later use
	lookupTablesConfig.element = element;
	// store page names for later use
	lookupTablesConfig.page = page;
	// store continuation function for later use
	lookupTablesConfig.continuationFunction = continuationFunction;
	// store context for later use
	if (context > '') {
		lookupTablesConfig.context = context;
	}
	// initialize config
	lookupTablesConfig.fetchURL = '/core/table/' + lookupTablesConfig.context + '?t=';	
	lookupTablesConfig.deleteURL = '/core/table/' + lookupTablesConfig.context + '/';	
	getLookupTables();
}

/**
 * Fetch the look-up tables and display them on the page
 */
function getLookupTables() {
	var time = new Date().getTime();
	lookupTablesConfig.element.innerHTML = '<img src="/core/images/loading.gif"> &nbsp; Searching ... please wait.';
	ajaxGet(lookupTablesConfig.fetchURL + time, 'processLookupTables', 'lookupTablesAjaxError');
}

/**
 * Fetch the action items and display them on the page
 */
function processLookupTables(xmlDoc) {
	var root = xmlDoc.documentElement;
	tableList = root.getElementsByTagName('table');
	if (tableList.length > 0) {
		lookupTablesConfig.items = [];
		for (var i=0; i<tableList.length; i++) {
			var table = {};
			table.id = tableList[i].attributes[1].value;
			table.uri = tableList[i].attributes[2].value;
			lookupTablesConfig.items[i] = table;
		}
		lookupTablesConfig.itemIndex = 0;
		fetchLookupTableDetail();
	} else {
		lookupTablesConfig.element.innerHTML = '';
		if (lookupTablesConfig.continuationFunction > '') {
			eval(lookupTablesConfig.continuationFunction + '()');
		}
	}
}

/**
 * Reports on AJAX errors
 */
function lookupTablesAjaxError(httpRequest) {
	if (httpRequest.status == 404) {
		var html = '<p>There are currently no tables defined for this context.</p>\n<br/>\n';
		html += '<div class="controls">\n';
		html += ' <a class="button" href="' + formatLink(lookupTablesConfig.page.edit + '?context=' + lookupTablesConfig.context) + '">Define a New Table</a>\n';
		html += '</div>\n';
		lookupTablesConfig.element.innerHTML = html;
		if (lookupTablesConfig.continuationFunction > '') {
			eval(lookupTablesConfig.continuationFunction + '()');
		}
	} else {
		ajaxError(httpRequest);
	}
}

/**
 * Fetch the details for one action item
 */
function fetchLookupTableDetail() {
	var i = lookupTablesConfig.itemIndex;
	ajaxGet(lookupTablesConfig.items[i].uri, 'processLookupTableDetail','ajaxError');
}

/**
 * Process the details for one action item
 */
function processLookupTableDetail(xmlDoc) {
	var i = lookupTablesConfig.itemIndex;
	var table = lookupTablesConfig.items[i];
	var root = xmlDoc.documentElement;
	table.name = root.getElementsByTagName('displayName')[0].firstChild.data;
	table.description = root.getElementsByTagName('description')[0].firstChild.data;

	// move on to next item
	lookupTablesConfig.itemIndex++;
	if (lookupTablesConfig.itemIndex < lookupTablesConfig.items.length) {
		fetchLookupTableDetail();
	} else {
		lookupTablesConfig.itemIndex = 0;
		buildLookupTableHTML();
	}
}

/**
 * Builds the HTML from the action item data
 */
function buildLookupTableHTML() {
	var editContent = 'define';
	if (lookupTablesConfig.icon.edit > '') {
		editContent = '<img src="' + lookupTablesConfig.iconPath + lookupTablesConfig.icon.edit + '" alt="Define" border="0"/>';
	}
	var contentsContent = 'contents';
	if (lookupTablesConfig.icon.contents > '') {
		contentsContent = '<img src="' + lookupTablesConfig.iconPath + lookupTablesConfig.icon.contents + '" alt="Contents" border="0"/>';
	}
	var deleteContent = 'delete';
	if (lookupTablesConfig.icon.del > '') {
		deleteContent = '<img src="' + lookupTablesConfig.iconPath + lookupTablesConfig.icon.del + '" alt="Delete" border="0"/>';
	}

	var html = '<table>\n';
	html += ' <tr>\n';
	html += '  <th>ID</th>\n';
	html += '  <th>Name</th>\n';
	html += '  <th>Description</th>\n';
	html += '  <th>Define</th>\n';
	html += '  <th>Contents</th>\n';
	html += '  <th>Delete</th>\n';
	html += ' </tr>\n';

	var odd = false;
	for (var i=0; i<lookupTablesConfig.items.length; i++) {
		var table = lookupTablesConfig.items[i];
		var tableLink = '<a href="javascript:popUpTableDefinition(\'' + table.uri + '\');">' + table.id + '</a>';
		var editLink = '<a href="' + formatLink(lookupTablesConfig.page.edit + '?context=' + lookupTablesConfig.context + '&table=' + table.id) + '">' + editContent + '</a>';
		var contentsLink = '<a href="' + formatLink(lookupTablesConfig.page.entryList + '?context=' + lookupTablesConfig.context + '&table=' + table.id) + '">' + contentsContent + '</a>';
		var deleteLink = '<a href="javascript:deleteTable(\'' + table.id + '\');">' + deleteContent + '</a>';
		html += ' <tr id="row_' + i + '" class="' + (odd?'odd':'even') + '">\n';
		html += '  <td>' + tableLink + '</td>\n';
		html += '  <td>' + table.name + '</td>\n';
		html += '  <td>' + table.description + '</td>\n';
		html += '  <td align="center">' + editLink + '</td>\n';
		html += '  <td align="center">' + contentsLink + '</td>\n';
		html += '  <td align="center">' + deleteLink + '</td>\n';
		html += ' </tr>\n';
		odd = !odd;
	}

	html += '</table>\n\n';

	html += '<div class="controls">\n';
	html += ' <a class="button" href="' + formatLink(lookupTablesConfig.page.edit + '?context=' + lookupTablesConfig.context) + '">Define a New Table</a>\n';
	html += '</div>\n';

	// update html document
	lookupTablesConfig.element.innerHTML = html;
	if (lookupTablesConfig.continuationFunction > '') {
		eval(lookupTablesConfig.continuationFunction + '()');
	}
}

/**
 * Opens up a new window to display the details of the specified table
 */
function popUpTableDefinition(tableUri) {
	var tableWindow = window.open(tableUri, 'tableWindow', 'toolbar=no,directories=no,status=no,scrollbars=yes,resizable=yes,resize=yes,menubar=no,height=450,width=750');
	if (window.focus) {
		tableWindow.focus();
	}
}

/**
 * Deletes the specified table
 */
function deleteTable(tableId) {
	if (confirm('Delete table "' + tableId + '" and all of its contents?')) {
		ajaxDelete(lookupTablesConfig.deleteURL + tableId, 'confirmDelete','ajaxError');
	}
}

/**
 * Confirm table delete
 */
function confirmDelete(xmlDoc) {
	alert('The specified table has been deleted.');
	getLookupTables();
}

/**
 * Format link
 */
function formatLink(url) {
	if (lookupTablesConfig.js.forward) {
		return "javascript:" + lookupTablesConfig.js.forward + "('" + url + "');";
	} else {
		return url;
	}
}

/**
 * Format return
 */
function formatBack() {
	var js = 'history.back();';
	if (lookupTablesConfig.js.back) {
		js = lookupTablesConfig.js.back + "();";
	}
	return js;
}
