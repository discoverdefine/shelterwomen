var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	
	$('#btnLogin').bind('click',getLogin);
	
}

function getLogin() {
	//alert('Submitting form...');
	
	v_sync_key = $('#sync_key').val();
	
	if ( v_sync_key.length > 0 ) {
		
		db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
		db.transaction(
			function(transaction) {
				var sql = 
				"SELECT id_security FROM da_security WHERE sync_key = '" + escape(v_sync_key) + "'";
					transaction.executeSql(sql, [], function(tx, results) {
						var i_total_records = results.rows.length;
						if ( i_total_records === 0 ) {
							//Key didn't match
							alert('Key not recognized');
						}
						else {
							//Key mtached so let them continue
							window.location.href="directory.html";
							return; //Added just to be safe
						}
					});
			}, transactionError
		);
		
	}		
	else {
		alert('Please enter your access key');
	}
	
	return false; // cancel original event to prevent form submitting		
	
}



function transactionError() {
    
}
