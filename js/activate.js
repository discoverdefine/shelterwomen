var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	
	$('#btnActivate').bind('tap',getActive);
	
}

function getActive() {
	alert('Submitting form...');
	alert('Email: ' + $('#email').val());
	alert('Sync Key: ' + $('#sync_key').val());
	
	if ( $('#email').val().length > 0 && $('#sync_key').val().length > 0 ){
		// Send data to server through the ajax call
		// action is functionality we want to call and outputJSON is our data
			$.ajax({url: 'https://shelterforwomen.ca/admin/api.php',
				data: {action : 'activate', formData : $('#activate-user').serialize()},
				type: 'post',                  
				async: 'true',
				dataType: 'json',
				beforeSend: function() {
					// This callback function will trigger before data is sent
					$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
				},
				complete: function() {
					// This callback function will trigger on data sent/received complete
					$.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
				},
				success: function (result) {
					if ( result.activation_key != "" ) {
						alert("Activation Key: " + result.activation_key + "\nSync Key: " + result.sync_key);
					}
					else {
						alert('Logon unsuccessful!');
					}
				},
				error: function (request,error) {
					// This callback function will trigger on unsuccessful action               
					alert('Network error has occurred please try again!');
				}
			});                  
	} else {
		alert('Please fill all necessary fields');
	}          
	return false; // cancel original event to prevent form submitting
}



function transactionError() {
    
}
