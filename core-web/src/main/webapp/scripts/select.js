// select.js

/**
 *	Global Variables
 */
var isStandardSelect = false;		//Identifies the standardized version
var isSingleSelect = false;			//Identifies the specialized "singleSelect" version
var useContains = false;			//When true, the search value is "contains"; otherwise, "startsWith"
var activeColumn = 'id';			//For "standard" versions, the active column
var fieldName = [];					//For "standard" versions, the field name array
var fieldIndex = {};				//For "standard" versions, the field index map
var fieldLabel = [];				//For "standard" versions, the field label array
var baseXmlUrl = '';				//For "standard" versions, the base url for the XML data
var count = 10;						//The default number of documents to return per page (can be overridden with the URL Param "count", e.g. "...html?count=20)
var startsWith = '%';				//The search value
var defaultStartsWith = '%';		//The default search value
var results;						//stores the xml returned from the view
var optionListSize = 0;				//stores the total number of options in the list
var currentValues = [];				//Array of values from which to choose
var selectedValues = [];			//Array of values to be written back
var orderBy = '';					//Optional place holder for sorting value
var titleText = 'Data Selection';	//The pop-up screen title
var errorMessage = 'There has been an error displaying the data:<br />';
									//stores the error message prefix
var queryParameters = {};			//stores the parameters passed via the HTML query string
var selectedRow = -1;				//stores the row id index of the highlighted row
var lastRow = -1;					//Last row on page. Reset during build of page or search change
var searchFieldElement = null;		//stores the Startswith or Contains input field element

/**
 * Constructs and returns the path to the appropriate javascript
 */
function getJavascriptPath() {
	processQueryParameters();
	var jsPath = '';
	if (queryParameters.js > '') {
		jsPath = queryParameters.js;
	} else {
		if (queryParameters.id > '') {
			jsPath = '/core/scripts/' + queryParameters.id + 'select.js';
		}
	}
	return jsPath;
}

/**
 * Process the HTML query string parameters
 */
function processQueryParameters() {
	var thisUrl = window.location.href;
	if (thisUrl.indexOf('?') != -1) {
		var queryString = thisUrl.substr(thisUrl.indexOf('?') + 1);
		var parmList = queryString.split('&');
		for (var i=0; i<parmList.length; i++) {
			var nvpString = parmList[i];
			if (nvpString.indexOf('=') != -1) {
				var nvp = parmList[i].split('=');
				var name = nvp[0];
				var value = '';
				if (nvp.length > 1) {
					value = nvp[1];
				}
				queryParameters[name] = value;
			}
		}
	}

	if (queryParameters.ss > '') {
		document.getElementById('csslink').setAttribute('href', queryParameters.ss);
	}
}

/**
 * Initializes the page
 */
function initializePage() {
	// set up the "onKeyUp" process
	if (document.captureEvents && Event.KEYUP) {
		document.captureEvents(Event.KEYUP);
	}
	document.onkeyup = keyUp;

	// if the standard set-up function is present, this is a "standard" version
	if (typeof standardSetUp != 'undefined') {
		isStandardSelect = true;
		standardSetUp();
	}

	// title text is normally set during standard set-up, but if this is not standard ...
	if (!isStandardSelect) {
		titleText = getTitleText();
	}

	document.title = titleText;
	document.getElementById('startsWith').focus();
	document.getElementById('startsWith').select();

	//Check to see if any parameters are being overridden from QueryString
	if (queryParameters.count > '') {
		count = parseInt(queryParameters.count, 10);
	}
	if (queryParameters.startsWith > '') {
		startsWith = queryParameters.startsWith;
	}
	if (queryParameters.contains > '') {
		contains = queryParameters.contains;
	}
	updateSelectionData(1);
}

/**
 *  This function whenever the user types in either of the search fields
 */
function captureInput(element) {
	searchFieldElement = element;
}

/**
 * This function is called for every user keystroke
 */
function keyUp(e) {
	var keyCode = '';
	var shiftHeld = false;
	if (document.all) {
		keyCode = event.keyCode;
		shiftHeld = event.shiftKey;
	} else {
		keyCode = e.which;
		shiftHeld = e.shiftKey;
	}

	if (keyCode == '13') {
		// enter key -> select row
		if (lastRow == 0) {
			var elem = document.getElementById("row_0");	
			elem.className='highlight';
			selectedRow = 0;
		}
		storeValue(selectedRow);
	} else if (keyCode == '37') {
		if (shiftHeld) {
			// shift+left arrow -> first page
			firstPage();
		} else {
			// left arrow -> previous page
			previousPage();
		}
	} else if (keyCode == '38') {
		// up arrow -> scroll up
		setAllRows("normal");
		setRowUp ();
		var elem = document.getElementById('row_' + selectedRow);	
		elem.className='highlight';
	} else if (keyCode == '39') {
		if (shiftHeld) {
			// shift+right arrow -> last page
			lastPage();
		} else {
			// right arrow -> next page
			nextPage();
		}
	} else if ( keyCode == '40') {
		// down arrow -> scroll down
		setAllRows("normal");
		setRowDown ();
		var elem = document.getElementById('row_' + selectedRow);	
		elem.className='highlight';
	} else {
		// any other key -> update search input field
		doSearch(searchFieldElement);
	}
}

