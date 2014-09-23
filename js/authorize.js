var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';
var authorize_key_sync;
var authorize_key_activation;

function onDeviceReady() {
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
						
						if ( b_check_login == "true" ) {
							//App has been registered but the app has just been launched so the user needs to log in
							window.location.href="login.html";
							return; //Added just to be safe
						}
						
                    }
                });
        }, transactionError
    );
};

function func_alert_the_guard() {
	if ( authorize_key_sync.length > 0 && authorize_key_activation.length > 0 ) {
		// Send data to server through the ajax call
		// action is functionality we want to call and outputJSON is our data
		$.ajax({
			url: 'https://shelterforwomen.ca/admin/api.php?action=validate&key=' + api_key + '&sync_key=' + authorize_key_sync + '&activation_key=' + authorize_key_activation,
			async: 'true',
			
			type : "GET",
			dataType: 'json',
			
			beforeSend: function() {
				// This callback function will trigger before data is sent
				//$.mobile.loading("show"); // This will show ajax spinner
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				//$.mobile.loading("hide"); // This will hide ajax spinner
			}
		})
		
		.done( function(data) {
			
			if ( data.status == true ) {
				//User's credentials pass so let them sync up
				sync_listings_start();
			}
			else {
				//User's credentials fail so clear their local credentials and send them to the activate page
				var str_query = "DELETE FROM da_security";
				db.transaction(
					function (transaction) {
						transaction.executeSql(str_query);
					}, function () {
						//Deactivation failed so we need to handle it somehow - clunky for now
						window.location.href="directory.html";
					},
					function () {
						//User has been successfully deactivated so send them to the activate page
						window.location.href="activate.html";
					}
				);
			}
			
		});
	}		
	else {
		alert('Please fill all necessary fields');
	}
		
};
