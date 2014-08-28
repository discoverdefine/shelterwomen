var db;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
}

$(document).on('pageinit', function(){
    var url = $.url(document.location);
    var id_set = url.param("id_set");
    var id_shelter = url.param("id_shelter");
    
    populateRoomDetails(id_set, id_shelter);
});

function populateRoomDetails(id_set, id_shelter) {
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = "SELECT * FROM da_shelter_images WHERE id_shelter = " + id_shelter + " AND id_set = " + id_set + " AND is_default <> 1";
            transaction.executeSql(sql, [], populateRoomDetailsHtml);
        }, transactionError
    );
}

function populateRoomDetailsHtml(tx, results) {
    var len = results.rows.length;
    
    for (var i = 0; i < len; i++) {
        html_to_append = '';
        var roomimage = results.rows.item(i);

        id_image = roomimage.id_image;
        image_path = roomimage.image_path;
        id_shelter = roomimage.id_shelter;
        id_set = roomimage.id_set;

        html_to_append = html_to_append + '<li><img src="file:///storage/sdcard0/casvaw/tours/' + id_shelter + '/' + image_path + '"></li>';
        $("#carousel_ul").append(html_to_append);    
    }
    
    html_room_to_append = '<a href="#" data-role="button" data-rel="back" class="ui-btn ui-icon-arrow-l ui-btn-icon-right">Return to Tour List</a>';
    $("#room_back").append(html_room_to_append);
    
    //$("#carousel").page();
    $('.bxslider').bxSlider({
        speed: 1,
        autoStart: true,
        auto: true,
        pause: 1000,
        pager: false
    });
}

function transactionError() {
    
}