/**
 * This function highlights the specified row
 */
function highlightRow(element) {
	setAllRows('normal');
	element.className='highlight';
	var id = element.id;
	selectedRow = id.substring(id.length - 1);
}

/**
 * This function sets the class of all rows to the specified class name
 */
function setAllRows(setting) {
	for (var i = 0; i <= lastRow; i++) {
   		var element = document.getElementById('row_' + i);
   		element.className=setting;
  	}
}

/**
 * This function moves the selected row down by 1
 */
function setRowDown () {
	selectedRow = (selectedRow * 1) + 1;
	if (selectedRow > lastRow) {
		selectedRow = 0;
	}
}

/**
 * This function moves the selected row up by 1
 */
function setRowUp () {
	selectedRow = (selectedRow * 1) - 1;
	if (selectedRow < 0 || selectedRow > lastRow) {
		selectedRow = lastRow;
	}
}

/**
 * This function moves the list to the first page
 */
function firstPage() {
	updateSelectionData(1);
}

/**
 * This function moves the list to the next page
 */
function nextPage() {
	var lastMax = parseInt(results[results.length - 1].attributes[0].value, 10);
	var start = lastMax + 1;
	if (start > (optionListSize - (count - 1))) {
		start = optionListSize - (count - 1);
	}
	if (start < 1) {
		start = 1;
	}
	updateSelectionData(start);
}

/**
 * This function moves the list to the previous page
 */
function previousPage() {
	var lastMin = parseInt(results[0].attributes[0].value, 10);
	var start = lastMin - count;
	if (start < 1) {
		start = 1;
	}
	updateSelectionData(start);
}

/**
 * This function moves the list to the last page
 */
function lastPage() {
	var start = optionListSize - (count - 1);
	if (start < 1) {
		start = 1;
	}
	updateSelectionData(start);
}

/**
 * This function builds the XML search URL and processes it
 */
function doSearch(element)	{
	var search = element.value;
	startsWith = search.replace(new RegExp(/%/g), 'a'); 
	if (element.name == 'startsWith') {
		document.getElementById('contains').value = '';
	} else {
		document.getElementById('startsWith').value = '';
	}

	if (search > '') {
		useContains = (element.name=='contains');
		updateSelectionData(1);
	}
}

/**
 * This function calls the function in the parent window, passing the selected item
 */
function storeValue(index) {
	var item = currentValues[index];
	if (queryParameters.fn > '') {
		if (queryParameters.fn == 'modal') {
			window.returnValue = item.id;
			window.close();
		} else {
			if (window.opener) {
				eval('window.opener.' + queryParameters.fn + '(item)');
				window.close();
			} else {
				eval('window.parent.' + queryParameters.fn + '(item)');
			}
		}
	} else {
		if (isSingleSelect) {
			storeValueSS(index);
		} else {
			var alertString = 'You selected:\n\n';
			if (isStandardSelect) {
				alertString += standardDescribe(item);
			} else {
				alertString += describeObject(item);
			}
			alert(alertString);
		}
	}
}

/**
 * This function formats the values for a single selection
 */
function standardDescribe(item) {
	var string = '';

	for (var i=0; i<fieldName.length; i++) {
		string += fieldName[i] + ': ' + item[fieldName[i]] + '\n';
	}

	return string;
}

/**
 * This function closes the popup window
 */
function closeWindow() {
	if (window.parent == null) {
		window.close();
	} else {
		window.parent.close();
	}
}

/**
 * This function builds the XML URL and processes it
 */
function updateSelectionData(start) {
	document.getElementById('dataGrid').innerHTML = '<img src="/core/images/loading.gif"> &nbsp; Searching ... please wait.';
	ajaxGet(buildXmlUrl(startsWith, start, count, useContains), 'formatData');
}

/**
 * This function constructs and returns the XML URL
 */
function buildXmlUrl(startsWith, start, count, useContains) {
	var url = baseXmlUrl;

	if (isStandardSelect) {
		if (url.indexOf('?') > -1) {
			url += '&start=';
		} else {
			url += '?start=';
		}
		url += start + '&count=' + count;
		if (useContains) {
			url += '&contains=' + startsWith.toUpperCase();
		} else {
			url += '&startsWith=' + startsWith.toUpperCase();
		}
		if (orderBy <= '') {
			orderBy = fieldName[0];
		}
		url += '&orderBy=' + orderBy;
		activeColumn = orderBy;
	} else {
		url = getXmlUrl(startsWith, start, count, useContains);
	}

	return url;
}

