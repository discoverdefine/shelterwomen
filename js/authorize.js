var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	alert("Alert the guard!");
    func_too_legit();
}

function set_root_directory() {	
	//alert("Create root folder if needed...");	
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		//alert("Got file system root...");
        var file_system_root = fileSystem.root;
        //Check for local folder "casvaw" and create it if it doesn't exist
        file_system_root.getDirectory("casvaw", {create:true, exclusive: false}, function() {
            //Folder exists or was created
		}, function() {
            alert("Could not create casvaw...");
        });
	});
}

//Checks to see if activation key has been saved locally and if so, retrieves it, otherwise redirects to activation screen
function func_too_legit() {
alert("Too legit...");
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
alert("Path: " + fileSystem.root + "casvaw/activation.key");
		fileSystem.root.getFile("casvaw/activation.key", {create: false, exclusive: false}, function() {
alert("Found the file?");
			//If file exists then grab the activation key and compare it to the one on the server
			fileSystem.root + "casvaw/activation.key".file(function(file) {
				var reader = new FileReader();
				reader.onloadend = function(e) {
					alert(this.result);
					//console.log("Text is: "+this.result);
					//document.querySelector("#textArea").innerHTML = this.result;
				}
			reader.readAsText(file);
			}, function() {
alert("No file");
				//If file doesn't exist, the user has not activated their app so redirect them to the activation page
				window.location.href="activate.html";
				return; //Added just to be safe
			});
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