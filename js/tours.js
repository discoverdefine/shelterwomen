var db;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    func_too_legit();
    
	populateToursListview();
}

function getShelters_success(tx, results) {
    var len = results.rows.length;
    $("#lst_tours_listview").empty();
    for (var i = 0; i < len; i++) {
        var shelter = results.rows.item(i);
        $("#lst_tours_listview").append("<li>" +
            "<a href=\"tour.html?id_shelter=" + shelter.id_shelter + "\" data-ajax=\"false\" class=\"tour_link\">"+
            "<h2>" +
            unescape(shelter.shelter_name) +
            "</h2></a>" +
            "</li>");
    }
    if ($("#lst_tours_listview").length != 0) {
        $("#lst_tours_listview").listview('refresh');
    }
}

function populateToursListview() {
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = "SELECT id_shelter, shelter_name, shelter_description " +
		"FROM da_shelters";
                transaction.executeSql(sql, [], getShelters_success);
        }, transactionError
    );
}

function transactionError() {
    
}