var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	alert("Check you out");
    $(document).on('click', '#submit', function() { // catch the form's submit event
		if ( $('#sync_key').val().length > 0 ) {
			
			alert("Sync key not empty...");
			var request = $.ajax({
				url: "https://shelterforwomen.ca/admin/api.php",
				type: "POST",
				data: { action: "activate", key: api_key, sync_key: $('#sync_key').val() },
				dataType: "text"
			});
			
			request.done(function( msg ) {
				alert("Response: " + msg);
			});
			
			request.fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
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