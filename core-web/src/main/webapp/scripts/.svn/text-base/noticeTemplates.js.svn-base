// noticeTemplates.js

var noticeTemplatesConfig = {};
//The global var noticeTemplatesConfig.icon should be set outside, in the same file
//that will be calling setUpNoticeTemplates()
noticeTemplatesConfig.js = {};
noticeTemplatesConfig.icon = {};

/**
 * Set up the template list
 */
function setUpNoticeTemplates(element, page, continuationFunction) {
	// store page element for later use
	noticeTemplatesConfig.element = element;
	// store page names for later use
	noticeTemplatesConfig.page = page;
	// store continuation function for later use
	noticeTemplatesConfig.continuationFunction = continuationFunction;
	// initialize config
	noticeTemplatesConfig.fetchURL = '/core/template';
	if (noticeTemplatesConfig.context > '') {
		noticeTemplatesConfig.fetchURL += '/' + noticeTemplatesConfig.context;
	}
	getNoticeTemplates();
}

/**
 * Fetch the templates and display them on the page
 */
function getNoticeTemplates() {
	var time = new Date().getTime();
	noticeTemplatesConfig.element.innerHTML = '<img src="/core/images/loading.gif"> &nbsp; Searching ... please wait.';
	ajaxGet(noticeTemplatesConfig.fetchURL, 'processNoticeTemplates','noticeTemplatesAjaxError');
}

/**
 * Fetch the action items and display them on the page
 */
function processNoticeTemplates(xmlDoc) {
	var root = xmlDoc.documentElement;
	templateList = root.getElementsByTagName('template');
	if (templateList.length > 0) {
		noticeTemplatesConfig.items = [];
		for (var i=0; i<templateList.length; i++) {
			var template = {};
			template.id = templateList[i].attributes[0].value;
			template.uri = templateList[i].attributes[1].value;
			noticeTemplatesConfig.items[i] = template;
		}
		noticeTemplatesConfig.itemIndex = 0;
		fetchNoticeTemplateDetail();
	} else {
		noticeTemplatesConfig.element.innerHTML = '';
		if (noticeTemplatesConfig.continuationFunction > '') {
			eval(noticeTemplatesConfig.continuationFunction + '()');
		}
	}
}

/**
 * Reports on AJAX errors
 */
function noticeTemplatesAjaxError(httpRequest) {
	if (httpRequest.status == 404) {
		var html = '<p>There are no records on file matching your search criteria.</p>\n<br />\n';
		var editPage = noticeTemplatesConfig.page.edit + '?context=global';
		if (noticeTemplatesConfig.context > '') {
			editPage = noticeTemplatesConfig.page.edit + '?context=' + noticeTemplatesConfig.context;
		}
		html += '<div class="controls">\n';
		html += ' <a class="button" href="' + formatLink(editPage) + '">Create a New Template</a>\n';
		html += '</div>\n';
		if (noticeTemplatesConfig.continuationFunction > '') {
			eval(noticeTemplatesConfig.continuationFunction + '()');
		}
		noticeTemplatesConfig.element.innerHTML = html;
	} else {
		ajaxError(httpRequest);
	}
}

/**
 * Fetch the details for one action item
 */
function fetchNoticeTemplateDetail() {
	var i = noticeTemplatesConfig.itemIndex;
	ajaxGet(noticeTemplatesConfig.items[i].uri, 'processNoticeTemplateDetail','ajaxError');
}

/**
 * Process the details for one action item
 */
function processNoticeTemplateDetail(xmlDoc) {
	var i = noticeTemplatesConfig.itemIndex;
	var template = noticeTemplatesConfig.items[i];
	var root = xmlDoc.documentElement;
	template.context = root.attributes[1].value;
	template.name = root.attributes[2].value;
	template.description = root.getElementsByTagName('description')[0].firstChild.data;
	template.contentType = root.getElementsByTagName('contentType')[0].firstChild.data;
	template.defaultDeliveryMethod = root.getElementsByTagName('defaultDeliveryMethod')[0].firstChild.data;

	// move on to next item
	noticeTemplatesConfig.itemIndex++;
	if (noticeTemplatesConfig.itemIndex < noticeTemplatesConfig.items.length) {
		fetchNoticeTemplateDetail();
	} else {
		noticeTemplatesConfig.itemIndex = 0;
		buildNoticeTemplateHTML();
	}
}

