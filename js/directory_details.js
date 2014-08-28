var db;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {    
    
}

$(document).on('pageinit', function(){
    var url = $.url(document.location);
    var id_service = url.param("id_service");
    
    populateDirectoryDetails(id_service);
});

function populateDirectoryDetails(id_service) {
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = "SELECT * FROM da_service WHERE id_service = " + id_service;
            transaction.executeSql(sql, [], populateDirectoryDetailsHtml);
        }, transactionError
    );
}

function populateDirectoryDetailsHtml(tx, results) {
    var listing = results.rows.item(0);
    $("#service_details").empty();
    $("#service_details").append('<table data-role="table" class="ui-responsive table-stroke">');
    if (listing.name_service !== 'null') $("#service_details").append("<tr><td colspan=\"2\"><h3 class=\"ui-title\">" + unescape(listing.name_service) + "</h3></td></tr>");
    if (listing.type_service !== 'null') $("#service_details").append("<tr><td><strong>Service Type:</strong></td><td>" + unescape(listing.type_service) + "</td></tr>");
    if (listing.address !== 'null') $("#service_details").append("<tr><td><strong>Address:</strong></td><td>" + unescape(listing.address) + "</td></tr>");
    if (listing.s_area !== 'null') $("#service_details").append("<tr><td><strong>Area of Toronto: </strong></td><td>" + unescape(listing.s_area) + "</td></tr>");
    if (listing.phone_crisis !== 'null') $("#service_details").append("<tr><td><strong>Crisis Phone:</strong></td><td><a href=\"tel:" + unescape(listing.phone_crisis) + "\">" + unescape(listing.phone_crisis) + "</td></tr>");
    if (listing.phone_office !== 'null') $("#service_details").append("<tr><td><strong>Office Phone:</strong></td><td><a href=\"tel:" + unescape(listing.phone_office) + "\">" + unescape(listing.phone_office) + "</td></tr>");
    if (listing.website !== 'null') $("#service_details").append("<tr><td><strong>Website:</strong></td><td><a href=\"" + unescape(listing.website) + "\">" + unescape(listing.website) + "</a></td></tr>");
    if (listing.languages !== 'null') $("#service_details").append("<tr><td><strong>Languages:</strong></td><td>" + unescape(listing.languages) + "</td></tr>");
    if (listing.accessibility !== 'null') $("#service_details").append("<tr><td><strong>Accessibility Features:</strong></td><td>" + unescape(listing.accessibility) + "</td></tr>");
    if (listing.serves !== 'null') $("#service_details").append("<tr><td><strong>Who we serve:</strong></td><td>" + unescape(listing.serves) + "</td></tr>");
    $("#service_details").append('</table>');
    if (listing.details !== 'null') $("#service_details").append("<p>" + unescape(listing.details) + "</p>");
}

function transactionError() {
    
}