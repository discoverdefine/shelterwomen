document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log("Device is ready on index page");
	
	

var alertBox = Ext.Msg.alert("Alert","How are you?");
setTimeout(function(){
   alertBox.hide();
}, 
5000);


	
    createToursTables();
    createDirectoryTables();
    
    populateDirectoryListview();
}

function createToursTables() {
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = "CREATE TABLE IF NOT EXISTS da_shelters (" + 
                                "id_shelter INTEGER," + 
                                "shelter_name VARCHAR(255)," + 
                                "shelter_description TEXT"+ 
                            ")";
            transaction.executeSql(sql);
            
            var sql = "CREATE TABLE IF NOT EXISTS da_shelter_images (" +
                                "id_image INTEGER,"+
                                "image_path VARCHAR(255),"+
                                "id_shelter INTEGER,"+
                                "is_default INTEGER,"+
                                "id_set INTEGER"+
                            ")";
            transaction.executeSql(sql);
        }, transactionError
    );
}

function createDirectoryTables() {
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = 
		"CREATE TABLE IF NOT EXISTS da_service (" +
		"id_service INTEGER," +
		"type_service VARCHAR(255)," +
		"name_service VARCHAR(255)," +
		"s_area VARCHAR(255)," +
		"address TEXT," +
		"phone_crisis VARCHAR(50)," +
		"phone_office VARCHAR(50)," +
		"website VARCHAR(255)," +
		"languages VARCHAR(255)," +
		"accessibility VARCHAR(255)," +
		"serves VARCHAR(255)," +
		"details TEXT" +
		")";
            transaction.executeSql(sql);
        }, transactionError
    );
}

function transactionError() {
    
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
            $("#lst_directory_listview").append("<p><small>In order to run the application for the first time you will need to connect to the Internet (a WiFi connection is recommended to avoid additional data fees) and then SYNC with the online database.</small></p><a href=\"help.html\" data-ajax=\"false\" data-transition=\"flow\">See \"How do I get the latest data?\"</a>");
        }
        $("#lst_directory_listview").listview('refresh');
    }
}