/**
 * Builds the HTML from the action item data
 */
function buildNoticeTemplateHTML() {
	var editContent = 'edit';
	if (noticeTemplatesConfig.icon.edit > '') {
		editContent = '<img src="' + noticeTemplatesConfig.iconPath + noticeTemplatesConfig.icon.edit + '" alt="Edit" border="0"/>';
	}
	var deleteContent = 'delete';
	if (noticeTemplatesConfig.icon.del > '') {
		deleteContent = '<img src="' + noticeTemplatesConfig.iconPath + noticeTemplatesConfig.icon.del + '" alt="Delete" border="0"/>';
	}

	var html = '<table>\n';
	html += ' <tr>\n';
	html += '  <th>Name</th>\n';
	html += '  <th>Description</th>\n';
	html += '  <th>Content</th>\n';
	html += '  <th>Delivery</th>\n';
	html += '  <th>Edit</th>\n';
	html += '  <th>Delete</th>\n';
	html += ' </tr>\n';

	var odd = false;
	for (var i=0; i<noticeTemplatesConfig.items.length; i++) {
		var template = noticeTemplatesConfig.items[i];
		var templateLink = '<a href="javascript:popUpTemplateDefinition(\'' + template.uri + '\');">' + template.name + '</a>';
		var editLink = '<a href="' + formatLink(noticeTemplatesConfig.page.edit + '?context=' + template.context + '&name=' + template.name) + '">' + editContent + '</a>';
		var deleteLink = '<a href="javascript:deleteTemplate(\'' + template.uri + '\');">' + deleteContent + '</a>';
		html += ' <tr id="row_' + i + '" class="' + (odd?'odd':'even') + '">\n';
		html += '  <td>' + templateLink + '</td>\n';
		html += '  <td>' + template.description + '</td>\n';
		html += '  <td>' + template.contentType + '</td>\n';
		html += '  <td>' + template.defaultDeliveryMethod + '</td>\n';
		html += '  <td align="center">' + editLink + '</td>\n';
		html += '  <td align="center">' + deleteLink + '</td>\n';
		html += ' </tr>\n';
		odd = !odd;
	}

	html += '</table>\n\n';

	var editPage = noticeTemplatesConfig.page.edit + '?context=global';
	if (noticeTemplatesConfig.context > '') {
		editPage = noticeTemplatesConfig.page.edit + '?context=' + noticeTemplatesConfig.context;
	}
	html += '<div class="controls">\n';
	html += ' <a class="button" href="' + formatLink(editPage) + '">Create a New Template</a>\n';
	html += '</div>\n';

	// update html document
	noticeTemplatesConfig.element.innerHTML = html;
	if (noticeTemplatesConfig.continuationFunction > '') {
		eval(noticeTemplatesConfig.continuationFunction + '()');
	}
}

/**
 * Opens up a new window to display the details of the specified template
 */
function popUpTemplateDefinition(templateURI) {
	var templateWindow = window.open(templateURI, 'templateWindow', 'toolbar=no,directories=no,status=no,scrollbars=yes,resizable=yes,resize=yes,menubar=no,height=450,width=750');
	if (window.focus) {
		templateWindow.focus();
	}
}

/**
 * Deletes the specified template
 */
function deleteTemplate(templateURI) {
	if (confirm('Delete this template?')) {
		ajaxDelete(templateURI, 'confirmDelete','ajaxError');
	}
}

/**
 * Confirm template delete
 */
function confirmDelete(xmlDoc) {
	alert('The specified template has been deleted.');
	getNoticeTemplates();
}

/**
 * Format link
 */
function formatLink(url) {
	if (noticeTemplatesConfig.js.forward) {
		return "javascript:" + noticeTemplatesConfig.js.forward + "('" + url + "');";
	} else {
		return url;
	}
}

/**
 * Format return
 */
function formatBack() {
	var js = 'history.back();';
	if (noticeTemplatesConfig.js.back) {
		js = noticeTemplatesConfig.js.back + "();";
	}
	return js;
}
