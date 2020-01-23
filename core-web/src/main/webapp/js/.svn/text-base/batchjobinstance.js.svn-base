// batchjobinstance.js

function init() {
	fixDates();
}

/**
 * Reformats all of the ISO 8601 dates
 */
function fixDates() {
	var thisDate = document.getElementById("startDateTime").innerHTML;
	if (thisDate > '') {
		document.getElementById("startDateTime").innerHTML = convertISODate(thisDate);
	}
	thisDate = document.getElementById("endDateTime").innerHTML;
	if (thisDate > '') {
		document.getElementById("endDateTime").innerHTML = convertISODate(thisDate);
	}
	fixEventDates();
	fixStatisticValues();
}

function fixEventDates() {
	var i = 1;
	var done = false;
	while (!done) {
		var id = "event_" + i;
		if (document.getElementById(id)) {
			var thisDate = document.getElementById(id).innerHTML;
			if (thisDate > '') {
				document.getElementById(id).innerHTML = convertISODate(thisDate);
			}
			i++;
		} else {
			done = true;
		}
	} 
}

function fixStatisticValues() {
	var i = 1;
	var done = false;
	while (!done) {
		var id = "value_" + i;
		if (document.getElementById(id)) {
			var format = document.getElementById("format_" + i).value;
			var value = document.getElementById(id).innerHTML;
			if (value > '') {
				document.getElementById(id).innerHTML = formatValue(value, format);
			}
			i++;
		} else {
			done = true;
		}
	} 
}

function formatValue(value, format) {
	var result = '';

	if (format == "currency") {
		result = formatCurrencyValue(value);
	} else if (format == "percent") {
		result = formatPercentValue(value);
	} else if (format == "date") {
		result = formatDateValue(value);
	} else if (format == "duration") {
		result = formatDurationValue(value);
	} else {
		result = formatIntegerValue(value);
	}

	return result;
}

function formatCurrencyValue(value) {
	var result = '$0.00';

	var i = parseInt(value);
	if (!isNaN(i) && i > 0) {
		i = i + '';
		while (i.length < 3) {
			i = '0' + i;
		}
		var intPart = i.substr(0, i.length - 2);
		var decPart = i.substr(i.length - 2);
		result = '$' + formatIntegerValue(intPart) + '.' + decPart;
	}

	return result;
}

function formatPercentValue(value) {
	var result = '0.00%';

	var i = parseInt(value);
	if (!isNaN(i) && i > 0) {
		i = i + '';
		while (i.length < 3) {
			i = '0' + i;
		}
		var intPart = i.substr(0, i.length - 2);
		var decPart = i.substr(i.length - 2);
		result = formatIntegerValue(intPart) + '.' + decPart + '%';
	}

	return result;
}

function formatDateValue(value) {
	var result = '';

	var i = parseInt(value);
	if (!isNaN(i) && i > 0) {
		var dt = new Date(i);
		result = formatDate(dt) + ' ' + dt.timeFormat('short');
	}

	return result;
}

function formatDurationValue(value) {
	var result = '';
	var ONE_DAY = 86400;
	var ONE_HOUR = 3600;
	var ONE_MINUTE = 60;

	// seconds
	var seconds = Math.floor(value/1000);
	var milliseconds = value - (seconds * 1000);
	milliseconds += '';
	while (milliseconds.length < 3) {
		milliseconds = '0' + milliseconds;
	}

	// days
	var days = Math.floor(seconds/ONE_DAY);
	seconds = seconds - days * ONE_DAY;

	// hours
	var hours = Math.floor(seconds/ONE_HOUR);
	seconds = seconds - hours * ONE_HOUR;

	// minutes
	var minutes = Math.floor(seconds/ONE_MINUTE);
	seconds = seconds - minutes * ONE_MINUTE;

	var show_anyway = false;
	if (days > 0 || show_anyway) {
		result += days;
		result += ' day';
		if (days != 1) {
			result += 's';
		}
		result += ' ';
		show_anyway = true;
	}
	if (hours > 0 || show_anyway) {
		result += hours;
		result += ' hour';
		if (hours != 1) {
			result += 's';
		}
		result += ' ';
		show_anyway = true;
	}
	if (minutes > 0 || show_anyway) {
		result += minutes;
		result += ' minute';
		if (minutes != 1) {
			result += 's';
		}
		result += ' ';
		show_anyway = true;
	}
	result += seconds + '.' + milliseconds;
	result += ' seconds';

	return result;
}

function formatIntegerValue(value) {
	var result = '0';

	var i = parseInt(value);
	if (!isNaN(i)) {
		var minus = '';
		if (i < 0) {
			minus = '-';
		}
		i = Math.abs(i);
		var n = new String(i);
		var a = [];
		while(n.length > 3)	{
			var nn = n.substr(n.length - 3);
			a.unshift(nn);
			n = n.substr(0, n.length - 3);
		}
		if (n.length > 0) {
			a.unshift(n);
		}
		result = minus + a.join(",");
	}

	return result;
}

/**
 * Converts the ISO 8061 date format into m/d/yyyy hh:mm xm
 */
function convertISODate(dateTimeString) {
	var dt = Date.parseIso8601(dateTimeString); 
	return formatDate(dt) + ' ' + dt.timeFormat('short');
}

/**
 * Converts the date into m/d/yyyy
 */
function formatDate(dt) {
	var date = new Date();
	var today = date.dateFormat('short');
	var yesterday = date.add(-1, 'days').dateFormat('short');
	var returnValue = dt.dateFormat("short"); 

	if (returnValue == today) {
		returnValue = 'Today';
	} else if (returnValue == yesterday) {
		returnValue = 'Yesterday';
	}

	return returnValue;
}
