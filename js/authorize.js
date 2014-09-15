var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    func_alert_the_guard();
}

function func_alert_the_guard(activation_key) {
    $.ajax({
        url: 'https://shelterforwomen.ca/admin/api.php?action=validate&key=' + api_key + '&activation_key=' + $activation_key,
		async: true,
        dataType: "text"
    }).done(function(response) {
		
		alert(response);

    });
}

function transactionError() {
    
}