var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
}

function func_alert_the_guard(key_activation) {
    $.ajax({
        url: 'https://shelterforwomen.ca/admin/api.php?action=validate&key=' + api_key,
        async: true,
        dataType: "json"
    }).done(function(data) {
        
		alert(data);
		
		/*
        $.each(data, function() {
            var str_fields = '(';
            var str_values = '(';
            $.each(this, function(key, value) {
                str_fields = str_fields + key + ",";
                str_values = str_values + "'" + escape(value) + "',";
            });
            str_fields = str_fields.substring(0, str_fields.length - 1) + ")";
            str_values = str_values.substring(0, str_values.length - 1) + ")";

            var str_query = "INSERT INTO " + tblname + " " + str_fields + " VALUES " + str_values + "";

            db.transaction(
                function (transaction) {
                    transaction.executeSql(str_query);
                }, transactionError
            );
        });

        if (callback !== undefined && callback !== 'undefined' && callback !== 'null') {
            callback();
        }
		*/
		
    });
}

function transactionError() {
    
}