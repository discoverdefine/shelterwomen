var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	alert("Alert the guard!");
    func_alert_the_guard();
}

function func_alert_the_guard(act_key) {
	tmp_url = "https://shelterforwomen.ca/admin/api.php";
	//tmp_data = "action=validate&key=" + api_key + "&activation_key=" + activation_key;
	//tmp_data = { action:"validate", key: api_key, activation_key: activation_key };
	alert("Woke the guard...");
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
};

function transactionError() {
    
}