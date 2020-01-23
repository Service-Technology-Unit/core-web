// uploadmedia.js

var context = 'global';

function initializePage() {
	context = parent.context;
	if (parent.refreshList) {
		parent.refreshList();
	}
}

function submitForm() {
	var errors = '';
	
	if (document.getElementById('file').value > '') {
		
	} else {
		errors += '\nMedia file is required';
	}
	
	if (document.getElementById('description').value > '') {
		
	} else {
		errors += '\nDescription is required';
	}
	
	if (errors > '') {
		alert('Please correct the following errors and resubmit:\n' + errors); 
		return false;
	} else {
		document.getElementById('context').value = context;
		document.getElementById('file').style.visibility = 'hidden';
		document.getElementById('file').style.display = 'none';
		document.getElementById('loading').style.visibility = 'visible';
		document.getElementById('loading').style.display = '';
		return true;
	}
}
