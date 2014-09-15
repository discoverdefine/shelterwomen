var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	alert("Alert the guard!");
    func_alert_the_guard();
}

//Checks to see if activation key has been saved locally and if so, retrieves it, otherwise redirects to activation screen
function func_too_legit() {
	//Get the root for the local server
    nativeLocalRootPath = fileSystem.root.toURL();
    //Build full path to activation key file from the root down
    var local_file_full_path = nativeLocalRootPath + "casvaw/activation.key";
    //Check for existence of activation key file on local server
    fileSystem.root.getFile(local_file_full_path, {create: false, exclusive: false}, function() {
		//If file exists then grab the activation key and compare it to the one on the server
		local_file_full_path.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function(e) {
				alert(this.result);
				//console.log("Text is: "+this.result);
				//document.querySelector("#textArea").innerHTML = this.result;
			}
			reader.readAsText(file);
		}, function() {
		//If file doesn't exist, the user has not activated their app so redirect them to the activation page
			window.location.href="activate.html";
			return; //Added just to be safe
		});
	});
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

function transactionError() {
    
}