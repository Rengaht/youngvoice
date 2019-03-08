<<<<<<< HEAD
<<<<<<< HEAD
<?php
	
	//set_time_limit(0);


	header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/html; charset=utf-8');

	date_default_timezone_set("Asia/Taipei");

	//Return as json file
	header('Content-Type: application/json');


	require_once('utils/datetime.helper.php');
	require_once('utils/uuid.generator.php');

	//error_reporting(0);
	

	try{
		
		$servername = "127.0.0.1";
		// $username = "root";
		// $password = "rengPP";
		$username = "young_viewer";
		$password = "53913223";
		$dbname = "db_youngvoice_game";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 

		$sql="INSERT INTO `work` (`author`, `title`, `year`, `type`, `keyword`, `text`, `file`, `index_`) VALUES ('".$_POST['author'].'\',\''.$_POST['title'].'\',\''.(int)$_POST['year'].'\',\''.$_POST['type'].'\',\''.$_POST['keyword'].'\',\''.$_POST['text'].'\',\''.$_POST['file'].'\', NULL)';
		echo $sql;

		$conn->query("SET NAMES 'utf8'");
		$result=$conn->query($sql);
		
		// echo $result->num_rows;

		if($result && $conn){
		    echo "yes!";
		}else{
			// echo "error!";
			echo $conn->error;
		}
		$conn->close();	
		
		

	}catch(Exception $e){
		echo 'Error: '.$e->getMessage();

	}
=======
<?php
	
	//set_time_limit(0);


	header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/html; charset=utf-8');

	date_default_timezone_set("Asia/Taipei");

	//Return as json file
	header('Content-Type: application/json');


	require_once('utils/datetime.helper.php');
	require_once('utils/uuid.generator.php');

	//error_reporting(0);
	

	try{
		
		$servername = "127.0.0.1";
		$username = "root";
		$password = "rengPP";
		$dbname = "db_youngvoice_game";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 

		$sql="INSERT INTO `work` (`author`, `title`, `year`, `type`, `keyword`, `text`, `file`, `index_`) VALUES ('".$_POST['author'].'\',\''.$_POST['title'].'\',\''.(int)$_POST['year'].'\',\''.$_POST['type'].'\',\''.$_POST['keyword'].'\',\''.$_POST['text'].'\',\''.$_POST['file'].'\', NULL)';
		echo $sql;

		$conn->query("SET NAMES 'utf8'");
		$result=$conn->query($sql);
		
		// echo $result->num_rows;

		if($result && $conn){
		    echo "yes!";
		}else{
			// echo "error!";
			echo $conn->error;
		}
		$conn->close();	
		
		

	}catch(Exception $e){
		echo 'Error: '.$e->getMessage();

	}
>>>>>>> origin/master
=======
<?php
	
	//set_time_limit(0);


	header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/html; charset=utf-8');

	date_default_timezone_set("Asia/Taipei");

	//Return as json file
	header('Content-Type: application/json');


	require_once('utils/datetime.helper.php');
	require_once('utils/uuid.generator.php');

	//error_reporting(0);
	

	try{
		
		$servername = "127.0.0.1";
		$username = "root";
		$password = "rengPP";
		$dbname = "db_youngvoice_game";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 

		$sql="INSERT INTO `work` (`author`, `title`, `year`, `type`, `keyword`, `text`, `file`, `index_`) VALUES ('".$_POST['author'].'\',\''.$_POST['title'].'\',\''.(int)$_POST['year'].'\',\''.$_POST['type'].'\',\''.$_POST['keyword'].'\',\''.$_POST['text'].'\',\''.$_POST['file'].'\', NULL)';
		echo $sql;

		$conn->query("SET NAMES 'utf8'");
		$result=$conn->query($sql);
		
		// echo $result->num_rows;

		if($result && $conn){
		    echo "yes!";
		}else{
			// echo "error!";
			echo $conn->error;
		}
		$conn->close();	
		
		

	}catch(Exception $e){
		echo 'Error: '.$e->getMessage();

	}
>>>>>>> origin/master
?>