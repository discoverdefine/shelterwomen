var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	alert("Alert the guard!");
    func_alert_the_guard();
}

function func_alert_the_guard(act_key) {
	alert("Woke the guard...");

	var request = $.ajax({
		url: "https://shelterforwomen.ca/admin/api.php",
		type: "POST",
		data: { action: "validate", key: api_key, activation_key: act_key },
		dataType: "html"
	});
	
	request.done(function( msg ) {
		alert("Response: " + msg);
	});
	
	request.fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
	
	//tmp_data = "action=validate&key=" + api_key + "&activation_key=" + activation_key;
	//tmp_data = { action:"validate", key: api_key, activation_key: activation_key };
    /*
	$.post(
        tmp_url,
		{
			action: "validate",
			key: api_key,
			activation_key: act_key
		},
		function(response) {
			alert("Response: " + response);
		}
	);
	*/
	
};

function transactionError() {
    
}