/**
 * Javascript Humane Dates
 * Copyright (c) 2008 Dean Landolt (deanlandolt.com
 * 
 * 
 * Adopted from the John Resig's pretty.js
 * at http://ejohn.org/blog/javascript-pretty-date
 * and henrah's proposed modification 
 * at http://ejohn.org/blog/javascript-pretty-date/#comment-297458
 * 
 * Licensed under the MIT license.
 *
 *
 * Takes an ISO time and returns a string representing how
 * long ago the date represents.
 */
function humane_date(date_str){
    var seconds = (new Date() - convertISOStringToDate(date_str)) / 1000;
    var token = 'ago', list_choice = 1;
    
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    
    if (seconds < 60)
        return 'just now';
    
    var i = 0, format;
    while (format = time_formats[i++]) if (seconds < format[0]) {
        if (i == 0)
            return format[1];
        if (typeof format[2] == 'string')
            return format[list_choice];
        else
            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
    
    // overflow for centuries
    if (seconds > 5806080000)
        return Math.floor(seconds / 2903040000) + ' centuries ' + token;
    
    return date_str;
};

var time_formats = [
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'yesterday', 'tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'last week', 'next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'last month', 'next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
];

	
function convertISOStringToDate(dateString) {
	var returnDate = null;

	var datePortion = dateString;
	var relativeOffset = 0;
	if (dateString.length > 19) {
		datePortion = dateString.substring(0,19);
		var timeZonePortion = dateString.substring(19);
		var sign = timeZonePortion.substring(0,1);
		if (sign == '+' || sign == '-') {
			var multiplier = -1;
			if (sign == '-') {
				multiplier = 1;
			}
			var localOffset = (new Date()).getTimezoneOffset();
			relativeOffset = (((timeZonePortion.substring(1,3) * 60) + (timeZonePortion.substring(4,6) * 1)) * multiplier) - localOffset;
		}
	}
	datePortion = datePortion.replace(/T/g, ' ');
	datePortion = datePortion.replace(/-/g, '/');
	returnDate = new Date(datePortion);
	if (relativeOffset != 0) {
		returnDate = new Date(returnDate.getTime() + (relativeOffset * 60000));
	}

	return returnDate;
}
