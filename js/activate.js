var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	
	$('#btnActivate').bind('click',getActive);
	db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
	
}

function getActive() {
	v_email = $('#email').val();
	v_sync_key = $('#sync_key').val();
	
	if ( v_email.length > 0 && v_sync_key.length > 0 ) {
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
		
		.done( function(data) {
			
			if ( data.status == true ) {
				
				var str_query = "INSERT INTO da_security (sync_key, activation_key) VALUES ('" + escape(data.sync_key) + "', '" + escape(data.activation_key) + "')";
				db.transaction(
					function (transaction) {
						transaction.executeSql(str_query);
					}, transactionError,
					function () {
						//User has been successfully activated so send them to the directory page
						window.location.href="directory.html";
					}
				);
				
			}
			else {
				alert("Activation failed");
			}
			
		});
	}		
	else {
		alert('All fields required');
	}
	
	return false; // cancel original event to prevent form submitting		
	
}

function transactionError() {
    
}
