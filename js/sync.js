var db;
var api_key = 'ad37743918e82143d5c18f072e932d4f';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    //Check to make sure this is a registered app
    func_too_legit();
    
    //If passed check, continue
    db = window.openDatabase("CasVaw", "1.0", "CasVaw DB", 8000000);
}

$(document).on('pageinit', function(){
    $('#btndisplaydiv').click(function(iProgress) {
		
    });
	/*
	$('#btncleanup').click(function() {
        remove_directory();
    });
	*/
    $('#btnsync').click(function() {
    	document.getElementById('photo_download_progress').style.display = "block";
	    
		
		//sync_listings_start();
		func_alert_the_guard();
		
		
    });
});

/*
 * Displays and updates field download progress bar
 */
function file_download_progress(i_file, total_files) {
	//Calculate percentage complete
	var percent_start = ((i_file / total_files) * 100).toFixed(2);
	//Change progress bar to reflect current percentage
	document.getElementById('photo_download_progress').innerHTML = "File " + i_file + " of " + total_files
	document.getElementById('photo_download_progress').style.background = "-webkit-repeating-linear-gradient(left, #d7f0a2, #d7f0a2 " + percent_start + "%, #ffffff " + percent_start + "%, #ffffff 100%)";
}


/*
* Kicks off the whole shibang, starting with importing a list of shelters
*/
function sync_listings_start() {
    //Show processing icon
    $.mobile.loading("show");
   //Call sync-push function to grab list of shelters from the external database and insert them into local database
    //Once finished proceed to sync_shelter_list to grab rooms
	
	//alert("Launching sync...");
	
    sync_push('da_service', 'getlistings', sync_shelter_list);
}

/*
* Imports list of rooms
*/
function sync_shelter_list() {
    //Call sync-push function to grab list of shelter rooms from the external database and insert them into local database
    //Once finished proceed to sync_shelter_photos to grab photos
	
	//alert("Sync list of rooms...");
	
    sync_push('da_shelters', 'getshelters', sync_shelter_photos);
}

/*
* Imports list of photos per room
*/
function sync_shelter_photos() {
    //Call sync-push function to grab list of shelter photos from the external database and insert them into local database
    //Once finished call root_directory_structure function to create all of the directories we will require locally
	
	//alert("Sync room photos...");
	
    //sync_push('da_shelter_images', 'getshelterimages', root_directory_structure);
	sync_push('da_shelter_images', 'getshelterimages', root_directory_structure);
}


/*
* Change any newly imported 'null' fields to null
*/
function shelter_photos_cleanup() {
	//Clean up image_title
	var str_query = "UPDATE da_shelter_images SET image_title = NULL WHERE image_title = 'null'";
	db.transaction(
		function (transaction) {
			transaction.executeSql(str_query);
		}, function () {
			//Successful
			
		},
		function () {
			//Failed
			
		}
	);
	//Clean up image_description
	var str_query = "UPDATE da_shelter_images SET image_description = NULL WHERE image_description = 'null'";
	db.transaction(
		function (transaction) {
			transaction.executeSql(str_query);
		}, function () {
			//Successful
			
		},
		function () {
			//Failed
			
		}
	);
	
	//Proceed to directory structure and files
	root_directory_structure();
	
}

/*
* Function for grabbing data from server and storing it in local database
*/
function sync_push(tblname, action, callback) {
    $.ajax({
        url: 'https://shelterforwomen.ca/admin/api.php?action=' + action + '&key=' + api_key,
        async: true,
        dataType: "json"
    }).done(function(data) {
        db.transaction(
            function (transaction) {
                transaction.executeSql('DELETE FROM ' + tblname);
            }, transactionError
        );

        $.each(data, function() {
            var str_fields = '(';
            var str_values = '(';
            $.each(this, function(key, value) {
                str_fields = str_fields + key + ",";
				if ( value == "" || value == "null" ) {
					str_values = str_values + "NULL,";
				}
				else {
					str_values = str_values + "'" + escape(value) + "',";
				}
                
            });
            str_fields = str_fields.substring(0, str_fields.length - 1) + ")";
            str_values = str_values.substring(0, str_values.length - 1) + ")";

            var str_query = "INSERT INTO " + tblname + " " + str_fields + " VALUES " + str_values + "";
			
			//if ( tblname == "da_service" ) alert(str_query);
			
            db.transaction(
                function (transaction) {
                    transaction.executeSql(str_query);
                }, transactionError
            );
        });

        if (callback !== undefined && callback !== 'undefined' && callback !== 'null') {
            callback();
        }
    });
}

