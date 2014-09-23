var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';
var authorize_key_sync;
var authorize_key_activation;

function onDeviceReady() {
	//alert("Alert the guard!");
    //func_too_legit();
}

//Checks to see if activation key has been saved locally and if so, retrieves it, otherwise redirects to activation screen
function func_too_legit() {
	db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = 
			"SELECT id_security, sync_key, activation_key " +
			"FROM   da_security WHERE sync_key IS NOT NULL AND activation_key IS NOT NULL";
                transaction.executeSql(sql, [], function(tx, results) {
                    var i_total_records = results.rows.length;
                    if ( i_total_records === 0 ) {
                        //No keys exist, the user has not activated their app so redirect them to the activation page
                        window.location.href="activate.html";
                        return; //Added just to be safe
                    }
                    else {
                        //Keys exist, the user has activated their app so set the variables and let them continue
						var authorized_keys = results.rows.item(0);
                        authorize_key_sync = authorized_keys.sync_key;
						authorize_key_activation = authorized_keys.activation_key;
						
						if ( b_check_login ) {
							//App has been registered but the app has just been launched so the user needs to log in
							window.location.href="login.html";
							return; //Added just to be safe
						}
						
                    }
                });
        }, transactionError
    );
};

function func_alert_the_guard(act_key) {
	alert("Woke the guard...");
	
	//act_key = "f84868ae448b0e0b558e4c46a195a76b";
	
	var request = $.ajax({
		url: "https://shelterforwomen.ca/admin/api.php",
		type: "POST",
		data: { action: "validate", key: api_key, activation_key: act_key },
		dataType: "text"
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
