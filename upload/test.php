<?php
	
	
	
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/html; charset=utf-8');

	date_default_timezone_set("Asia/Taipei");

	//Return as json file
	// header('Content-Type: application/json');


	// require_once('utils/datetime.helper.php');
	// require_once('utils/uuid.generator.php');
	try{
		
		$servername = "127.0.0.1";
		// $username = "mmlab";
		// $password = "27181133158";
		$username = "young_viewer";
		$password = "53913223";
		$dbname = "db_youngvoice_game";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 
		
		$sql="SELECT * FROM work";
		// $sql="SELECT TABLE_NAME FROM".dbname."INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";
		$conn->query("SET NAMES 'utf8'");
		$result=$conn->query($sql);
		
		echo 'got :'.$result->num_rows.' rows<br>';

		if ($result->num_rows>0){
		    // output data of each row
		    while($row = $result->fetch_assoc()){
		        echo $row['year'].$row['author'].'<br>';
		    }
		}else{		
		    echo 'empty table!!!<br>';
		}




		$conn->close();		
			
	}catch(Exception $e){
		echo 'Error: '.$e->getMessage();

	}
?>