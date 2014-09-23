var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	
	$('#btnActivate').bind('click',getActive);
	
}

function getActive() {
	//alert('Submitting form...');
	
	v_email = $('#email').val();
	v_sync_key = $('#sync_key').val();
	
	//if ( $('#email').val().length > 0 && $('#sync_key').val().length > 0 ) {
	if ( v_email.length > 0 && v_sync_key.length > 0 ) {
		
	//alert('Email: ' + v_email);
	//alert('Sync Key: ' + v_sync_key);
		
		// Send data to server through the ajax call
		// action is functionality we want to call and outputJSON is our data
		$.ajax({
			url: 'https://shelterforwomen.ca/admin/api.php?action=activate&key=' + api_key + '&sync_key=' + v_sync_key + '&email=' + v_email,
			async: 'true',
			
			type : "GET",
			dataType: 'json',
			
			beforeSend: function() {
				// This callback function will trigger before data is sent
				$.mobile.loading("show"); // This will show ajax spinner
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				$.mobile.loading("hide"); // This will hide ajax spinner
			}
		})
		
		.done( function(response) {
			
			//a_activate_response = json_decode(activate_response, true);
			//b_is_array = a_activate_response.isArray();
			
			alert("Response: " + response.sync_key);
			
			//if ( response.status == true ) {
			
			//if ( !empty(activate_response) ) {
			
				alert('Got a response!');
			
			//alert("Is array: " + b_is_array);
			
				//if ( data.status ) {
					//alert(data.sync_key);
					//alert(data.activation_key);
			//}
			//else {
			//	alert("Activation failed");
			//}
			
		});
	}
		
			/*
			beforeSend: function() {
				// This callback function will trigger before data is sent
				$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				$.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
			},
			success: function (result) {
				
				
				if ( result.status ) {
	
					alert('We have contact...');
	
				}
				else {
					alert('Activation failed');
				}
				
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action               
				alert('Network error has occurred please try again!');
			}
		});
		*/
		
	else {
		alert('Please fill all necessary fields');
	}
	
	return false; // cancel original event to prevent form submitting		
	
}



function transactionError() {
    
}