/**
 * This function switches the "active" field (the sort/select field)
 */
function changeActiveField(newName) {
	var i = fieldIndex[newName] * 1;
	document.getElementById('startsWith').value = '';
	document.getElementById('contains').value = '';
	document.getElementById('startsWithLabel').innerHTML = fieldLabel[i] + ' starts with:';
	document.getElementById('containsLabel').innerHTML = fieldLabel[i] + ' contains:';
	document.getElementById('dataGrid').innerHTML = '<img src="/core/images/loading.gif"> &nbsp; Searching ... please wait.';
	startsWith = defaultStartsWith;
	orderBy = newName;
	updateSelectionData(1);
}

/**
 * This function displays the data from the XML document
 */
function formatData(xmlDoc) {
	if (isStandardSelect) {
		standardFormat(xmlDoc);
	} else {
		displayData(xmlDoc);
	}
}
/**
 * This function displays the data from the XML document
 */
function standardFormat(xmlDoc) {
	//Get areas which we are going to write results into
	var dataGrid = document.getElementById('dataGrid');
	var listStatistics = document.getElementById('listStatistics');

	try	{
		dataGrid.innerHTML = '<img src="/core/images/loading.gif"> &nbsp; Searching ... please wait.';

		//Open the XML Document
		var root = xmlDoc.documentElement;
		results = root.getElementsByTagName('option');

		// Check to make sure that there is data ...
		if (results.length > 0) {

			//Get the toplevelentries value each time in case it changes
			optionListSize = parseInt(root.attributes[0].value, 10);

			currentValues = new Array();
			var strHTML = '<i>Click on a column heading to sort/search by that column\'s data. Click on a row to select that item.</i>\n';
			strHTML += '<table width=\"100%\">\n';
			strHTML += formatColumnHeadings();
			for (i=0; i<results.length; i++) {

				var dataObject = {};
				var fields = results[i].getElementsByTagName('field');
				for (j=0;j<fields.length; j++) {
					var thisField = fields.item(j).attributes[0].value;
					var fieldValue = '';
					if (fields.item(j).firstChild != null) {
						fieldValue = fields.item(j).firstChild.data;
					}
					dataObject[thisField] = fieldValue;
				}

				//Add the dataObject to the array for future reference
				currentValues[i] = dataObject;

				strHTML += "<tr id=row_" + i + " class=\"normal\" onMouseOver=\"javascript:highlightRow(this);\" onMouseOut=\"this.className='normal'\" onClick=\"storeValue(" + i + ");\">\n";

				for (var k=0; k<fieldName.length; k++) {
					//Add the td tag for this field
					var index = k + fieldIndex[activeColumn];
					if (index >= fieldName.length) {
						index = index - fieldName.length;
					}
					if (fieldLabel[index] > '') {
						strHTML += "<td>" + dataObject[fieldName[index]] + "</td>\n";
					}
				}

				//Close the tr tag
				strHTML += "</tr>\n";
			}
			strHTML += "</table>\n";

			//Output the table HTML
			dataGrid.innerHTML = strHTML;

			//Output the document count details
			listStatistics.innerHTML = results[0].attributes[0].value + ' to ' + results[results.length - 1].attributes[0].value + ' of ' + optionListSize + ' records';
			lastRowValue = results[results.length - 1].attributes[0].value * 1;
			firstRowValue = results[0].attributes[0].value * 1
			lastRow = lastRowValue - firstRowValue;
			selectedRow = lastRow + 1;
		} else {

			// no data on file ... update display
			dataGrid.innerHTML = 'There is no data on file matching your request.';
			listStatistics.innerHTML = '0 records.';
		}
	} catch (e)	{
		dataGrid.innerHTML = errorMessage + e. message + ' (' + e.name + ')';
	}
}

/**
 * This function formats the column headings
 */
function formatColumnHeadings() {
	var html = '<tr>\n';

	for (var i=0; i<fieldName.length; i++) {
		var index = i + (fieldIndex[activeColumn] * 1);
		if (index >= fieldName.length) {
			index = index - fieldName.length;
		}
		if (fieldLabel[index] > '') {
			html += ' <th>';
			if (i > 0) {
				html += '<a href="javascript: changeActiveField(\'';
				html += fieldName[index];
				html += '\');">';
				html += fieldLabel[index];
				html += '</a>';
			} else {
				html += fieldLabel[index];
			}
			html += '</th>\n';
		}
	}

	html += '</tr>\n';

	return html;
}
