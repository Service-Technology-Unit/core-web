// ajaxcall.js

/**
 * This function processes the Ajax URL to GET data
 */
function ajaxGet(url, responseFunction, errorFunction) {
	var httpRequest = getNewHttpRequestObject(url);
	
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4) {
			try {
				if (httpRequest.status == 200) {
					eval(responseFunction + '(httpRequest.responseXML)');
				} else {
					eval(errorFunction + '(httpRequest)');
				}
			} catch (e) {
				if (window.XMLHttpRequest) {
					alert('There has been an error processing this request for URL ' + httpRequest.originalURL + ':\n' + e);
				} else {
					alert('There has been an error processing this request:\n' + e);
				}
			}
		}
	}

	//Request the XML document
	httpRequest.open('GET', url, true);
	httpRequest.send('');
}

/**
 * This function processes the Ajax URL to GET JSON data
 */
function ajaxGetJson(url, responseFunction, errorFunction) {
	var httpRequest = getNewHttpRequestObject(url);
	
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4) {
			try {
				if (httpRequest.status == 200) {
					eval(responseFunction + '(' + httpRequest.responseText + ')');
				} else {
					eval(errorFunction + '(httpRequest)');
				}
			} catch (e) {
				if (window.XMLHttpRequest) {
					alert('There has been an error processing this request for URL ' + httpRequest.originalURL + ':\n' + e);
				} else {
					alert('There has been an error processing this request:\n' + e);
				}
			}
		}
	}

	//Request the XML document
	httpRequest.open('GET', url, true);
	httpRequest.send('');
}

/**
 * This function processes the Ajax URL to PUT data
 */
function ajaxPut(url, data, responseFunction, errorFunction) {
	var httpRequest = getNewHttpRequestObject(url);
	
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4) {
			try {
				if (httpRequest.status == 200) {
					eval(responseFunction + '(httpRequest.responseXML)');
				} else {
					eval(errorFunction + '(httpRequest)');
				}
			} catch (e) {
				if (window.XMLHttpRequest) {
					alert('There has been an error processing this request for URL ' + httpRequest.originalURL + ':\n' + e);
				} else {
					alert('There has been an error processing this request:\n' + e);
				}
			}
		}
	}

	httpRequest.open('PUT', url, true);
	httpRequest.setRequestHeader("Content-type", "text/xml");
	httpRequest.setRequestHeader("Content-length", data.length);
	httpRequest.send(data);
}

/**
 * This function processes the Ajax URL to POST data
 */
function ajaxPost(url, parameters, responseFunction, errorFunction) {
	var httpRequest = getNewHttpRequestObject(url);
	
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4) {
			try {
				if (httpRequest.status == 200) {
					eval(responseFunction + '(httpRequest.responseXML)');
				} else {
					eval(errorFunction + '(httpRequest)');
				}
			} catch (e) {
				if (window.XMLHttpRequest) {
					alert('There has been an error processing this request for URL ' + httpRequest.originalURL + ':\n' + e);
				} else {
					alert('There has been an error processing this request:\n' + e);
				}
			}
		}
	}

    httpRequest.open('POST', url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.setRequestHeader("Content-length", parameters.length);
    httpRequest.send(parameters);
}

/**
 * This function processes the Ajax URL to DELETE data
 */
function ajaxDelete(url, responseFunction, errorFunction) {
	var httpRequest = getNewHttpRequestObject(url);
	
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4) {
			try {
				if (httpRequest.status == 200) {
					eval(responseFunction + '(httpRequest.responseXML)');
				} else {
					eval(errorFunction + '(httpRequest)');
				}
			} catch (e) {
				if (window.XMLHttpRequest) {
					alert('There has been an error processing this request for URL ' + httpRequest.originalURL + ':\n' + e);
				} else {
					alert('There has been an error processing this request:\n' + e);
				}
			}
		}
	}

	//Request the XML document
	httpRequest.open('DELETE', url, true);
	httpRequest.send('');
}

/**
 * This function builds and returns an httpRequest object
 */
function getNewHttpRequestObject(url) {
	var httpRequest = null;

	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
		httpRequest.originalURL = url;
	} else if (window.ActiveXObject) {
		var objects = [
			"MSXML2.XMLHTTP.8.0",
			"MSXML2.XMLHTTP.7.0",
			"MSXML2.XMLHTTP.6.0",
			"MSXML2.XMLHTTP.5.0",
			"MSXML2.XMLHTTP.4.0",
			"MSXML2.XMLHTTP.3.0",
			"MSXML2.XMLHTTP.2.6",
			"MSXML2.XMLHTTP",
			"Microsoft.XMLHTTP.1.0",
			"Microsoft.XMLHTTP.1",
			"Microsoft.XMLHTTP"];
		for (var i=0; i<objects.length; i++) {
			try {
				httpRequest = new ActiveXObject(objects[i]);
				i = objects.length;
			} catch (e) {
			}
		}
	}

	return httpRequest;
}

/**
 * This function is the default error handler
 */
function ajaxError(httpRequest) {
	var message = 'An invalid response was received while handling this request';
	if (window.XMLHttpRequest) {
		message += ' for URL ' + httpRequest.originalURL;
	}
	message += ':\nResponse code: ';
	message += httpRequest.status;
	message += '\nResponse: ';
	message += httpRequest.statusText;
	alert(message);
}
