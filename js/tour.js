var db;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    func_too_legit();
    
}

$(document).on('pageinit', function(){
    var url = $.url(document.location);
    var id_shelter = url.param("id_shelter");
    
    populateTourRooms(id_shelter);
});

function populateTourRooms(id_shelter) {
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = "SELECT * FROM da_shelters WHERE id_shelter = " + id_shelter;
            transaction.executeSql(sql, [], populateTourRoomsHtml);
        }, transactionError
    );
}

function populateTourRoomsHtml(tx, results) {
    var tour = results.rows.item(0);
    id_shelter = tour.id_shelter;
        
    $("#content").empty();
    $("#content").append('<h3 style="text-align: center;">' + unescape(tour.shelter_name) + '</h3>');
    
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    //Grab title
    db.transaction(
        function(transaction) {
            //transaction.executeSql("SELECT * FROM da_shelter_images WHERE id_shelter = " + id_shelter + " AND is_default <> 1 GROUP BY id_set", [], function(tx, results) {
            //transaction.executeSql("SELECT * FROM da_shelter_images WHERE id_shelter = " + id_shelter + " AND image_title IS NOT NULL AND image_title <> '' GROUP BY id_set", [], function(tx, results) {
            transaction.executeSql("SELECT * FROM da_shelter_images WHERE id_shelter = " + id_shelter + " AND (image_path = 'c1.jpg' OR image_path = 'c2.jpg' OR image_path = 'c3.jpg' OR image_path = 'c4.jpg')", [], function(tx, results) {
                var len = results.rows.length;
                //alert("Records: " + len);
                // First populate the main images in #div_tour_details
                id_shelter_already_displayed = false;

                for (var i = 0; i < len; i++) {
                    html_to_append = '';
                    var tourimage = results.rows.item(i);
                    
                    id_image = tourimage.id_image;
                    image_path = tourimage.image_path;
                    image_title = tourimage.image_title;
                    id_shelter = tourimage.id_shelter;
                    id_set = tourimage.id_set;
                    
                    html_to_append = html_to_append + '<a href="room.html?id_set=' + id_set + '&id_shelter=' + id_shelter + '" data-ajax="false" data-role="button">' + unescape(image_title) + '</a>';
                    html_to_append = html_to_append + '<a href="room.html?id_set=' + id_set + '&id_shelter=' + id_shelter + '" data-ajax="false"><img class="popphoto" src="file:///storage/sdcard0/casvaw/tours/' + id_shelter + '/' + image_path + '" style="width: 100%; height: auto;"></a><br><br>';

                    $("#content").append(html_to_append).trigger('create');
                }
            });
        }, function () {
            alert("Unable to select rooms");
        }
    );
}

function transactionError() {
    
}