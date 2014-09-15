var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    func_alert_the_guard();
}

function func_alert_the_guard(activation_key) {
	tmp_url = "https://shelterforwomen.ca/admin/api.php";
	tmp_data = "action=validate&key=" + api_key + "&activation_key=" + $activation_key;
	alert("Woke the guard...");
    $.ajax({
        url: tmp_url,
		data: tmp_data,
		type: "post",
		success: function(response, textStatus, jqXHR) {
			alert("Response: " + response);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert("Error - textStatus: " + textStatus);
			alert("Error - errorThrown: " + errorThrown);
		}
    })

}

function transactionError() {
    
}