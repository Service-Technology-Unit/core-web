// picklist.js

var pickListConfig = {};
pickListConfig.threshold = 25;
pickListConfig.control = [];
pickListConfig.table = {};

function setUpPickList(element, name, source, value, returnFunction) {
	var index = pickListConfig.control.length;
	var thisControl = {};
	thisControl.element = document.getElementById(element);
	thisControl.name = name;
	thisControl.source = source;
	thisControl.value = value;
	thisControl.returnFunction = returnFunction;
	pickListConfig.control[index] = thisControl;
	pickListConfig.currentControl = index;
	if (pickListConfig.table[source] != null) {
		determinePickListApproach();
	} else {
		ajaxGet('/core/optlist/' + source + '.xml', 'processTableSize','tableSizeError');
	}
}

function processTableSize(xmlDoc) {
	var root = xmlDoc.documentElement;
	var index = pickListConfig.currentControl;
	var thisControl =  pickListConfig.control[index];
	pickListConfig.table[thisControl.source] = parseInt(root.attributes[0].value);
	determinePickListApproach();
}

function tableSizeError(httpRequest) {
	var index = pickListConfig.currentControl;
	var thisControl =  pickListConfig.control[index];
	if (httpRequest.status == 404) {
		pickListConfig.table[thisControl.source] = 0;
		determinePickListApproach();
	} else {
		ajaxError(httpRequest);
	}
}

function determinePickListApproach() {
	var index = pickListConfig.currentControl;
	var thisControl =  pickListConfig.control[index];
	var actualSize = pickListConfig.table[thisControl.source];
	if (actualSize > pickListConfig.threshold) {
		buildPopUpPickList();
	} else {
		if (actualSize > 0) {
			ajaxGetJson('/core/options/' + thisControl.source + '.js', 'buildDropDownPickList','ajaxError');
		} else {
			buildDropDownPickList(null);
		}
	}
}

function buildPopUpPickList() {
	var index = pickListConfig.currentControl;
	var thisControl =  pickListConfig.control[index];
	var html = '<input type="text" name="' + thisControl.name + 'Label" id="' + thisControl.name + 'Label" value="' + thisControl.value + '" readonly="true">\n';
	html += '<input type="hidden" name="' + thisControl.name + '" id="' + thisControl.name + '" value="' + thisControl.value + '">\n';
	html += '<input type="submit" value="..." onclick="launchPopUpPickList(' + index + '); return false;">\n';
	thisControl.element.innerHTML = html;
	if (thisControl.returnFunction > '') {
		eval(thisControl.returnFunction + '();');
	}
}

function buildDropDownPickList(options) {
	var index = pickListConfig.currentControl;
	var thisControl =  pickListConfig.control[index];
	var html = '<select name="' + thisControl.name + '" id="' + thisControl.name + '">\n';
	if (options != null && options.length > 0) {
		for (var i=0; i<options.length; i++) {
			html += '  <option value="' + options[i].value + '"';
			if (options[i].value == thisControl.value) {
				html += ' selected';
			}
			html += '>' + options[i].label + '</option>\n';
		}
	}
	html += '</select>\n';
	thisControl.element.innerHTML = html;
	if (thisControl.returnFunction > '') {
		eval(thisControl.returnFunction + '();');
	}
	return false;
}

function launchPopUpPickList(index) {
	pickListConfig.currentControl = index;
	var thisControl =  pickListConfig.control[index];
	var url = '/core/select.html?js=/core/optlistjs/' + thisControl.source + '.js&fn=updateFormWithSelected';
	var popupWindow = window.open(url, 'popupWindow', 'toolbar=no,directories=no,status=no,scrollbars=yes,resizable=yes,resize=yes,menubar=no,height=500,width=600');
	if (window.focus) {
		popupWindow.focus();
	}
	return false;
}

function updateFormWithSelected(selected) {
	if (selected != null) {
		var index = pickListConfig.currentControl;
		var thisControl =  pickListConfig.control[index];
		thisControl.value = selected.id;
		document.getElementById(thisControl.name).value = selected.id;
		document.getElementById(thisControl.name + 'Label').value = selected.description;
	}
}
