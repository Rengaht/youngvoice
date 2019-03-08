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
	// $request_url='https://mmlab.com.tw/project/youngvoice';
	$request_url='https://game.youngvoice.tw';
	$share_url='https://game.youngvoice.tw/upload/share.php?id=';
	$data_folder='/sample/';
	// $data_folder='/youngvoice/sample/';

	try{
		
		$get_action=isset($_POST['action']) ? $_POST['action'] : NULL;
		switch($get_action){
			case 'upload':
				if($_FILES['file']['error']>0){
					$json['result']='fail: file error';
				}else{
					
					$guid=DateTimeHelper::get_timestamp(null).'_'.gen_uuid();					
					move_uploaded_file($_FILES['file']['tmp_name'],'./output/'.$guid.'.png');
					

					$json['result']='success';
					$json['guid']=$guid;			


					$url=$share_url.$guid;
					$json['size']=$_FILES['file']['size'];
					// $escaped_url = htmlspecialchars( $url, ENT_QUOTES, 'UTF-8' );
					$json['url']=$url;
				}
				echo json_encode($json);
				break;
			case 'sample':
				$get_keyword=isset($_POST['keyword']) ? $_POST['keyword'] : NULL;

				$servername = "127.0.0.1";
				// $username = "young_viewer";
				// $password = "53913223";
				$username = "mmlab";
				$password = "27181133158";
				$dbname = "db_youngvoice_game";

				// Create connection
				$conn = new mysqli($servername, $username, $password, $dbname);
				// Check connection
				if ($conn->connect_error) {
				    die("Connection failed: " . $conn->connect_error);
				} 

				$sql="SELECT `author`,`title`,`year`,`type`,`file`,`text` FROM work WHERE INSTR(`keyword`,'".$get_keyword."') ORDER BY RAND() LIMIT 1";
				//$sql="SELECT `author`,`title`,`year`,`type`,`file`,`text` FROM `work` WHERE `author`='林羿淳'";				
				// echo $sql;
				//$sql="SELECT `author`,`title`,`year`,`type`,`file`,`text` FROM work";
				$conn->query("SET NAMES 'utf8'");
				$result=$conn->query($sql);
				
				// echo $result->num_rows;

				if ($result->num_rows>0) {
				    // output data of each row
				    while($row = $result->fetch_assoc()) {
				        // echo $row;

				        $json['title']=$row['year'].' / '.$row['title'].' / '.$row['author'];
						$json['type']=$row['type'];
						$json['text']=$row['text'];
						$imgfile_=str_replace('.JPG','.jpg',$row['file']);
						$json['imgurl']=$request_url.$data_folder.$row['year'].'/'.$imgfile_;

						echo utf8_encode(json_encode($json));
				    }
				}else{
					$json['type']='empty';
				    echo json_encode($json);
				}
				$conn->close();
			
				break;
			default:
				$json['result']='fail: invalid action: '.$get_action;
				echo json_encode($json);
		}

	}catch(Exception $e){
		echo 'Error: '.$e->getMessage();

	}
?>