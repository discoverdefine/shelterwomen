var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	alert("Check you out");
    $(document).on('click', '#submit', function() { // catch the form's submit event
		if ( $('#sync_key').val().length > 0 ) {
			// Send data to server through the ajax call
			// action is functionality we want to call and outputJSON is our data
				$.ajax({url: 'https://shelterforwomen.ca/admin/api.php',
					type: "POST",
					data: { action: "activate", key: api_key, sync_key: $('#sync_key').val() },
					dataType: "text",
					
					/*
					data: {action : 'activate', formData : $('#check-user').serialize()},
					type: 'post',                  
					async: 'true',
					dataType: 'json',
					*/
					
					beforeSend: function() {
						// This callback function will trigger before data is sent
						$.mobile.loading("show"); // This will show ajax spinner
					},
					complete: function() {
						// This callback function will trigger on data sent/received complete
						$.mobile.loading("hide"); // This will hide ajax spinner
					},
					success: function (result) {
						if(result.status) {
							alert('Sync key match!' + result);                        
						} else {
							alert('Sync key not found!');
						}
					},
					error: function (request,error) {
						// This callback function will trigger on unsuccessful action               
						alert('Error: ' + error);
					}
				});                  
		}
		else {
			alert('Please fill all necessary fields');
		}          
		return false; // cancel original event to prevent form submitting
	});
}

function transactionError() {
    
}