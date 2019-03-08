
<html>
<head>
	<style type="text/css">
		img{
			width:200px;
		}
	</style>
</head>
<body>
<?php
	
	
	
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/html; charset=utf-8');

	date_default_timezone_set("Asia/Taipei");

	$request_url='https://mmlab.com.tw/project/youngvoice/sample/';
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
		
		//$sql="SELECT * FROM work WHERE `year`=2011";
		$sql="SELECT * FROM work";
		// $sql="SELECT TABLE_NAME FROM".dbname."INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";
		$conn->query("SET NAMES 'utf8'");
		$result=$conn->query($sql);
		
		echo 'got :'.$result->num_rows.' rows<br>';

		if ($result->num_rows>0){
		    // output data of each row
		    while($row = $result->fetch_assoc()){

		    	echo $row['year'].' / '.$row['type'].' / '.$row['title'].' / '.$row['author'].'<br>';

		    	if($row['file'].length==0) continue;

		    	$imgfile_=str_replace('.JPG','.jpg',$row['file']);
		    	$imgurl_= $request_url.$data_folder.$row['year'].'/'.$imgfile_;

		    	echo $imgfile_.'<br>';		    			    	
		        echo '<img src="'.$imgurl_.'""><br>';
	    	
		       
		    }
		}else{		
		    echo 'empty table!!!<br>';
		}




		$conn->close();		
			
	}catch(Exception $e){
		echo 'Error: '.$e->getMessage();

	}
?>

</body>