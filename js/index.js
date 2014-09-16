window.addEventListener('load', onWindowLoaded, false);
document.addEventListener('deviceready', onDeviceReady, false);

function onWindowLoaded() {
    createSecurityTable();
    createToursTables();
    createDirectoryTables();
    checkActive();
}

function onDeviceReady() {
    //$.mobile.showPageLoadingMsg(true);
}

function createSecurityTable() {
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = "CREATE TABLE IF NOT EXISTS da_security (" + 
                                "id_security INTEGER," + 
                                "sync_key VARCHAR(9)," + 
                                "activation_key VARCHAR(255)"+ 
                            ")";
            transaction.executeSql(sql);
        }, transactionError
    );
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

function checkActive() {
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
    db.transaction(
        function(transaction) {
            var sql = 
		"SELECT id_security " +
		"FROM   da_security WHERE sync_key IS NOT NULL AND activation_key IS NOT NULL";
                transaction.executeSql(sql, [], function(tx, results) {
                    var i_total_records = results.rows.length;
                    if ( i_total_records === 0 ) {
                        //No keys exist, the user has not activated their app so redirect them to the activation page
                        window.location.href="activate.html";
                        return; //Added just to be safe
                    }
                    else {
                        //Keys exist, the user has activated their app so redirect them to the login page
                        window.location.href="login.html";
                        return; //Added just to be safe
                    }
                });
        }, transactionError
    );
}
 

function transactionError() {
    
}
