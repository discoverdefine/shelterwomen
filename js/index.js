window.addEventListener('load', onWindowLoaded, false);
document.addEventListener('deviceready', onDeviceReady, false);

var b_check_login = "true";

function onWindowLoaded() {
    createSecurityTable();
    createToursTables();
    createDirectoryTables();
    
    //Check to make sure this is a registered app
    func_too_legit();
    
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
                                "image_title VARCHAR(255),"+
                                "image_description TEXT,"+
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