/*
 * Set up root folders on local device
 */
function root_directory_structure() {
	
	//alert("Build root structure...");
	
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
	
	//alert("Got file system root...");
	
        var file_system_root = fileSystem.root;
        //Check for local folder "casvaw"
        file_system_root.getDirectory("casvaw", {create:true, exclusive: false}, function() {
            //"casvaw" was created so we now check for "casvaw/tours"
	
	//alert("Created /casvaw...");
	
            file_system_root.getDirectory("casvaw/tours", {create:true, exclusive: false}, function() {
                //"casvaw/tours" was created so we can move on and create any individual shelter folders by calling directory_structure_transact() function
	
	//alert("Created /casvaw/tours...");
	
                directory_structure_transact();
            }, function() {
                alert("Could not create casvaw/tours...");
            });
        }, function() {
            alert("Could not create casvaw...");
        });  
    }, function() {
        alert("Could not initialize file_system_root...");
    });
}

/*
 * Create local directory structure
 */
//Start by initializing transaction
function directory_structure_transact() {
    //Transaction initialized, move on to getting list of shelters
	
	//alert("Initialize directory listing retrieval...");
	
    db.transaction(get_directory_structure, transactionError);
}

/*
 * Grab list of unique shelter id's
 */
function get_directory_structure(tx) {
    var sql = "SELECT DISTINCT id_shelter FROM da_shelter_images ORDER BY id_shelter";
    //Once shelters are collected we want to assign the results to a global object/array 
	
	//alert("Grabbing list of unique shelters...");
	
    tx.executeSql(sql, [], assign_directory_array);
}

/*
 * Assign object/array to global object/array to be manipulated throughout the process
 */
function assign_directory_array(tx, results) {
    //Clone results from database query
    a_directory_list = results;
    //Identify the total number of directories returned
    i_untouched_rows = a_directory_list.rows.length;
    //Call create_directory_structure function to loop through and create shelter folders one at a time
    create_directory_structure();
}

/*
 * Loop through list of shelters and create a sub-folder for each one
 */
function create_directory_structure(tx, results) {
    //If the number of records left to process = 0 then we can stop creating folders and move on to downloading photos
    if ( i_untouched_rows === 0 ) {
        //Start the actual process of photo retrieval
        sync_start_transaction();
        return; //Added just to be safe
    }
    //Grab the last record in the array
    var v_directory_entry = a_directory_list.rows.item(i_untouched_rows - 1);    
    //Extract the shelter id from the record and assign it to a global variable to be used later
    id_directory_shelter = v_directory_entry.id_shelter;
    //Reduce the total number of unprocessed shelter folders by one
    //This allows us to whittle away at the total number of folders to be created until we can finally stop altogether
    i_untouched_rows--;
    //Create individual shelter folders if they don't already exist
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        var entry = fileSystem.root;
        //Attempt to create the folder
        entry.getDirectory("casvaw/tours/" + id_directory_shelter, {create:true, exclusive: false}, function() {
            //Successful so restart the create_directory_structure() to do it all again until we run out of records
            create_directory_structure();
        }, function() {
            
        });
    }, function() {
    
    });
   
}

/*
 * Folders have all been created so now we begin photo process by first initializing the transaction
 */
function sync_start_transaction() {
    //Transaction initialized, move on to getting list of photos
    db.transaction(get_photo_list, transactionError);
}

/*
 * Grabs list of all photos in local database and assigns them to an array
 */
function get_photo_list(tx) {
	var sql = 
		"SELECT id_image, image_path, id_shelter, id_set " +
		"FROM da_shelter_images " +
                "ORDER BY id_shelter, image_path";
        tx.executeSql(sql, [], assign_photo_array);
}

