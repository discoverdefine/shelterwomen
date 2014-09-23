document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    //Check to make sure this is a registered app
    func_too_legit();
    
    //If passed check, continue
    populateDirectoryListview();
}

function populateDirectoryListview() {
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = 
		"SELECT id_service, name_service, address " +
		"FROM   da_service";
                transaction.executeSql(sql, [], getListings_success);
        }, transactionError
    );
}

function getListings_success(tx, results) {
    var len = results.rows.length;
    $("#lst_directory_listview").empty();
    for (var i = 0; i < len; i++) {
	var listing = results.rows.item(i);
	$("#lst_directory_listview").append("<li>" + 
        "<a href=\"directory_details.html?id_service=" + listing.id_service + "\" class=\"listing_link\" data-ajax=\"false\">" +
        unescape(listing.name_service) + 
        "</a>" +
        //"<a href=\"geo:0,0?q=" + unescape(listing.address) + "\" data-role=\"button\" data-icon=\"location\" data-inline=\"true\" class=\"listing_link_map\">Map</a>" +
        "</li>");
    }
    if ($("#lst_directory_listview").length !== 0) {
        if (len === 0) {
            $("#lst_directory_listview").append("<div style=\"padding: 5px; text-align: center;\"><p>In order to run the application for the first time you will need to connect to the Internet (a WiFi connection is recommended to avoid additional data fees) and then SYNC with the online database.</p><a href=\"help.html\" data-ajax=\"false\" data-transition=\"flow\">See \"How do I get started?\"</a></div>");
        }
        $("#lst_directory_listview").listview('refresh');
    }
}

function transactionError() {
    
}