/*
 * Assign returned results to global remoteFiles array to be used in future functions
 */
function assign_photo_array(tx, results) {
    //Clone results from database query
    a_photo_list = results;
    //Identify the total number of photos returned
    i_untouched_photo_rows = a_photo_list.rows.length;
	i_progress_min = 0;
    i_progress_max = i_untouched_photo_rows;
    //Call download_file function to loop through and download photos one at a time
    download_file();
}

/*
 * Loop through list of photos and download each one
 */
function download_file(tx, results) {
    image_path = '';
    id_shelter = '';
    
    //If the number of records left to process = 0 then we can stop everything
    if ( i_untouched_photo_rows === 0 ) {
        //Stop animated processing icon
        $.mobile.loading("hide");
        //Exit function and finish everything
        //Send user to directory screen
        window.location.href="directory.html";
        return; //Added just to be safe
    }
    //Grab the last record in the array
    var remote_file = a_photo_list.rows.item(i_untouched_photo_rows - 1);
    //Grab the path to the next image to be downloaded and the shelter id it belongs to
    image_path = remote_file.image_path;    
    id_shelter = remote_file.id_shelter;
    //Set the root directory where the photos exist on the external server
    var remote_file_path_root = 'https://shelterforwomen.ca/uploads/tours/';
    //Full path to the photo on the external server
    remote_file_path = remote_file_path_root + id_shelter + '/' + image_path;
    //Grab the name of the photo file by stripping it off the end of the remote file path
    var local_file = remote_file_path.substring(remote_file_path.lastIndexOf('/')+1);
    //Relative local path to the photo
    var local_file_path = "casvaw/tours/" + id_shelter + "/" + local_file;
    //Reduce the total number of unprocessed photos by one
    //This allows us to whittle away at the total number of photos to be downloaded until we can finally stop altogether
    i_untouched_photo_rows--;
    //Open access to local file system
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        //Get the root for the local server
        nativeLocalRootPath = fileSystem.root.toURL();
        //Build full path to local photo from the root down
        var local_file_full_path = nativeLocalRootPath + local_file_path;
        //Check for existence of photo on local server
        fileSystem.root.getFile(local_file_full_path, {create: true, exclusive: false}, function() {
            
			//Set start and end amounts for progress meter
			i_progress_min++;
			file_download_progress(i_progress_min, i_progress_max);
			
			//File already exists so we just need to restart the download_file() to do it all again until we run out of records
            download_file();
        }, function() {
            //File not found locally so we need to download it
            var ft = new FileTransfer(); //Initialize file transfer object
            ft.download(remote_file_path, local_file_full_path, function(entry) {
            
				//Set start and end amounts for progress meter
				i_progress_min++;
				file_download_progress(i_progress_min, i_progress_max);
				
		        //File was successfully downloaded so we can restart the download_file() to do it all again until we run out of records
                download_file();
            }, function() {
                //Could not download file for some reason but we still want to continue on by restarting the download_file()
                alert("Unable to download " + remote_file_path);
            
				//Set start and end amounts for progress meter
				i_progress_min++;
				file_download_progress(i_progress_min, i_progress_max);
			
		        download_file();
            });
        });
    }, function() {
        //Could not connect for some reason but we still want to continue on by restarting the download_file()
        alert("Unable to connect with LocalFileSystem at: " + v_id_shelter);
            
		//Set start and end amounts for progress meter
		i_progress_min++;
		file_download_progress(i_progress_min, i_progress_max);
			
		download_file();
    });
}

function remove_directory() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
    function fail(evt) {
        alert("FILE SYSTEM FAILURE" + evt.target.error.code);
    }
    function onFileSystemSuccess(fileSystem) {
        fileSystem.root.getDirectory(
        "casvaw",
        {create : true, exclusive : false},
        function(entry) {
            entry.removeRecursively(function() {
                alert("All folders and files removed");
            }, function() {
                alert("Folders and files could not be removed");
            });
        }, function() {
            alert("Could not get to directory");
        });
    }
}

function transactionError() {
    
}
